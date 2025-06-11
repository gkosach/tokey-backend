import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Prisma, Property, PropertyStatus } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { prisma, s3Config } from "../common";
import { PropertyError } from "./index";

/** Тип для создания объекта недвижимости */
interface CreatePropertyData {
  title: string;
  contractAddress: string;
  developerId: string;
  district: string;
  totalTokens: number;
  availableTokens: number;
  description?: string;
  address?: string;
  roi?: number;
  price?: number;
}

/** Тип объекта с транзакциями */
type PropertyWithTransactions = Prisma.PropertyGetPayload<{
  include: {
    transactions: {
      include: {
        user: {
          select: {
            id: true;
            email: true;
          };
        };
      };
    };
  };
}>;

export class PropertyService {
  /**
   * Создает новый объект недвижимости с медиафайлами
   * @param data - Данные объекта недвижимости
   * @param files - Загружаемые фото и видео
   * @returns Созданный объект недвижимости
   */
  async createProperty(data: CreatePropertyData, files: Express.Multer.File[]): Promise<Property> {
    try {
      // Разделяем файлы на фото и видео
      const photos = files.filter((file) => file.mimetype.startsWith("image/"));
      const videos = files.filter((file) => file.mimetype.startsWith("video/"));

      const [photoUrls, videoUrls] = await Promise.all([
        this.uploadFilesToS3(photos, "photos"),
        this.uploadFilesToS3(videos, "videos"),
      ]);

      return prisma.property.create({
        data: {
          title: data.title,
          contractAddress: data.contractAddress,
          developerId: data.developerId,
          district: data.district,
          totalTokens: data.totalTokens,
          availableTokens: data.availableTokens,
          status: PropertyStatus.COMING_SOON,
          metadata: {
            description: data.description,
            address: data.address,
            roi: data.roi,
            price: data.price,
            photos: photoUrls,
            videos: videoUrls,
            createdAt: new Date().toISOString(),
          } as any,
        },
      });
    } catch (error) {
      console.error("Property creation failed:", error);
      throw PropertyError.databaseError();
    }
  }

  /**
   * Получает объект недвижимости по ID
   * @param id - Идентификатор объекта
   * @returns Объект недвижимости
   */
  async getProperty(id: string): Promise<Property> {
    this.validateUuid(id);

    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) throw PropertyError.notFound();
    return property;
  }

  /**
   * Получает объект недвижимости с транзакциями
   * @param id - Идентификатор объекта
   * @returns Объект с транзакциями
   */
  async getPropertyWithTransactions(id: string): Promise<PropertyWithTransactions> {
    this.validateUuid(id);

    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        transactions: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!property) throw PropertyError.notFound();
    return property;
  }

  /**
   * Получает все объекты недвижимости с фильтрацией
   * @param filters - Фильтры поиска
   * @returns Массив объектов недвижимости
   */
  async getAllProperties(filters?: {
    district?: string;
    status?: PropertyStatus;
    developerId?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ properties: Property[]; total: number }> {
    const where: Prisma.PropertyWhereInput = {};

    if (filters?.district) where.district = filters.district;
    if (filters?.status) where.status = filters.status;
    if (filters?.developerId) where.developerId = filters.developerId;

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: filters?.limit || 20,
        skip: filters?.offset || 0,
      }),
      prisma.property.count({ where }),
    ]);

    return { properties, total };
  }

  /**
   * Получает активные объекты для инвестирования
   * @returns Объекты со статусом ACTIVE
   */
  async getActiveProperties(): Promise<Property[]> {
    return prisma.property.findMany({
      where: {
        status: PropertyStatus.ACTIVE,
        availableTokens: { gt: 0 },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Обновляет статус объекта недвижимости
   * @param id - Идентификатор объекта
   * @param status - Новый статус
   * @returns Обновленный объект
   */
  async updatePropertyStatus(id: string, status: PropertyStatus): Promise<Property> {
    this.validateUuid(id);

    return prisma.property.update({
      where: { id },
      data: { status },
    });
  }

  /**
   * Обновляет количество доступных токенов после покупки
   * @param id - Идентификатор объекта
   * @param purchasedTokens - Количество купленных токенов
   * @returns Обновленный объект
   */
  async updateAvailableTokens(id: string, purchasedTokens: number): Promise<Property> {
    this.validateUuid(id);

    const property = await this.getProperty(id);
    const newAvailableTokens = property.availableTokens - purchasedTokens;

    if (newAvailableTokens < 0) {
      throw PropertyError.insufficientTokens();
    }

    return prisma.property.update({
      where: { id },
      data: {
        availableTokens: newAvailableTokens,
        status: newAvailableTokens === 0 ? PropertyStatus.SOLD_OUT : property.status,
      },
    });
  }

  /**
   * Получает статистику по объекту
   * @param id - Идентификатор объекта
   * @returns Статистика объекта
   */
  async getPropertyStats(id: string) {
    this.validateUuid(id);

    const [property, transactions] = await Promise.all([
      this.getProperty(id),
      prisma.tokenTransaction.findMany({
        where: { propertyId: id },
        select: {
          tokensAmount: true,
          createdAt: true,
        },
      }),
    ]);

    const totalSold = transactions.reduce((sum, tx) => sum + tx.tokensAmount, 0);
    const totalInvestors = await prisma.tokenTransaction.groupBy({
      by: ["userId"],
      where: { propertyId: id },
      _count: { userId: true },
    });

    return {
      property,
      totalTokensSold: totalSold,
      totalInvestors: totalInvestors.length,
      soldPercentage: (totalSold / property.totalTokens) * 100,
      recentTransactions: transactions.slice(0, 10),
    };
  }

  /**
   * Валидация UUID
   */
  private validateUuid(id: string): void {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new Error("Invalid ID format");
    }
  }

  /**
   * Загружает файлы в S3 с организацией по типам
   */
  private async uploadFilesToS3(files: Express.Multer.File[], type: "photos" | "videos"): Promise<string[]> {
    if (files.length === 0) return [];

    return Promise.all(files.map((file) => this.uploadToS3(file, type)));
  }

  /**
   * Загружает отдельный файл в S3
   */
  private async uploadToS3(file: Express.Multer.File, type: "photos" | "videos"): Promise<string> {
    try {
      const extension = file.originalname.split(".").pop()?.toLowerCase() || "bin";
      const filename = `properties/${type}/${uuidv4()}.${extension}`;

      await s3Config.send(
        new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: filename,
          Body: file.buffer,
          ContentType: file.mimetype,
          ACL: "public-read",
        }),
      );

      return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;
    } catch (error) {
      console.error("S3 upload failed:", error);
      throw PropertyError.uploadFailed();
    }
  }
}
