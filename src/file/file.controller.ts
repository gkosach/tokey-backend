import { Request, Response } from "express";
import { FileService } from "./file.service";

export class FileController {
  constructor(readonly fileService: FileService = new FileService()) {}

  /**
   * Генерирует signed URL для загрузки
   */
  async getUploadUrl(req: Request, res: Response): Promise<void> {
    const { propertyId, fileType, fileName } = req.body;

    const uploadData = await this.fileService.generateUploadUrl(propertyId, fileType, fileName);

    res.json({
      success: true,
      data: uploadData,
    });
  }

  /**
   * Подтверждает загрузку и обновляет metadata
   */
  async confirmUpload(req: Request, res: Response): Promise<void> {
    const { propertyId, fileKey, fileType } = req.body;

    await this.fileService.confirmFileUpload(propertyId, fileKey, fileType);

    res.json({
      success: true,
      message: "File uploaded successfully",
    });
  }
}

export const fileController = new FileController();
