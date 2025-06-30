import fsp from "node:fs/promises";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";
import {
  AllowedFileTypes,
  createEmptyFilesRecord,
  FileLike,
  FilesPathsRecord,
  PROPERTY_FILE_LIMITS,
  SUPPORTED_PROPERTY_FILE_TYPES,
} from "../../common";
import { FileStorageService } from "../../file-storage/file-storage.service";

const storageRoot = path.join(__dirname, "uploads", "properties");

/**
 * Сервис для управления файлами недвижимости
 *
 */
export class FilesService {
  constructor(private readonly storage = new FileStorageService(storageRoot)) {}

  async canUploadFile(propertyId: string, type: AllowedFileTypes): Promise<boolean> {
    const propertyDir = this.getAbsolutePath(propertyId);
    const indexPath = path.join(propertyDir, "index.json");

    try {
      const raw = await fsp.readFile(indexPath, "utf-8");
      const index = JSON.parse(raw) as FilesPathsRecord;
      return (index[type]?.length ?? 0) < PROPERTY_FILE_LIMITS[type];
    } catch (e: any) {
      if (e.code === "ENOENT") return true;
      throw e;
    }
  }

  async saveFile(propertyId: string, file: FileLike, type: AllowedFileTypes) {
    const subDirName = this.getRandomUUID();
    const fileName = type === "video" ? "video.mp4" : file.originalname || subDirName;
    const filePath = this.getAbsolutePath(propertyId, subDirName, fileName);

    await this.storage.saveFile(filePath, file);

    const propertyDir = this.getAbsolutePath(propertyId);
    await this.storage.updateIndex(propertyDir, (current) => {
      const updated = { ...current };
      updated[type] = [...(updated[type] || []), filePath];
      return updated;
    });

    return subDirName;
  }

  async deleteFile(propertyId: string, filePath: string, type: AllowedFileTypes): Promise<void> {
    await this.storage.deleteFile(filePath);

    const propertyDir = this.getAbsolutePath(propertyId);
    await this.storage.updateIndex(propertyDir, (current) => {
      const updated = { ...current };
      updated[type] = (updated[type] || []).filter((p) => p !== filePath);
      return updated;
    });
  }

  async listFilesPathsByType(propertyId: string, type: AllowedFileTypes): Promise<Partial<FilesPathsRecord>> {
    const dirPath = this.getAbsolutePath(propertyId);

    const dirExists = await this.storage.dirExists(dirPath);
    if (!dirExists) return Object.fromEntries([[type]]);
    const paths = await this.storage.listAllFilePaths(dirPath);

    return Object.fromEntries([[type, paths]]) as Partial<FilesPathsRecord>;
  }

  async listFilesPaths(propertyId: string): Promise<FilesPathsRecord> {
    const initialRecord = createEmptyFilesRecord();

    const filesPathsPromises = SUPPORTED_PROPERTY_FILE_TYPES.map((t) => this.listFilesPathsByType(propertyId, t));
    const filePathsRecords = await Promise.all(filesPathsPromises);

    const filesPathsRecord = filePathsRecords.reduce<FilesPathsRecord>((acc, v) => ({ ...acc, ...v }), initialRecord);

    return filesPathsRecord;
  }

  async getFileById(propertyId: string, fileId: string) {
    const absPath = this.getAbsolutePath(propertyId, fileId);
    return await this.storage.getFile(absPath);
  }
  async getFilePath(propertyId: string, fileId: string) {
    const absPath = this.getAbsolutePath(propertyId, fileId);
    return await this.storage.getFilePath(absPath);
  }

  private getAbsolutePath(...segments: string[]) {
    return path.join(storageRoot, ...segments);
  }

  private getRandomUUID(): string {
    return uuidv4();
  }
}
