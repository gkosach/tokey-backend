import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { createEmptyFilesRecord, FileData, FileLike, FileMeta, FilesPathsRecord } from "../common";

export class FileStorageService {
  constructor(private storageRoot: string = "./uploads") {
    this.init(storageRoot);
  }

  init(storageRoot: string) {
    fs.mkdirSync(storageRoot, { recursive: true });
  }

  private getMetaPath(filePath: string): string {
    return `${filePath}.meta.json`;
  }

  async saveFile(filePath: string, file: FileLike): Promise<void> {
    const dir = path.dirname(filePath);
    await fsp.mkdir(dir, { recursive: true });

    await fsp.writeFile(filePath, file.buffer);

    const meta: FileMeta = {
      mimetype: this.detectMimeTypeFromExtension(filePath) ?? "application/octet-stream",
      originalname: file.originalname || path.basename(filePath),
      size: file.size,
    };

    await fsp.writeFile(this.getMetaPath(filePath), JSON.stringify(meta, null, 2));
  }

  async deleteFile(filePath: string): Promise<void> {
    const metaPath = this.getMetaPath(filePath);

    await Promise.allSettled([fsp.unlink(filePath), fsp.unlink(metaPath)]);
  }

  async getFile(dirPath: string): Promise<FileData> {
    const [fileName] = await fsp.readdir(dirPath);
    const filePath = path.join(dirPath, fileName);
    const metaPath = this.getMetaPath(filePath);

    const [buffer, metaRaw] = await Promise.all([fsp.readFile(filePath), fsp.readFile(metaPath, "utf-8")]);

    const meta = JSON.parse(metaRaw) as FileMeta;

    return {
      buffer,
      mimetype: meta.mimetype,
      originalname: meta.originalname,
      size: meta.size,
    };
  }

  async getFilePath(dirPath: string) {
    const [fileName] = await fsp.readdir(dirPath);
    return path.join(dirPath, fileName);
  }

  async listFiles(dirPath: string): Promise<string[]> {
    try {
      const files = await fsp.readdir(dirPath);
      return files.filter((f) => !f.endsWith(".meta.json")).map((f) => path.join(dirPath, f));
    } catch (err: any) {
      if (err.code === "ENOENT") return [];
      throw err;
    }
  }

  async listAllFilePaths(dirPath: string): Promise<{ filePath: string; metaPath: string }[]> {
    const result: { filePath: string; metaPath: string }[] = [];

    const walk = async (dir: string) => {
      const entries = await fsp.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          await walk(fullPath);
        } else if (!entry.name.endsWith(".meta.json")) {
          result.push({
            filePath: fullPath,
            metaPath: `${fullPath}.meta.json`,
          });
        }
      }
    };

    await walk(dirPath);
    return result;
  }

  async dirExists(dirPath: string): Promise<boolean> {
    try {
      const stats = await fsp.stat(dirPath);
      return stats.isDirectory();
    } catch (err: any) {
      if (err.code === "ENOENT") return false;
      throw err;
    }
  }

  async fileExists(filePath: string): Promise<boolean> {
    try {
      await fsp.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  async updateIndex(propertyDir: string, updateFn: (current: FilesPathsRecord) => FilesPathsRecord): Promise<void> {
    const indexPath = path.join(propertyDir, "index.json");
    let current = createEmptyFilesRecord();

    try {
      const raw = await fsp.readFile(indexPath, "utf-8");
      current = JSON.parse(raw);
    } catch (e: any) {
      if (e.code !== "ENOENT") throw e;
    }

    const updated = updateFn(current);
    await fsp.writeFile(indexPath, JSON.stringify(updated, null, 2));
  }

  detectMimeTypeFromExtension(filePath: string): string | null {
    const ext = path.extname(filePath).toLowerCase();

    switch (ext) {
      // Изображения
      case ".jpg":
      case ".jpeg":
        return "image/jpeg";
      case ".png":
        return "image/png";
      case ".gif":
        return "image/gif";
      case ".bmp":
        return "image/bmp";
      case ".webp":
        return "image/webp";
      case ".svg":
        return "image/svg+xml";

      // PDF
      case ".pdf":
        return "application/pdf";

      // Видео
      case ".mp4":
        return "video/mp4";

      default:
        return null;
    }
  }
}
