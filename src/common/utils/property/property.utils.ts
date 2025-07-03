import { Files } from "@prisma/client";
import { AllowedFileTypes, FilesPathsRecord, IndexFileStructure, SUPPORTED_PROPERTY_FILE_TYPES } from "../../";

export const createEmptyFilesRecord = (): FilesPathsRecord => {
  const pathsRecordEntries = SUPPORTED_PROPERTY_FILE_TYPES.map((type) => [type, []]);
  return Object.fromEntries(pathsRecordEntries) as FilesPathsRecord;
};
export const createEmptyIndexEntry = (): IndexFileStructure => {
  const res = SUPPORTED_PROPERTY_FILE_TYPES.reduce<IndexFileStructure>((acc, type) => {
    const entry = { [type]: [] };
    return { ...acc, ...entry };
  }, {} as IndexFileStructure);
  return res;
};

export const getStorageFileType = (type: AllowedFileTypes): Files["type"] => {
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
};
