import { Request, Response } from "express";
import { fileTypeFromBuffer } from "file-type";
import {
  ALLOWED_MIME_TYPES,
  AllowedFileTypes,
  HttpError,
  SUPPORTED_PROPERTY_FILE_TYPES,
  UploadFilesRequest,
} from "../../common";
import { FilesService } from "./files.service";

export class FilesController {
  constructor(private readonly filesService = new FilesService()) {}

  async uploadFiles(req: UploadFilesRequest, res: Response): Promise<void> {
    try {
      const propertyId = req.params.id;

      if (!req.files) {
        res.status(400).json({ error: `Invalid payload` });
        return;
      }

      const images = (req.files.images ?? []) as Express.Multer.File[];
      const documents = (req.files?.["application/pdf"] ?? []) as Express.Multer.File[];
      const videos = (req.files?.["videos"] ?? []) as Express.Multer.File[];

      for (const file of images) {
        if (!this.uploadPayloadIsValid(file, "image")) {
          res.status(400).json({ error: `Invalid image: ${file.originalname}` });
          return;
        }
        const canUpload = await this.filesService.canUploadFile(propertyId, "image");

        if (!canUpload) {
          res.status(400).json({ error: "Image limit exceeded" });
          return;
        }

        await this.filesService.saveFile(propertyId, file, "image");
      }

      for (const video of videos) {
        if (!this.uploadPayloadIsValid(video, "video")) {
          res.status(400).json({ error: `Invalid video: ${video.originalname}` });
          return;
        }
        const canUpload = await this.filesService.canUploadFile(propertyId, "video");
        if (!canUpload) {
          res.status(400).json({ error: "Video limit exceeded" });
          return;
        }
        await this.filesService.saveFile(propertyId, video, "video");
      }

      for (const file of documents) {
        if (!this.uploadPayloadIsValid(file, "application/pdf")) {
          res.status(400).json({ error: `Invalid document: ${file.originalname}` });
          return;
        }
        const canUpload = await this.filesService.canUploadFile(propertyId, "application/pdf");
        if (!canUpload) {
          res.status(400).json({ error: "Document limit exceeded" });
          return;
        }
        await this.filesService.saveFile(propertyId, file, "application/pdf");
      }

      res.status(201).json({ success: true });
    } catch (error) {
      console.error("Error in uploadAllFiles:", error);
      throw new HttpError("Error loading all files", 500);
    }
  }

  // TODO: добавить оптимизацию для видеопотоков
  async getFile(req: Request, res: Response): Promise<void> {
    try {
      const { id, fileId } = req.params;

      console.log(fileId);

      if (!fileId) {
        res.status(400).json({ error: "File id is required" });
        return;
      }

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

      if (!fileId) {
        res.status(400).json({ error: "File id is required" });
        return;
      }

      const filePath = await this.filesService.getFilePath(id.toString(), fileId.toString());

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

  private async uploadPayloadIsValid(file: Express.Multer.File, type?: unknown): Promise<boolean> {
    if (!type || !(typeof type === "string")) return false;
    if (!this.fileTypeIsValid(type)) return false;

    const fileType = await this.detectFileType(file?.buffer);
    if (!fileType || fileType !== type) return false;

    return true;
  }
  private fileTypeIsValid(type: unknown): type is AllowedFileTypes {
    return SUPPORTED_PROPERTY_FILE_TYPES.includes(type as AllowedFileTypes);
  }
  private async detectFileType(buffer: Buffer): Promise<AllowedFileTypes | null> {
    const type = await fileTypeFromBuffer(buffer);

    if (!type) return null;

    if (type.mime === "application/pdf") return "application/pdf";
    if (ALLOWED_MIME_TYPES.image.includes(type.mime as any)) return "image";
    if (ALLOWED_MIME_TYPES.video.includes(type.mime as any)) return "video";

    return null;
  }
}

export const filesController = new FilesController();
