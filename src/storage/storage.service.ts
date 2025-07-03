import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import {
  createEmptyIndexEntry,
  FileData,
  FileIndexEntry,
  FileLike,
  FileMeta,
  FilesPathsRecord,
  IndexFileStructure,
} from "../common";

export class StorageService {
  constructor(private storageRoot: string = "./uploads") {
    this.init(storageRoot);
  }

  init(storageRoot: string) {
    fs.mkdirSync(storageRoot, { recursive: true });
  }

  private getMetaPath(filePath: string): string {
    return `${filePath}.meta.json`;
  }

  async saveFile(relativeFilePath: string, file: FileLike): Promise<void> {
    const filePath = this.getAbsolutePath(relativeFilePath);
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

  async deleteFile(relativeFilePath: string): Promise<void> {
    const filePath = this.getAbsolutePath(relativeFilePath);
    const metaPath = this.getMetaPath(filePath);

    await Promise.allSettled([fsp.unlink(filePath), fsp.unlink(metaPath)]);
  }

  async getFile(relativeDirPath: string): Promise<FileData> {
    const absDirPath = this.getAbsolutePath(relativeDirPath);
    const files = await fsp.readdir(absDirPath);
    const filename = files.find((f) => !f.endsWith(".meta.json"));

    if (!filename) throw new Error(`No file found in ${relativeDirPath}`);

    const filePath = path.join(absDirPath, filename);
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

  async getFilePath(relativeDirPath: string): Promise<string> {
    const absDirPath = this.getAbsolutePath(relativeDirPath);
    const files = await fsp.readdir(absDirPath);
    const filename = files.find((f) => !f.endsWith(".meta.json"));

    if (!filename) throw new Error(`No file found in ${relativeDirPath}`);

    return path.join(absDirPath, filename);
  }

  async listFiles(relativeDirPath: string): Promise<string[]> {
    const absDirPath = this.getAbsolutePath(relativeDirPath);

    try {
      const files = await fsp.readdir(absDirPath);
      return files.filter((f) => !f.endsWith(".meta.json")).map((f) => path.join(relativeDirPath, f)); // относительные пути
    } catch (err: any) {
      if (err.code === "ENOENT") return [];
      throw err;
    }
  }

  async listAllFilePaths(relativeDirPath: string): Promise<FileIndexEntry[]> {
    const result: FileIndexEntry[] = [];
    const absStartDir = this.getAbsolutePath(relativeDirPath);

    const walk = async (absDir: string) => {
      const entries = await fsp.readdir(absDir, { withFileTypes: true });

      for (const entry of entries) {
        const absFullPath = path.join(absDir, entry.name);

        if (entry.isDirectory()) {
          await walk(absFullPath);
        } else if (!entry.name.endsWith(".meta.json")) {
          const metaPath = `${absFullPath}.meta.json`;

          let meta: FileMeta | null = null;
          try {
            const raw = await fsp.readFile(metaPath, "utf-8");
            meta = JSON.parse(raw) as FileMeta;
          } catch (e) {
            meta = { originalname: path.basename(absFullPath), size: 0, mimetype: "unknown" };
          }

          result.push({
            filePath: absFullPath,
          });
        }
      }
    };

    await walk(absStartDir);
    return result;
  }

  async dirExists(relativeDirPath: string): Promise<boolean> {
    const absPath = this.getAbsolutePath(relativeDirPath);
    try {
      const stats = await fsp.stat(absPath);
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

  async updateIndex(propertyDir: string, updateFn: (current: IndexFileStructure) => IndexFileStructure): Promise<void> {
    const indexPath = this.getAbsolutePath(path.join(propertyDir, "index.json"));
    let current = createEmptyIndexEntry();

    try {
      const raw = await fsp.readFile(indexPath, "utf-8");
      current = JSON.parse(raw);
    } catch (e: any) {
      if (e.code !== "ENOENT") throw e;
    }

    const updated = updateFn(current);
    await fsp.writeFile(indexPath, JSON.stringify(updated, null, 2));
  }

  async getIndex(propertyDir: string) {
    const indexPath = this.getAbsolutePath(path.join(propertyDir, "index.json"));

    try {
      const indexFile = await fsp.readFile(indexPath, "utf-8");
      const parsedIndex = JSON.parse(indexFile) as FilesPathsRecord;
      return parsedIndex;
    } catch (e: any) {
      if (e.code !== "ENOENT") throw e;
    }
  }

  getAbsolutePath(relativePath: string) {
    return path.join(this.storageRoot, relativePath);
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
