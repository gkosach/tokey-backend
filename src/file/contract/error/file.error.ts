import { BaseError } from "../../../common";

export class FileError extends BaseError {
  constructor(message: string, statusCode: number = 500) {
    super(message, statusCode);
  }

  static notFound(): FileError {
    return new FileError("File not found in S3", 404);
  }

  static uploadFailed(details?: string): FileError {
    const message = details ? `File upload failed: ${details}` : "File upload failed";
    return new FileError(message, 500);
  }

  static propertyNotFound(): FileError {
    return new FileError("Property not found", 404);
  }

  static invalidFileType(): FileError {
    return new FileError("Invalid file type", 400);
  }
}
