import { Files } from "@prisma/client";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";
import {
  AllowedFileTypes,
  FileIndexEntry,
  FileLike,
  FilesPathsRecord,
  IndexFileStructure,
  prisma,
  PROPERTY_FILE_LIMITS,
  PROPERTY_STORAGE_PATH,
  PropertyFilesUtils,
} from "../../common";
import { StorageService } from "../../storage/storage.service";

/**
 * Сервис для управления файлами недвижимости
 *
 */
export class PropertyFilesService {
  constructor(private readonly storage = new StorageService(PROPERTY_STORAGE_PATH)) {}

  async canUploadFile(propertyId: string, type: AllowedFileTypes): Promise<boolean> {
    const propertyDir = this.getRelativePath(propertyId);

    try {
      const index = await this.storage.getIndex(propertyDir);

      if (!index?.[type]) return true;

      return index[type].length < PROPERTY_FILE_LIMITS[type];
    } catch (e: any) {
      if (e.code === "ENOENT") return true;
      throw e;
    }
  }

  async saveFile(propertyId: string, file: FileLike, type: AllowedFileTypes) {
    const subDirName = uuidv4();
    const filename = type === "video" ? "video.mp4" : file.originalname || subDirName;
    const relativeFilePath = this.getRelativePath(propertyId, subDirName, filename);

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

  async saveFilesToDatabase(files: Files[]) {
    return prisma.files.createManyAndReturn({ data: files });
  }

  async deleteFile(propertyId: string, fileId: string, type: AllowedFileTypes): Promise<void> {
    const relativeDirPath = this.getRelativePath(propertyId, fileId);
    await this.storage.deleteDir(relativeDirPath);

    const propertyDir = this.getRelativePath(propertyId);
    await this.storage.updateIndex(propertyDir, (current) => {
      const updated = { ...current };
      updated[type] = (updated[type] || []).filter((entry) => entry.filePath.includes(relativeDirPath));
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

  async listFilesPaths(propertyId: string): Promise<IndexFileStructure> {
    const initialRecord = PropertyFilesUtils.createEmptyIndexEntry();
    const filesIndex = await this.storage.getIndex(propertyId);

    return { ...initialRecord, ...filesIndex };
  }

  async getFileById(propertyId: string, fileId: string) {
    const relativePath = this.getRelativePath(propertyId, fileId);
    return await this.storage.getFile(relativePath);
  }

  async processSingleFile(
    propertyId: string,
    file: Express.Multer.File,
    clientType: AllowedFileTypes,
  ): Promise<{ saved?: Files; error?: string }> {
    const payloadValidationData = await PropertyFilesUtils.uploadPayloadIsValid(file, clientType);
    if (!payloadValidationData) {
      return { error: `Invalid ${clientType}: ${file.originalname}` };
    }

    const canUpload = await this.canUploadFile(propertyId, clientType);
    if (!canUpload) {
      return { error: `${clientType} limit exceeded` };
    }

    const fileId = await this.saveFile(propertyId, file, clientType);

    const savedFile = await this.saveFilesToDatabase([
      {
        id: fileId,
        propertyId,
        filename: file.originalname,
        description: file.originalname,
        size: file.size,
        extension: payloadValidationData.ext,
        type: PropertyFilesUtils.getStorageFileType(clientType),
        createdAt: new Date(),
      },
    ]);

    return { saved: savedFile[0] };
  }

  async getFilePath(propertyId: string, fileId: string) {
    const relativePath = this.getRelativePath(propertyId, fileId);
    return await this.storage.getFilePath(relativePath);
  }

  private getRelativePath(...segments: string[]) {
    return path.join(...segments);
  }
}
