import { Request, Response } from "express";
import { fileTypeFromBuffer } from "file-type";
import {
  ALLOWED_MIME_TYPES,
  AllowedFileTypes,
  HttpError,
  UploadFilesProcessingResult,
  UploadFilesRequest,
} from "../../common";
import { PropertyService } from "../property.service";
import { FilesService } from "./files.service";

export class FilesController {
  constructor(
    private readonly filesService = new FilesService(),
    private readonly propertiesService = new PropertyService(),
  ) {}

  async uploadFiles(req: UploadFilesRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const propertyIdIsValid = await this.validatePropertyId(res, id);
      if (!propertyIdIsValid) return;

      const { images = [], videos = [], documents = [] } = req.files as Record<string, Express.Multer.File[]>;

      const uploadedImageObj = await this.processUploads(images, "image", id);
      const uploadedVideoObj = await this.processUploads(videos, "video", id);
      const uploadedDocumentObj = await this.processUploads(documents, "application/pdf", id);

      this.processUploadsResult(res, uploadedImageObj, uploadedVideoObj, uploadedDocumentObj);
    } catch (error) {
      console.error("Error in uploadAllFiles:", error);
      throw new HttpError("Error loading all files", 500);
    }
  }

  // TODO: добавить оптимизацию для видеопотоков
  async getFile(req: Request, res: Response): Promise<void> {
    try {
      const { id, fileId } = req.params;

      const propertyIdIsValid = await this.validatePropertyId(res, id);
      if (!propertyIdIsValid) return;
      if (this.validateFileId(res, fileId)) return;

      const file = await this.filesService.getFileById(id.toString(), fileId.toString());

      res.setHeader("Content-Type", file.mimetype);
      res.setHeader("Content-Disposition", `inline; filename="${file.originalname}"`);
      res.send(file.buffer);
    } catch (error) {
      console.error("Error in getFile:", error);
      throw new HttpError("Error getting file", 500);
    }
  }
  async getFilePath(req: Request, res: Response): Promise<void> {
    try {
      const { id, fileId } = req.params;

      const propertyIdIsValid = await this.validatePropertyId(res, id);
      if (!propertyIdIsValid) return;
      if (this.validateFileId(res, fileId)) return;

      const filePath = await this.filesService.getFilePath(id, fileId);

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

      const propertyIdIsValid = await this.validatePropertyId(res, id);
      if (!propertyIdIsValid) return;

      const filePathsData = await this.filesService.listFilesPaths(id);

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
    files: Express.Multer.File[],
    type: AllowedFileTypes,
    propertyId: string,
  ): Promise<UploadFilesProcessingResult> {
    const acc: UploadFilesProcessingResult = {
      errors: [],
      saved: [],
    };
    for (const file of files) {
      if (!(await this.uploadPayloadIsValid(file, type))) {
        acc.errors.push({ fileName: file.originalname, error: `Invalid ${type}: ${file.originalname}` });
        continue;
      }
      const canUpload = await this.filesService.canUploadFile(propertyId, type);
      if (!canUpload) {
        acc.errors.push({
          fileName: file.originalname,
          error: `${type[0].toUpperCase() + type.slice(1)} limit exceeded`,
        });
        continue;
      }
      const id = await this.filesService.saveFile(propertyId, file, type);
      acc.saved.push(id);
    }
    return acc;
  }
  private async processUploadsResult(res: Response, ...uploadResObjs: UploadFilesProcessingResult[]) {
    const uploadResObj = uploadResObjs.reduce<UploadFilesProcessingResult>(
      (acc, v) => {
        acc.saved.push(...v.saved);
        acc.errors.push(...v.errors);
        return acc;
      },
      {
        errors: [],
        saved: [],
      },
    );

    if (!uploadResObj.saved.length) {
      res.status(400).json({ errors: uploadResObj.errors });
    } else {
      res.status(201).json(uploadResObj);
    }
  }
  private async uploadPayloadIsValid(file: Express.Multer.File, type: AllowedFileTypes): Promise<boolean> {
    const fileType = await this.detectFileType(file?.buffer);
    return fileType === type;
  }
  private async detectFileType(buffer: Buffer): Promise<AllowedFileTypes | null> {
    const type = await fileTypeFromBuffer(buffer);

    if (!type) return null;

    if (type.mime === "application/pdf") return "application/pdf";
    if (ALLOWED_MIME_TYPES.image.includes(type.mime as any)) return "image";
    if (ALLOWED_MIME_TYPES.video.includes(type.mime as any)) return "video";

    return null;
  }

  private async validatePropertyId(res: Response, propertyId: string) {
    try {
      const property = await this.propertiesService.getPropertyById(propertyId);
      if (!property) {
        res.status(400).json({ error: "File id is required" });
        return false;
      }
      return true;
    } catch (error) {
      res.status(400).json({ error: "File id is invalid" });
      return false;
    }
  }
  private validateFileId(res: Response, fileId: string): boolean {
    if (!fileId) {
      res.status(400).json({ error: "File id is required" });
      return false;
    }
    return true;
  }
}

export const filesController = new FilesController();
