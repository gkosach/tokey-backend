import { ObjectCannedACL, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Prisma, PrismaClient } from "@prisma/client";
import axios, { AxiosInstance } from "axios";

import { GEOCODING_BASE_URL, S3_BUCKET_NAME, USER_AGENT } from "../common";
import { ErrorStatus } from "../common/enum/error/error-status.enum";
import { PropertyErrorMessages } from "../common/enum/error/property-error.enum";
import { PropertyError } from "../controllers/contract/error/property.error";

export class PropertyService {
  private readonly prisma: PrismaClient;
  private readonly s3Client: S3Client;
  private readonly httpClient: AxiosInstance;

  constructor(prisma: PrismaClient, s3Client: S3Client, httpClient: AxiosInstance = axios.create()) {
    this.prisma = prisma;
    this.s3Client = s3Client;
    this.httpClient = httpClient;
  }

  /**
   * Получает свойство по ID
   */
  async getProperty(id: string) {
    return this.prisma.property.findUnique({
      where: { id: Number(id) },
      include: { location: true },
    });
  }

  /**
   * Геокодирует адрес в координаты через OpenStreetMap API
   * @private
   */
  private async geocodeAddress(address: string, postalCode: string): Promise<[number, number]> {
    try {
      const geocodingUrl = `${GEOCODING_BASE_URL}?${new URLSearchParams({
        street: address,
        postalcode: postalCode,
        format: "json",
        limit: "1",
      }).toString()}`;

      const response = await this.httpClient.get(geocodingUrl, {
        headers: { "User-Agent": USER_AGENT },
      });

      if (!response.data[0]?.lon || !response.data[0]?.lat) {
        throw new PropertyError(ErrorStatus.BadRequest, PropertyErrorMessages.PROPERTY_ERROR_INVALID_RESPONSE);
      }

      return [parseFloat(response.data[0].lon), parseFloat(response.data[0].lat)];
    } catch (error) {
      if (error instanceof PropertyError) throw error;
      throw new PropertyError(ErrorStatus.InternalError, PropertyErrorMessages.PROPERTY_ERROR_GEOCODING_FAILED);
    }
  }

  /**
   * Нормализует входные данные в массив строк
   * @private
   */
  private normalizeArray(input: string | string[] | undefined): string[] {
    return !input ? [] : Array.isArray(input) ? input : input.split(",");
  }

