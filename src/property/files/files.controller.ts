import { Request, Response } from "express";
import { AllowedFileTypes, HttpError, MAX_FILE_SIZE_BYTES, SUPPORTED_PROPERTY_FILE_TYPES } from "../../common";
import { FilesService } from "./files.service";

export class FilesController {
  constructor(private readonly filesService = new FilesService()) {}

  async uploadFile(req: Request, res: Response): Promise<void> {
    try {
      const { type } = req.body;
      const file = req.file;

      if (!file) {
        res.status(400).json({ error: "File is required" });
        return;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        res.status(400).json({ error: "File size limit is exceeded" });
        return;
      }

      const payloadIsValid = this.uploadPayloadIsValid(file, type);
      if (!payloadIsValid) {
        res.status(400).json({ error: "Invalid payload" });
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

  // TODO: добавить оптимизацию для видеопотоков
  async getFile(req: Request, res: Response): Promise<void> {
    try {
      const { path } = req.query;

      if (!path) {
        res.status(400).json({ error: "File path is required" });
        return;
      }

      const file = await this.filesService.getFileByPath(path.toString());

      res.setHeader("Content-Type", file.mimetype);
      res.setHeader("Content-Disposition", `inline; filename="${file.originalname}"`);
      res.send(file.buffer);
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

  private uploadPayloadIsValid(file: Express.Multer.File, type?: unknown): boolean {
    if (!type || !(typeof type === "string")) return false;
    if (!this.fileTypeIsValid(type)) return false;

    const fileType = this.detectFileType(file?.buffer);
    if (!fileType || fileType !== type) return false;

    return true;
  }
  private fileTypeIsValid(type: unknown): type is AllowedFileTypes {
    return SUPPORTED_PROPERTY_FILE_TYPES.includes(type as AllowedFileTypes);
  }
  private detectFileType(buffer: Buffer): AllowedFileTypes | null {
    if (buffer.subarray(0, 4).toString("utf8") === "%PDF") return "application/pdf";

    if (buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "image";

    if (
      buffer.subarray(4, 8).toString("utf8") === "ftyp" ||
      buffer.subarray(0, 4).equals(Buffer.from([0x00, 0x00, 0x00, 0x18])) // для MP4/QuickTime
    )
      return "video";

    return null;
  }
}

export const filesController = new FilesController();
