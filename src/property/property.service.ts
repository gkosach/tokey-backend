import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { prisma, s3Config } from "../common";
import { CreatePropertyDto } from "./contract/dto/create-property.dto";
import { PropertyError, UpdateModerationStatusDto } from "./index";
import { ModerationStatus, Property } from "@prisma/client";

export class PropertyService {
  async createProperty(dto: CreatePropertyDto, files: Express.Multer.File[]): Promise<Property> {
    try {
      const photoUrls = await this.uploadFilesToS3(files);

      return prisma.property.create({
        data: {
          title: dto.title,
          solanaMint: dto.solanaMint,
          ownerId: dto.ownerId,
          metadata: {
            ...dto.metadata,
            address: dto.address,
            photos: photoUrls,
          },
          moderationStatus: ModerationStatus.PENDING,
        },
        include: { owner: true },
      });
    } catch {
      throw PropertyError.databaseError();
    }
  }

  async getProperty(id: string): Promise<Property> {
    this.validateUuid(id);

    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            cognitoId: true,
          },
        },
      },
    });

    if (!property) throw PropertyError.notFound();
    return property;
  }

  async getAllProperties(includeStaking: boolean): Promise<Property[]> {
    return prisma.property.findMany({
      include: {
        stakingRecords: includeStaking,
        owner: true,
      },
    });
  }

  async getPropertiesForModeration(): Promise<Property[]> {
    return prisma.property.findMany({
      where: { moderationStatus: ModerationStatus.PENDING },
      include: { owner: true },
    });
  }

  async updateModerationStatus(id: string, dto: UpdateModerationStatusDto): Promise<Property> {
    this.validateUuid(id);

    return prisma.property.update({
      where: { id },
      data: {
        moderationStatus: dto.status,
        moderationComment: dto.comment,
        tokenizationDate: dto.status === ModerationStatus.APPROVED ? new Date() : null,
      },
      include: { owner: true },
    });
  }

  private validateUuid(id: string): void {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new Error("Invalid ID format");
    }
  }

  private async uploadFilesToS3(files: Express.Multer.File[]): Promise<string[]> {
    return Promise.all(
      files.map((file) => {
        return this.uploadToS3(file);
      }),
    );
  }

  private async uploadToS3(file: Express.Multer.File): Promise<string> {
    try {
      const extension = file.originalname.split(".").pop()?.toLowerCase() || "bin";
      const filename = `${uuidv4()}.${extension}`;

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
    } catch {
      throw PropertyError.uploadFailed();
    }
  }
}
