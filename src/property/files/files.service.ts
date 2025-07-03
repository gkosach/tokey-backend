import path from "node:path";
import { v4 as uuidv4 } from "uuid";
import {
  AllowedFileTypes,
  createEmptyFilesRecord,
  FileIndexEntry,
  FileLike,
  FilesPathsRecord,
  PROPERTY_FILE_LIMITS,
} from "../../common";
import { StorageService } from "../../storage/storage.service";

const storageRoot = path.join("uploads", "properties");

/**
 * Сервис для управления файлами недвижимости
 *
 */
export class FilesService {
  constructor(private readonly storage = new StorageService(storageRoot)) {}

  async canUploadFile(propertyId: string, type: AllowedFileTypes): Promise<boolean> {
    const propertyDir = this.getRelativePath(propertyId);

    try {
      const index = await this.storage.getIndex(propertyDir);

      if (!index || !index[type]) return true;

      return index[type].length < PROPERTY_FILE_LIMITS[type];
    } catch (e: any) {
      if (e.code === "ENOENT") return true;
      throw e;
    }
  }

  async saveFile(propertyId: string, file: FileLike, type: AllowedFileTypes) {
    const subDirName = this.getRandomUUID();
    const fileName = type === "video" ? "video.mp4" : file.originalname || subDirName;
    const relativeFilePath = this.getRelativePath(propertyId, subDirName, fileName);

    await this.storage.saveFile(relativeFilePath, file);

    const absoluteFilePath = this.storage.getAbsolutePath(relativeFilePath);
    const entry: FileIndexEntry = {
      filePath: absoluteFilePath,
    };

    const propertyDir = this.getRelativePath(propertyId);
    await this.storage.updateIndex(propertyDir, (current) => {
      const updated = { ...current };
      updated[type] = [...(updated[type] || []), entry];
      return updated;
    });

    return subDirName;
  }

  async deleteFile(propertyId: string, filePath: string, type: AllowedFileTypes): Promise<void> {
    await this.storage.deleteFile(filePath);

    const propertyDir = this.getRelativePath(propertyId);
    await this.storage.updateIndex(propertyDir, (current) => {
      const updated = { ...current };
      const filteredEntries = updated[type];
      updated[type] = (updated[type] || []).filter(
        (entry) => entry.filePath !== this.storage.getAbsolutePath(filePath),
      );
      return updated;
    });
  }

  async listFilesPathsByType(propertyId: string, type: AllowedFileTypes): Promise<Partial<FilesPathsRecord>> {
    const dirPath = this.getRelativePath(propertyId);

    const dirExists = await this.storage.dirExists(dirPath);
    if (!dirExists) return Object.fromEntries([[type]]);

    const paths = await this.storage.listAllFilePaths(dirPath);

    return Object.fromEntries([[type, paths]]) as Partial<FilesPathsRecord>;
  }

  async listFilesPaths(propertyId: string): Promise<FilesPathsRecord | undefined> {
    const initialRecord = createEmptyFilesRecord();
    const filesIndex = await this.storage.getIndex(propertyId);

    return { ...initialRecord, ...filesIndex };
  }

  async getFileById(propertyId: string, fileId: string) {
    const relativePath = this.getRelativePath(propertyId, fileId);
    return await this.storage.getFile(relativePath);
  }

  async getFilePath(propertyId: string, fileId: string) {
    const relativePath = this.getRelativePath(propertyId, fileId);
    return await this.storage.getFilePath(relativePath);
  }

  private getRelativePath(...segments: string[]) {
    return path.join(...segments);
  }

  private getRandomUUID(): string {
    return uuidv4();
  }
}
