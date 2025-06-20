import { Prisma, Property, PropertyStatus } from "@prisma/client";
import { prisma, PropertyError, PropertyMaxPrice } from "../common";

export class PropertyService {
  /**
   * Создает объект недвижимости БЕЗ файлов
   */
  async createProperty(data: Prisma.PropertyCreateInput): Promise<Property> {
    return prisma.property.create({
      data: {
        title: data.title,
        contractAddress: data.contractAddress,
        developerId: data.developerId,
        district: data.district,
        type: data.type,
        totalTokens: data.totalTokens,
        availableTokens: data.availableTokens,
        status: PropertyStatus.COMING_SOON,
        description: data.description,
        address: data.address,
        roi: data.roi,
        price: data.price,
      },
    });
  }

  /**
   * Получает объект недвижимости по ID
   * @param id - Идентификатор объекта
   * @returns Объект недвижимости
   */
  async getPropertyById(id: string): Promise<Property> {
    this.validateUuid(id);

    const property = await prisma.property.findUnique({
      where: { id },
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
    districts?: string[];
    status?: PropertyStatus;
    roi?: number;
    minPrice?: number;
    maxPrice?: number;
    // developerId?: string;
    limit?: number;
    offset?: number;
  }): Promise<{ properties: Property[]; total: number }> {
    const where: Prisma.PropertyWhereInput = {
      district: filters?.districts ? { in: filters?.districts } : undefined,
      roi: { gte: filters?.roi || 0 },
      price: { gte: filters?.minPrice || 0, lte: filters?.maxPrice || PropertyMaxPrice },
    };

    console.log("WHERE", where);

    if (filters?.status) where.status = filters.status;
    // if (filters?.developerId) where.developerId = filters.developerId;

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

  async getAvailableDistricts() {
    const response = await prisma.property.findMany({ select: { district: true } });

    return response.reduce<{ districts: string[] }>(
      (acc, p) => {
        acc.districts.push(p.district);
        return acc;
      },
      { districts: [] },
    );
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
   * Валидация UUID
   */
  private validateUuid(id: string): void {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new Error("Invalid ID format");
    }
  }
}
