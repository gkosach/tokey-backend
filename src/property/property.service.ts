import { PrismaClient, PropertyType } from "@prisma/client";
import { CreatePropertyDto } from "./contract/dto/property.dto";
import { UpdateModerationStatusDto } from "./contract/dto/property-moderation.dto";
import { Geocoder } from "../common/utils/geocoder";

const prisma = new PrismaClient();

export class PropertyService {
  async createProperty(dto: CreatePropertyDto, files: Express.Multer.File[]) {
    const photoUrls = files?.length ? this.uploadToS3(files) : [];
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
          manager: dto.managerCognitoId ? { connect: { cognitoId: dto.managerCognitoId } } : undefined,
        },
        include: {
          location: true,
          manager: { select: { id: true, name: true } },
        },
      });
    });
  }

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

  private uploadToS3(files: Express.Multer.File[]): string[] {
    return files.map((file) => `s3://bucket/${Date.now()}-${file.originalname}`);
  }

  async getPropertiesForModeration() {
    return prisma.property.findMany({
      where: {
        moderationStatus: "Pending",
        manager: { kycStatus: "Approved" }, // Только от верифицированных менеджеров
      },
      include: {
        location: true,
        manager: true,
      },
    });
  }

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
