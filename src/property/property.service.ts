import { Files, Prisma, Property, PropertyStatus } from "@prisma/client";
import { HttpError, prisma } from "../common";

export class PropertyService {
  async createProperty(data: Prisma.PropertyCreateInput): Promise<Property> {
    return prisma.property.create({
      data: {
        ...data,
        status: PropertyStatus.COMING_SOON,
      },
    });
  }

  async createFileRecords(data: Files[]) {
    return prisma.files.createManyAndReturn({ data });
  }

  async getPropertyById(id: string): Promise<Property & { tiers: any[] }> {
    this.validateUuid(id);

    const property = await prisma.property.findUnique({
      where: { id },
      include: { tiers: true },
    });

    if (!property) {
      throw new HttpError("Property not found", 404);
    }

    return property;
  }

  async getAllProperties(filters?: {
    status?: PropertyStatus;
    limit?: number;
    offset?: number;
  }): Promise<{ properties: Property[]; total: number }> {
    const where: Prisma.PropertyWhereInput = {};

    if (filters?.status) {
      where.status = filters.status;
    }

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: filters?.limit ?? 20,
        skip: filters?.offset ?? 0,
        include: { tiers: true },
      }),
      prisma.property.count({ where }),
    ]);

    return { properties, total };
  }

  async updatePropertyStatus(id: string, status: PropertyStatus): Promise<Property> {
    this.validateUuid(id);

    return prisma.property.update({
      where: { id },
      data: { status },
    });
  }

  private validateUuid(id: string): void {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new HttpError("Invalid ID format", 400);
    }
  }
}
