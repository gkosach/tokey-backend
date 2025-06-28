import { createHash } from "node:crypto";
import path from "node:path";
import {
  AllowedFileTypes,
  FileLike,
  FilesPathsRecord,
  PROPERTY_FILE_LIMITS,
  SUPPORTED_PROPERTY_FILE_TYPES,
} from "../../common";
import { FileStorageService } from "../../file-storage/file-storage.service";

const storageRoot = path.join(__dirname, "uploads", "units");

/**
 * Сервис для управления файлами недвижимости
 *
 */
export class FilesService {
  constructor(private readonly storage = new FileStorageService(storageRoot)) {}

  async canUploadFile(unitId: string, type: AllowedFileTypes) {
    const limit = PROPERTY_FILE_LIMITS[type];
    const pathsObj = await this.listFilesPathsByType(unitId, type);
    return !pathsObj[type] || pathsObj[type].length < limit;
  }

  async saveFile(unitId: string, file: FileLike, type: AllowedFileTypes) {
    const subDirName = this.getShortBufferId(file.buffer);
    const fileName = type === "video" ? "video.mp4" : file.originalname || subDirName;
    const filePath = path.join(unitId, type, subDirName, fileName);

    await this.storage.saveFile(filePath, file);
  }

  async listFilesPathsByType(unitId: string, type: AllowedFileTypes): Promise<Partial<FilesPathsRecord>> {
    const relativeDir = path.join(unitId, type);

    const dirExists = await this.storage.dirExists(relativeDir);
    if (!dirExists) return Object.fromEntries([[type]]);

    const filePaths = await this.storage.listAllFilePaths(relativeDir);
    return Object.fromEntries([[type, filePaths]]) as Partial<FilesPathsRecord>;
  }

  async listFilesPaths(unitId: string): Promise<FilesPathsRecord> {
    const initialRecord: FilesPathsRecord = {
      "application/pdf": [],
      image: [],
      video: [],
    };

    const filesPathsPromises = SUPPORTED_PROPERTY_FILE_TYPES.map((t) => this.listFilesPathsByType(unitId, t));
    const filePathsRecords = await Promise.all(filesPathsPromises);

    const filesPathsRecord = filePathsRecords.reduce<FilesPathsRecord>((acc, v) => ({ ...acc, ...v }), initialRecord);

    return filesPathsRecord;
  }

  async getFileByPath(relativePath: string) {
    return await this.storage.getFile(relativePath);
  }

  private getShortBufferId(buffer: Buffer): string {
    return createHash("sha256").update(buffer).digest().subarray(0, 12).toString("base64url");
  }
}
