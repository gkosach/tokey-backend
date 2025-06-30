import { Prisma, Property, PropertyStatus } from "@prisma/client";
import { HttpError, prisma, PropertyMedia } from "../common";

/**
 * Сервис для управления объектами недвижимости
 *
 * ОТВЕТСТВЕННОСТЬ:
 * - CRUD операции с Property entity
 * - Фильтрация и поиск недвижимости
 * - Управление токенами и статусами
 * - Валидация данных недвижимости
 */
export class PropertyService {
  /**
   * Создает объект недвижимости БЕЗ файлов
   */
  async createProperty(data: Prisma.PropertyCreateInput): Promise<Property> {
    return prisma.property.create({
      data: {
        ...data,
        status: PropertyStatus.COMING_SOON,
      },
    });
  }

  async updatePropertyFiles(propertyId: string, files: PropertyMedia[]) {}

  /**
   * Получает объект недвижимости по ID
   */
  async getPropertyById(id: string): Promise<Property> {
    this.validateUuid(id);

    const property = await prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      throw new HttpError("Property not found", 404);
    }

    return property;
  }

  /**
   * Получает все объекты недвижимости с фильтрацией
   * // TODO: добавить ограничение для защиты от перегрузки
   */
  async getAllProperties(filters?: {
    districts?: string[];
    status?: PropertyStatus;
    roi?: number;
    minPrice?: number;
    maxPrice?: number;
    limit?: number;
    offset?: number;
    type?: string;
    sort?: "title_asc" | "title_desc" | "price_asc" | "price_desc";
  }): Promise<{ properties: Property[]; total: number }> {
    const where: Prisma.PropertyWhereInput = {};
    const orderBy: Prisma.PropertyOrderByWithRelationInput = {};

    // Для roi
    if (filters?.roi !== undefined && !isNaN(filters.roi)) {
      where.roi = { gte: filters.roi };
    }

    // Для district
    if (filters?.districts && filters.districts.length > 0) {
      where.district = { in: filters.districts };
    }

    // Для price
    if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
      where.price = {};

      if (filters.minPrice !== undefined && !isNaN(filters.minPrice)) {
        where.price.gte = filters.minPrice;
      }

      if (filters.maxPrice !== undefined && !isNaN(filters.maxPrice)) {
        where.price.lte = filters.maxPrice;
      }
    }

    // Status filter
    if (filters?.status) {
      where.status = filters.status;
    }

    // Type filter
    if (filters?.type) {
      where.type = filters.type;
    }

    // Sorting
    if (filters?.sort) {
      switch (filters.sort) {
        case "title_asc":
          orderBy.title = "asc";
          break;
        case "title_desc":
          orderBy.title = "desc";
          break;
        case "price_asc":
          orderBy.price = "asc";
          break;
        case "price_desc":
          orderBy.price = "desc";
          break;
        default:
          orderBy.createdAt = "desc";
          break;
      }
    } else {
      orderBy.createdAt = "desc";
    }

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        orderBy,
        take: filters?.limit ?? 20,
        skip: filters?.offset ?? 0,
      }),
      prisma.property.count({ where }),
    ]);

    return { properties, total };
  }

  /**
   * Получает уникальные районы
   */
  async getAvailableDistricts(): Promise<{ districts: string[] }> {
    const response = await prisma.property.findMany({
      select: { district: true },
      distinct: ["district"],
    });

    return {
      districts: response.map((p) => p.district),
    };
  }

  /**
   * Валидация UUID (принимает любую версию UUID)
   */
  private validateUuid(id: string): void {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new HttpError("Invalid ID format", 400);
    }
  }

  /**
   * Проверяет недвижимость и доступность токенов
   */
  async validatePropertyForPurchase(propertyId: string, tokensAmount: number) {
    if (tokensAmount <= 0) {
      throw new HttpError("Tokens amount must be positive", 400);
    }

    this.validateUuid(propertyId);

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      throw new HttpError("Property not found", 404);
    }

    if (property.status !== PropertyStatus.ACTIVE) {
      throw new HttpError("Property is not available for purchase", 400);
    }

    if (property.availableTokens < tokensAmount) {
      throw new HttpError("Insufficient tokens available", 400);
    }

    return property;
  }

  /**
   * Обновляет доступные токены после покупки
   */
  async updateTokensAfterPurchase(propertyId: string, tokensAmount: number) {
    return prisma.$transaction(async (tx) => {
      const property = await tx.property.findUnique({
        where: { id: propertyId },
        select: { availableTokens: true, status: true },
      });

      if (!property) {
        throw new HttpError("Property not found", 404);
      }
      if (property.availableTokens < tokensAmount) {
        throw new HttpError("Insufficient tokens available", 400);
      }

      const newAvailableTokens = property.availableTokens - tokensAmount;
      const newStatus = newAvailableTokens === 0 ? PropertyStatus.SOLD_OUT : property.status;

      return tx.property.update({
        where: { id: propertyId },
        data: {
          availableTokens: newAvailableTokens,
          status: newStatus,
        },
      });
    });
  }
}
