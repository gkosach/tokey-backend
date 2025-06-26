import { Request, Response } from "express";
import { AllowedFileTypes, HttpError, SUPPORTED_PROPERTY_FILE_TYPES } from "../../common";
import { FilesService } from "./files.service";

export class FilesController {
  constructor(private readonly filesService = new FilesService()) {}

  async uploadFile(req: Request, res: Response): Promise<void> {
    try {
      const { type } = req.body;
      const file = req.file;

      if (!type || !this.isAllowedFileType(type)) {
        res.status(400).json({ error: "Invalid file type" });
        return;
      }
      if (!file) {
        res.status(400).json({ error: "File is required" });
        return;
      }

      const propertyId = req.params.id;

      const canUpload = await this.filesService.canUploadFile(propertyId, type);
      if (!canUpload) {
        res.status(400).json({ error: "Achieved the limit for this type of files" });
        return;
      }

      await this.filesService.saveFile(propertyId, file, type);

      res.status(201).json({
        success: true,
      });
    } catch (error) {
      console.error("Error in uploadFile:", error);
      throw new HttpError("File upload failed", 500);
    }
  }

  async getFile(req: Request, res: Response): Promise<void> {
    try {
      const { path } = req.query;

      if (!path) {
        res.status(400).json({ error: "File path is required" });
        return;
      }

      const fileData = await this.filesService.getFile(path.toString());

      res.status(200).json({
        success: true,
        data: fileData,
      });
    } catch (error) {
      console.error("Error in getFile:", error);
      throw new HttpError("Error getting file", 500);
    }
  }

  async getFilePaths(req: Request, res: Response): Promise<void> {
    try {
      const { id: propertyId } = req.params;

      const filePathsData = await this.filesService.listFilesPaths(propertyId);

      res.status(200).json({
        success: true,
        data: filePathsData,
      });
    } catch (error) {
      console.error("Error in getFilePaths:", error);
      throw new HttpError("Error getting file", 500);
    }
  }

  private isAllowedFileType(type: unknown): type is AllowedFileTypes {
    return SUPPORTED_PROPERTY_FILE_TYPES.includes(type as AllowedFileTypes);
  }
}

export const filesController = new FilesController();
