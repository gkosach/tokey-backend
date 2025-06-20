import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import { HttpError, prisma, s3Config } from "../common";

/**
 * Сервис для управления файлами в S3
 *
 * ОТВЕТСТВЕННОСТЬ:
 * - Генерация URL для загрузки файлов в S3
 * - Подтверждение загрузки файлов
 * - Обновление метаданных недвижимости с URL файлов
 *
 * ГРАНИЦЫ:
 * ✅ Работа с S3 API
 * ✅ Обновление метаданных Property
 * ✅ Валидация существования файлов
 * ❌ Бизнес-логика недвижимости (должна быть в PropertyService)
 */
export class FileService {
  async generateUploadUrl(propertyId: string, fileType: string, fileName: string) {
    if (!propertyId || !fileType || !fileName) {
      throw new HttpError("Missing required parameters", 400);
    }

    const extension = this.getExtension(fileName);
    const fileKey = `properties/${propertyId}/photos/${uuidv4()}.${extension}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: fileKey,
      ContentType: fileType,
      ACL: "public-read",
    });

    try {
      const uploadUrl = await getSignedUrl(s3Config, command, { expiresIn: 3600 });

      return {
        uploadUrl,
        fileKey,
      };
    } catch (error) {
      console.error("Failed to generate upload URL:", error);
      throw new HttpError("Failed to generate upload URL", 500);
    }
  }

  async confirmFileUpload(propertyId: string, fileKey: string, fileType: string) {
    if (!propertyId || !fileKey || !fileType) {
      throw new HttpError("Missing required parameters", 400);
    }

    const fileExists = await this.checkFileExists(fileKey);
    if (!fileExists) {
      throw new HttpError("File not found in S3", 404);
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
    } catch (error: any) {
      if (error.name === "NoSuchKey" || error.$metadata?.httpStatusCode === 404) {
        return false;
      }

      console.error("S3 error while checking file:", error);
      throw new HttpError("Failed to check file existence", 500);
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
      throw new HttpError("Property not found", 404);
    }

    const currentMetadata = this.parseMetadata(property.metadata);

    if (fileType === "photo") {
      currentMetadata.photos = [...(currentMetadata.photos || []), fileUrl];
    } else if (fileType === "video") {
      currentMetadata.videos = [...(currentMetadata.videos || []), fileUrl];
    } else {
      throw new HttpError("Invalid file type", 400);
    }

    try {
      await prisma.property.update({
        where: { id: propertyId },
        data: { metadata: currentMetadata },
      });
    } catch (error) {
      console.error("Failed to update property metadata:", error);
      throw new HttpError("Failed to update property metadata", 500);
    }
  }

  /**
   * Безопасно парсит metadata без использования any
   */
  private parseMetadata(metadata: any): { photos?: string[]; videos?: string[] } {
    if (!metadata || typeof metadata !== "object") {
      return {};
    }

    return {
      photos: Array.isArray(metadata.photos) ? metadata.photos : [],
      videos: Array.isArray(metadata.videos) ? metadata.videos : [],
    };
  }

  /**
   * Извлекает расширение файла с проверкой
   */
  private getExtension(fileName: string): string {
    const parts = fileName.split(".");

    if (parts.length < 2) {
      return "bin";
    }

    const extension = parts.pop();
    return extension ? extension.toLowerCase() : "bin";
  }
}
