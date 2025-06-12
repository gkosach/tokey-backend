import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import { prisma, s3Config } from "../common";
import { FileError } from "./index";

export class FileService {
  async generateUploadUrl(propertyId: string, fileType: string, fileName: string) {
    const extension = this.getExtension(fileName);
    const fileKey = `properties/${propertyId}/photos/${uuidv4()}.${extension}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: fileKey,
      ContentType: fileType,
      ACL: "public-read",
    });

    const uploadUrl = await getSignedUrl(s3Config, command, { expiresIn: 3600 });

    return {
      uploadUrl,
      fileKey,
    };
  }

  async confirmFileUpload(propertyId: string, fileKey: string, fileType: string) {
    const fileExists = await this.checkFileExists(fileKey);

    if (!fileExists) {
      throw FileError.notFound();
    }

    const fileUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

    await this.updatePropertyMetadata(propertyId, fileUrl, fileType);
  }

  /**
   * Проверяет существование файла в S3
   */
  private async checkFileExists(fileKey: string): Promise<boolean> {
    try {
      const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: fileKey,
      });

      await s3Config.send(command);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Обновляет метаданные недвижимости с URL файла
   */
  private async updatePropertyMetadata(propertyId: string, fileUrl: string, fileType: string) {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      throw FileError.propertyNotFound();
    }

    const currentMetadata = (property?.metadata as any) || {};

    if (fileType === "photo") {
      currentMetadata.photos = [...(currentMetadata.photos || []), fileUrl];
    } else if (fileType === "video") {
      currentMetadata.videos = [...(currentMetadata.videos || []), fileUrl];
    }

    await prisma.property.update({
      where: { id: propertyId },
      data: { metadata: currentMetadata },
    });
  }

  /**
   * Извлекает расширение файла
   */
  private getExtension(fileName: string): string {
    return fileName.split(".").pop()?.toLowerCase() || "bin";
  }
}
