import { ObjectCannedACL, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Prisma, PrismaClient } from "@prisma/client";
import axios, { AxiosInstance } from "axios";

import { GEOCODING_BASE_URL, S3_BUCKET_NAME, USER_AGENT } from "../common";
import { ErrorStatus } from "../common/enum/error/error-status.enum";
import { PropertyErrorMessages } from "../common/enum/error/property-error.enum";
import { PropertyError } from "../controllers/contract/error/property.error";
import { CreatePropertyDto } from "./contract/dto/property.dto";
import { Property } from "../../prisma/types/prismaTypes";
import logger from "../common/utils/logger";

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
      files.map(async (file: Express.Multer.File) => {
        // Явное указание типа
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
  private async validateCreateInput(dto: CreatePropertyDto, files: Express.Multer.File[]) {
    const [coords, photoUrls] = await Promise.all([
      this.geocodeAddress(dto.address, dto.postalCode),
      this.uploadFilesToS3(files),
    ]);

    return {
      ...dto,
      longitude: coords[0],
      latitude: coords[1],
      photoUrls,
    };
  }

  /**
   * Получает список свойств с фильтрацией
   */
  async getProperties(queryParams: any) {
    const {
      lat,
      lng,
      radius = 5,
      page = 1,
      limit = 10,
      priceMin,
      priceMax,
      beds,
      baths,
      squareFeetMin,
      squareFeetMax,
      propertyType,
      availableFrom,
      favoriteIds,
    } = queryParams;

    logger.debug(`Full request: ${JSON.stringify(queryParams)}`);

    const whereConditions: Prisma.Sql[] = [];
    const earthRadiusKm = 6371;

    // Фильтр по избранному
    if (favoriteIds) {
      const ids = this.normalizeArray(favoriteIds).map(Number);
      whereConditions.push(Prisma.sql`p.id IN (${Prisma.join(ids)})`);
    }

    // Фильтр по цене
    if (priceMin || priceMax) {
      const min = Number(priceMin) || 0;
      const max = Number(priceMax) || Number.MAX_SAFE_INTEGER;
      whereConditions.push(Prisma.sql`p."pricePerMonth" BETWEEN ${min} AND ${max}`);
    }

    // Фильтр по количеству спален
    if (beds) {
      const bedsNumber = Number(beds);
      if (!isNaN(bedsNumber)) whereConditions.push(Prisma.sql`p.beds >= ${bedsNumber}`);
    }

    // Фильтр по количеству ванных
    if (baths) {
      const bathsNumber = Number(baths);
      if (!isNaN(bathsNumber)) whereConditions.push(Prisma.sql`p.baths >= ${bathsNumber}`);
    }

    // Фильтр по площади
    if (squareFeetMin || squareFeetMax) {
      const min = Number(squareFeetMin) || 0;
      const max = Number(squareFeetMax) || Number.MAX_SAFE_INTEGER;
      whereConditions.push(Prisma.sql`p."squareFeet" BETWEEN ${min} AND ${max}`);
    }

    // Фильтр по типу недвижимости
    if (propertyType) {
      whereConditions.push(Prisma.sql`p."propertyType" = ${propertyType}::"PropertyType"`);
    }

    // Фильтр по дате доступности
    if (availableFrom) {
      const date = new Date(availableFrom);
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

    // Гео-фильтр
    if (lat && lng) {
      const maxLatDiff = radius / 111.2;
      const maxLngDiff = radius / (111.2 * Math.cos((lat * Math.PI) / 180));

      whereConditions.push(Prisma.sql`
      l.latitude BETWEEN ${lat - maxLatDiff} AND ${lat + maxLatDiff}
      AND l.longitude BETWEEN ${lng - maxLngDiff} AND ${lng + maxLngDiff}
      AND (
        ${earthRadiusKm} * ACOS(
          COS(RADIANS(${lat})) * 
          COS(RADIANS(l.latitude)) * 
          COS(RADIANS(l.longitude) - RADIANS(${lng})) + 
          SIN(RADIANS(${lat})) * SIN(RADIANS(l.latitude))
        )
      ) <= ${radius}
    `);
    }

    const query = Prisma.sql`
    SELECT 
      p.*,
      json_build_object(
        'id', l.id,
        'address', l.address,
        'postalCode', l."postalCode",
        'latitude', l.latitude,
        'longitude', l.longitude
      ) as location,
      ${earthRadiusKm} * ACOS(
        COS(RADIANS(${lat})) * 
        COS(RADIANS(l.latitude)) * 
        COS(RADIANS(l.longitude) - RADIANS(${lng})) + 
        SIN(RADIANS(${lat})) * SIN(RADIANS(l.latitude))
      ) as distance
    FROM "Property" p
    JOIN "Location" l ON p."locationId" = l.id
    ${whereConditions.length ? Prisma.sql`WHERE ${Prisma.join(whereConditions, " AND ")}` : Prisma.empty}
    ORDER BY distance ASC
    LIMIT ${limit}
    OFFSET ${(page - 1) * limit}
  `;

    return this.prisma.$queryRaw(query);
  }

  /**
   * Создает новое свойство в базе данных.
   * @param dto DTO с данными о создаваемом свойстве.
   * @param files Массив файлов для загрузки фотографий.
   * @returns Созданное свойство с данными о локации.
   */
  async createProperty(dto: CreatePropertyDto, files: Express.Multer.File[]): Promise<Property> {
    const photoUrls = await this.uploadFilesToS3(files);
    const [longitude, latitude] = await this.geocodeAddress(dto.address, dto.postalCode);

    return this.prisma.$transaction(async (tx) => {
      const location = await tx.location.create({
        data: {
          address: dto.address,
          postalCode: dto.postalCode,
          longitude,
          latitude,
        },
      });

      return tx.property.create({
        data: {
          name: dto.name,
          description: dto.description,
          pricePerMonth: dto.pricePerMonth,
          securityDeposit: dto.securityDeposit,
          applicationFee: dto.applicationFee || 0,
          isPetsAllowed: dto.isPetsAllowed,
          isParkingIncluded: dto.isParkingIncluded,
          propertyType: dto.propertyType,
          beds: dto.beds,
          baths: dto.baths,
          squareFeet: dto.squareFeet,
          photoUrls: photoUrls,
          managerCognitoId: dto.managerCognitoId,
          locationId: location.id,
        },
        include: { location: true },
      });
    });
  }
}
