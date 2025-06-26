export interface FileLike {
  buffer: Buffer;
  mimetype?: string;
  originalname?: string;
}

export interface FileData {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
}

export interface FileMeta {
  mimetype: string;
  originalname: string;
}

export type AllowedFileTypes = "image" | "application/pdf" | "video";
