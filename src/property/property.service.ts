import { PropertyType } from "@prisma/client";
import { CreatePropertyDto, PropertyError, UpdateModerationStatusDto } from "./index";
import { prisma, s3, Geocoder, ErrorStatus, PropertyErrorMessages } from "../common";
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import logger from "../common/config/logger";

/**
 * Сервис для работы с объектами недвижимости
 */
export class PropertyService {
  /**
   * Создает новый объект недвижимости
   * @param dto - DTO для создания объекта
   * @param files - Массив файлов изображений
   * @returns Созданный объект недвижимости с локацией и менеджером
   */
  async createProperty(dto: CreatePropertyDto, files: Express.Multer.File[]) {
    try {
      const [photoUrls, geocode] = await Promise.all([
        this.uploadFilesToS3(files),
        Geocoder.geocode(dto.address).catch(() => {
          throw PropertyError.invalidAddress();
        }),
      ]);

      return prisma.$transaction(async (tx) => {
        return tx.property.create({
          data: {
            ...dto,
            photoUrls,
            location: {
              create: {
                address: dto.address,
                latitude: geocode.lat,
                longitude: geocode.lng,
              },
            },
            ...(dto.managerCognitoId && {
              manager: { connect: { cognitoId: dto.managerCognitoId } },
            }),
          },
          include: {
            location: true,
            manager: { select: { id: true, name: true } },
          },
        });
      });
    } catch (error) {
      logger.error("Property creation failed", error);
      throw error;
    }
  }

  /**
   * Получает объект недвижимости по ID
   * @param id - Идентификатор объекта
   * @returns Объект недвижимости с локацией и информацией о менеджере
   */
  async getProperty(id: string) {
    const propertyId = this.validateId(id);

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      include: {
        location: true,
        manager: { select: { id: true, name: true } },
      },
    });

    if (!property) {
      throw PropertyError.notFound();
    }

    return property;
  }

  /**
   * Получает список объектов недвижимости с пагинацией и фильтрацией
   * @param filter - Параметры фильтрации и пагинации
   * @returns Отфильтрованный список объектов с локациями
   */
  async getProperties(filter: {
    page?: number;
    limit?: number;
    minPrice?: number;
    maxPrice?: number;
    type?: PropertyType;
  }) {
    const { page = 1, limit = 10 } = filter;

    return prisma.property.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        tokenPrice: { gte: filter.minPrice, lte: filter.maxPrice },
        propertyType: filter.type ? this.validatePropertyType(filter.type) : undefined,
      },
      include: { location: true },
    });
  }

  /**
   * Загружает файл в S3 хранилище
   * @returns URL загруженного файла
   * @param files
   */
  private async uploadFilesToS3(files: Express.Multer.File[]): Promise<string[]> {
    return Promise.all(files.map((file) => this.uploadToS3(file)));
  }

  private async uploadToS3(file: Express.Multer.File): Promise<string> {
    try {
      const extension = file.originalname.split(".").pop()?.toLowerCase() || "bin";
      const filename = `${uuidv4()}.${extension}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: filename,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: "public-read",
        }),
      );

      return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;
    } catch (error) {
      logger.error("S3 upload failed", error);
      throw PropertyError.uploadFailed();
    }
  }

  private validateId(id: string): number {
    const numId = Number(id);
    if (isNaN(numId) || numId <= 0) {
      throw PropertyError.invalidId();
    }
    return numId;
  }

  private validatePropertyType(type: string): PropertyType {
    if (!Object.values(PropertyType).includes(type as PropertyType)) {
      throw PropertyError.invalidType();
    }
    return type as PropertyType;
  }

  /**
   * Получает объекты недвижимости для модерации
   * @returns Список объектов, ожидающих модерацию
   */
  getPropertiesForModeration() {
    return prisma.property.findMany({
      where: {
        moderationStatus: "Pending",
        manager: { kycStatus: "Approved" },
      },
      include: {
        location: true,
        manager: true,
      },
    });
  }

  /**
   * Обновляет статус модерации объекта
   * @param id - Идентификатор объекта
   * @param dto - DTO с новым статусом и комментарием
   * @returns Обновленный объект недвижимости
   */
  async updateModerationStatus(id: number, dto: UpdateModerationStatusDto) {
    return prisma.property.update({
      where: { id },
      data: {
        moderationStatus: dto.status,
        moderationComment: dto.comment,
        tokenizationDate: dto.status === "Approved" ? new Date() : null,
      },
      include: {
        location: true,
        manager: true,
      },
    });
  }
}