  /**
   * Загружает файлы в S3 и возвращает их URL
   * @private
   */
  private async uploadFilesToS3(files: Express.Multer.File[]): Promise<string[]> {
    return Promise.all(
      files.map(async (file) => {
        const uploadParams = {
          Bucket: S3_BUCKET_NAME,
          Key: `properties/${Date.now()}-${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: ObjectCannedACL.public_read,
        };

        const command = new PutObjectCommand(uploadParams);
        await this.s3Client.send(command);

        return `https://${S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
      }),
    );
  }

  /**
   * Валидация входных данных для создания свойства
   * @private
   */
  private async validateCreateInput(body: any, files: Express.Multer.File[]) {
    const requiredFields = ["address", "postalCode"];
    requiredFields.forEach((field) => {
      if (!body[field]?.trim()) {
        throw new PropertyError(ErrorStatus.BadRequest, PropertyErrorMessages.PROPERTY_ERROR_INVALID_INPUT);
      }
    });

    if (!files?.length) {
      throw new PropertyError(ErrorStatus.BadRequest, PropertyErrorMessages.PROPERTY_ERROR_FILE_UPLOAD_FAILED);
    }

    const numericFields = {
      pricePerMonth: Number(body.pricePerMonth),
      securityDeposit: Number(body.securityDeposit),
      beds: Number(body.beds),
      baths: Number(body.baths),
      squareFeet: Number(body.squareFeet),
    };

    Object.entries(numericFields).forEach(([_key, value]) => {
      if (isNaN(value)) {
        throw new PropertyError(ErrorStatus.BadRequest, PropertyErrorMessages.PROPERTY_ERROR_VALIDATION_FAILED);
      }
    });

    const [coords, photoUrls] = await Promise.all([
      this.geocodeAddress(body.address, body.postalCode),
      this.uploadFilesToS3(files),
    ]);

    return {
      ...numericFields,
      longitude: coords[0],
      latitude: coords[1],
      photoUrls,
      isPetsAllowed: body.isPetsAllowed === "true",
      isParkingIncluded: body.isParkingIncluded === "true",
      propertyType: body.propertyType,
    };
  }

  /**
   * Получает список свойств с фильтрацией
   */
  async getProperties(queryParams: any) {
    const { latitude, longitude, ...otherParams } = queryParams;
    const whereConditions: Prisma.Sql[] = [];

    if (otherParams.favoriteIds) {
      const ids = this.normalizeArray(otherParams.favoriteIds as string).map(Number);
      whereConditions.push(Prisma.sql`p.id IN (${Prisma.join(ids)})`);
    }

    if (otherParams.priceMin || otherParams.priceMax) {
      const min = Number(otherParams.priceMin) || 0;
      const max = Number(otherParams.priceMax) || Number.MAX_SAFE_INTEGER;
      whereConditions.push(Prisma.sql`p."pricePerMonth" BETWEEN ${min} AND ${max}`);
    }

    if (otherParams.beds) {
      const beds = Number(otherParams.beds);
      if (!isNaN(beds)) whereConditions.push(Prisma.sql`p.beds >= ${beds}`);
    }

    if (otherParams.baths) {
      const baths = Number(otherParams.baths);
      if (!isNaN(baths)) whereConditions.push(Prisma.sql`p.baths >= ${baths}`);
    }

    if (otherParams.squareFeetMin || otherParams.squareFeetMax) {
      const min = Number(otherParams.squareFeetMin) || 0;
      const max = Number(otherParams.squareFeetMax) || Number.MAX_SAFE_INTEGER;
      whereConditions.push(Prisma.sql`p."squareFeet" BETWEEN ${min} AND ${max}`);
    }

    if (otherParams.propertyType) {
      whereConditions.push(Prisma.sql`p."propertyType" = ${otherParams.propertyType}::"PropertyType"`);
    }

    if (otherParams.availableFrom) {
      const date = new Date(otherParams.availableFrom as string);
      if (!isNaN(date.getTime())) {
        whereConditions.push(
          Prisma.sql`EXISTS (
            SELECT 1 FROM "Lease" l 
            WHERE l."propertyId" = p.id 
            AND l."startDate" <= ${date.toISOString()}
          )`,
        );
      }
    }

    if (latitude && longitude) {
      const lat = parseFloat(latitude as string);
      const lng = parseFloat(longitude as string);
      const radiusKm = 5;

      whereConditions.push(Prisma.sql`
        ST_DWithin(
          l.coordinates,
          ST_MakePoint(${lng}, ${lat})::geography,
          ${radiusKm * 1000}
        )
      `);
    }

    const query = Prisma.sql`
      SELECT 
        p.*,
        json_build_object(
          'id', l.id,
          'address', l.address,
          'postalCode', l."postalCode",
          'coordinates', ST_AsGeoJSON(l.coordinates)::jsonb
        ) as location
      FROM "Property" p
      JOIN "Location" l ON p."locationId" = l.id
      ${whereConditions.length ? Prisma.sql`WHERE ${Prisma.join(whereConditions, " AND ")}` : Prisma.empty}
      ORDER BY p."createdAt" DESC
      LIMIT 100
    `;

    return this.prisma.$queryRaw(query);
  }

  /**
   * Создает новое свойство с прикрепленными фото
   */
  async createProperty(body: any, files: Express.Multer.File[]) {
    const validatedData = await this.validateCreateInput(body, files);
    return this.prisma.$transaction(async (tx) => {
      const location = await tx.location.create({
        data: {
          address: body.address,
          postalCode: body.postalCode,
          longitude: validatedData.longitude,
          latitude: validatedData.latitude,
        },
      });

      return tx.property.create({
        data: {
          name: body.name,
          description: body.description,
          pricePerMonth: validatedData.pricePerMonth,
          securityDeposit: validatedData.securityDeposit,
          applicationFee: body.applicationFee || 0,
          photoUrls: validatedData.photoUrls,
          isPetsAllowed: validatedData.isPetsAllowed,
          isParkingIncluded: validatedData.isParkingIncluded,
          propertyType: validatedData.propertyType,
          beds: validatedData.beds,
          baths: validatedData.baths,
          squareFeet: validatedData.squareFeet,
          locationId: location.id,
          managerCognitoId: body.managerCognitoId,
        },
        include: { location: true },
      });
    });
  }
}
