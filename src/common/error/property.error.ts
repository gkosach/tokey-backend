import { BaseError } from "./base.error";

export class PropertyError extends BaseError {
  constructor(message: string, statusCode: number = 500) {
    super(message, statusCode);
  }

  static notFound(): PropertyError {
    return new PropertyError("Property not found", 404);
  }

  static uploadFailed(): PropertyError {
    return new PropertyError("File upload failed", 500);
  }

  static conflict(message: string): PropertyError {
    return new PropertyError(message, 409);
  }

  static databaseError(details?: string): PropertyError {
    const message = details ? `Database operation failed: ${details}` : "Database operation failed";
    return new PropertyError(message, 500);
  }
}
