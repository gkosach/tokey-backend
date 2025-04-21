import { PropertyType } from "@prisma/client";
import { CreatePropertyDto, UpdateModerationStatusDto } from "./index";
import { prisma, s3, Geocoder } from "../common";
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";

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
    const uploadPromises = files.map((file) => this.uploadToS3(file));
    const photoUrls = await Promise.all(uploadPromises);

    const { lat, lng } = await Geocoder.geocode(dto.address);

    return prisma.$transaction(async (tx) => {
      return tx.property.create({
        data: {
          ...dto,
          photoUrls,
          location: {
            create: {
              address: dto.address,
              latitude: lat,
              longitude: lng,
            },
          },
          manager: dto.managerCognitoId
            ? {
                connect: { cognitoId: dto.managerCognitoId },
              }
            : undefined,
        },
        include: {
          location: true,
          manager: { select: { id: true, name: true } },
        },
      });
    });
  }

  /**
   * Получает объект недвижимости по ID
   * @param id - Идентификатор объекта
   * @returns Объект недвижимости с локацией и информацией о менеджере
   */
  async getProperty(id: string) {
    const propertyId = Number(id);
    if (isNaN(propertyId)) throw new Error("Invalid ID");

    return prisma.property.findUnique({
      where: { id: propertyId },
      include: {
        location: true,
        manager: { select: { id: true, name: true } },
      },
    });
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
    const page = filter.page || 1;
    const limit = filter.limit || 10;

    return prisma.property.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        tokenPrice: {
          gte: filter.minPrice,
          lte: filter.maxPrice,
        },
        propertyType: filter.type ? { equals: filter.type } : undefined,
      },
      include: { location: true },
    });
  }

  /**
   * Загружает файл в S3 хранилище
   * @param file - Файл для загрузки
   * @returns URL загруженного файла
   */
  private async uploadToS3(file: Express.Multer.File): Promise<string> {
    try {
      const extension = file.originalname.split(".").pop() || "bin";
      const filename = `${uuidv4()}.${extension}`;

      const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: filename,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read",
      });

      await s3.send(command);
      return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;
    } catch (error) {
      console.error("S3 upload failed:", error);
      throw new Error("Failed to upload file to S3");
    }
  }

  /**
   * Получает объекты недвижимости для модерации
   * @returns Список объектов, ожидающих модерацию
   */
  async getPropertiesForModeration() {
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
