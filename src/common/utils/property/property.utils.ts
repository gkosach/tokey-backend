import { Files } from "@prisma/client";
import {
  ALLOWED_MIME_TYPES,
  AllowedFileTypes,
  FileLike,
  IndexFileStructure,
  SUPPORTED_PROPERTY_FILE_TYPES,
} from "../../";

export const PropertyFilesUtils = {
  getStorageFileType: (type: AllowedFileTypes): Files["type"] => {
    switch (type) {
      case "image":
        return "IMAGE";
      case "video":
        return "VIDEO";
      case "application/pdf":
        return "DOCUMENT";
      default:
        return "OTHER";
    }
  },
  createEmptyIndexEntry: (): IndexFileStructure => {
    return SUPPORTED_PROPERTY_FILE_TYPES.reduce<IndexFileStructure>((acc, type) => {
      const entry = { [type]: [] };
      return { ...acc, ...entry };
    }, {} as IndexFileStructure);
  },
  async uploadPayloadIsValid(file: FileLike, type: AllowedFileTypes) {
    const fileTypeObj = await this.detectFileType(file?.buffer);
    return !!fileTypeObj && fileTypeObj.type === type && fileTypeObj;
  },
  async detectFileType(buffer: Buffer) {
    const { fileTypeFromBuffer } = await import("file-type");
    const type = await fileTypeFromBuffer(buffer);

    if (!type) return null;

    if (type.mime === "application/pdf") return { ext: type.ext, mime: type.mime, type: "application/pdf" };
    if (ALLOWED_MIME_TYPES.image.includes(type.mime as any)) return { ext: type.ext, mime: type.mime, type: "image" };
    if (ALLOWED_MIME_TYPES.video.includes(type.mime as any)) return { ext: type.ext, mime: type.mime, type: "video" };

    return null;
  },
};
