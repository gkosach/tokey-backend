import { Request, Response } from "express";
import { HttpError, UploadFilesProcessingResult, UploadFilesRequest } from "../../common";
import { PropertyService } from "../property.service";
import { PropertyFilesService } from "./property-files.service";

export class PropertyFilesController {
  constructor(
    private readonly propertiesService = new PropertyService(),
    private readonly propertyFilesService = new PropertyFilesService(),
  ) {}

  async uploadFiles(req: UploadFilesRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!req.files) {
        res.status(400).json({ error: "Invalid files payload" });
        return;
      }

      await this.validatePropertyId(id);

      const { images = [], videos = [], documents = [] } = req.files as Record<string, Express.Multer.File[]>;
      const acc = await this.processUploads(id, { images, videos, documents });
      if (!acc.saved.length) {
        res.status(400).json({ error: acc.errors.map((e) => `${e.filename}: ${e.error}`).join("\n") });
      } else {
        res.status(201).json({ success: true, data: acc });
      }
    } catch (error) {
      console.error("Error in uploadAllFiles:", error);
      throw new HttpError("Error loading all files", 500);
    }
  }

  async getFile(req: Request, res: Response): Promise<void> {
    try {
      const { id, fileId } = req.params;

      await this.validatePropertyId(id);

      const file = await this.propertyFilesService.getFileById(id.toString(), fileId.toString());

      res.setHeader("Content-Type", file.mimetype);
      res.setHeader("Content-Disposition", `inline; filename="${file.originalname}"`);
      res.status(200).send(file.buffer);
    } catch (error) {
      console.error("Error in getFile:", error);
      throw new HttpError("Error getting file", 500);
    }
  }

  async getFilePath(req: Request, res: Response): Promise<void> {
    try {
      const { id, fileId } = req.params;

      await this.validatePropertyId(id);

      const filePath = await this.propertyFilesService.getFilePath(id, fileId);

      res.status(200).json({
        success: true,
        data: filePath,
      });
    } catch (error) {
      console.error("Error in getFilePath:", error);
      throw new HttpError("Error getting file path", 500);
    }
  }

  async listFilesPaths(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      await this.validatePropertyId(id);

      const filePathsData = await this.propertyFilesService.listFilesPaths(id);

      res.status(200).json({
        success: true,
        data: filePathsData,
      });
    } catch (error) {
      console.error("Error in getFilePaths:", error);
      throw new HttpError("Error getting file", 500);
    }
  }

  private async processUploads(
    propertyId: string,
    { images, videos, documents }: Record<string, Express.Multer.File[]>,
  ) {
    const acc: UploadFilesProcessingResult = { saved: [], errors: [] };

    for (const [files, type] of [
      [images, "image"],
      [videos, "video"],
      [documents, "application/pdf"],
    ] as const) {
      for (const file of files) {
        const result = await this.propertyFilesService.processSingleFile(propertyId, file, type);
        if (result.error) {
          acc.errors.push({ filename: file.originalname, error: result.error });
        }
        if (result.saved) {
          acc.saved.push(result.saved);
        }
      }
    }

    return acc;
  }

  private async validatePropertyId(propertyId: string) {
    const property = await this.propertiesService.getPropertyById(propertyId);
    if (!property) {
      throw new HttpError("Property id is invalid or not found", 400);
    }
  }
}

export const propertyFilesController = new PropertyFilesController();
