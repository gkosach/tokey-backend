import { FilesPathsRecord, SUPPORTED_PROPERTY_FILE_TYPES } from "../../";

export const createEmptyFilesRecord = (): FilesPathsRecord => {
  const pathsRecordEntries = SUPPORTED_PROPERTY_FILE_TYPES.map((type) => [type, []]);
  return Object.fromEntries(pathsRecordEntries) as FilesPathsRecord;
};
