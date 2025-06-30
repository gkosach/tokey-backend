export interface FileLike {
  buffer: Buffer;
  mimetype?: string;
  originalname?: string;
  size: number;
}

export interface FileData {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
  size: number;
}

export interface FileMeta {
  mimetype: string;
  originalname: string;
  size: number;
}

export type AllowedFileTypes = "image" | "application/pdf" | "video";
