import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { FileData, FileLike, FileMeta } from "src/common";

export class FileStorageService {
  constructor(private storageRoot: string = "./uploads") {
    this.init(storageRoot);
  }

  init(storageRoot: string) {
    fs.mkdirSync(storageRoot, { recursive: true });
  }

  private resolvePath(relativePath: string): string {
    return path.join(this.storageRoot, relativePath);
  }

  private getMetaPath(filePath: string): string {
    return `${filePath}.meta.json`;
  }

  async saveFile(relativePath: string, file: FileLike): Promise<void> {
    const filePath = this.resolvePath(relativePath);
    const dir = path.dirname(filePath);
    await fsp.mkdir(dir, { recursive: true });

    await fsp.writeFile(filePath, file.buffer);

    const meta: FileMeta = {
      mimetype: file.mimetype || "application/octet-stream",
      originalname: file.originalname || path.basename(filePath),
    };

    await fsp.writeFile(this.getMetaPath(filePath), JSON.stringify(meta, null, 2));
  }

  async getFile(relativePath: string): Promise<FileData> {
    const filePath = this.resolvePath(relativePath);
    const metaPath = this.getMetaPath(filePath);

    const [buffer, metaRaw] = await Promise.all([fsp.readFile(filePath), fsp.readFile(metaPath, "utf-8")]);

    const meta = JSON.parse(metaRaw) as FileMeta;

    return {
      buffer,
      mimetype: meta.mimetype,
      originalname: meta.originalname,
    };
  }

  async deleteFile(relativePath: string): Promise<void> {
    const filePath = this.resolvePath(relativePath);
    const metaPath = this.getMetaPath(filePath);

    await Promise.allSettled([fsp.unlink(filePath), fsp.unlink(metaPath)]);
  }

  async listFiles(relativeDir: string): Promise<string[]> {
    const dirPath = this.resolvePath(relativeDir);
    try {
      const files = await fsp.readdir(dirPath);
      return files.filter((f) => !f.endsWith(".meta.json")).map((f) => path.join(relativeDir, f));
    } catch (err: any) {
      if (err.code === "ENOENT") return [];
      throw err;
    }
  }

  async listAllFilePaths(relativeDir: string): Promise<string[]> {
    const result: string[] = [];
    const walk = async (dir: string) => {
      const fullDir = this.resolvePath(dir);
      const entries = await fsp.readdir(fullDir, { withFileTypes: true });
      for (const entry of entries) {
        const rel = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          await walk(rel);
        } else if (!entry.name.endsWith(".meta.json")) {
          result.push(rel);
        }
      }
    };
    await walk(relativeDir);
    return result;
  }

  async dirExists(relativeDir: string): Promise<boolean> {
    const dirPath = this.resolvePath(relativeDir);
    try {
      const stats = await fsp.stat(dirPath);
      return stats.isDirectory();
    } catch (err: any) {
      if (err.code === "ENOENT") return false;
      throw err;
    }
  }

  async fileExists(relativePath: string): Promise<boolean> {
    try {
      await fsp.access(this.resolvePath(relativePath));
      return true;
    } catch {
      return false;
    }
  }
}
