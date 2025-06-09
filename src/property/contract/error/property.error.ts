export class PropertyError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = "PropertyError";
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, PropertyError.prototype);
  }

  static invalidId(): PropertyError {
    return new PropertyError("Invalid property ID", 400);
  }

  static notFound(): PropertyError {
    return new PropertyError("Property not found", 404);
  }

  static uploadFailed(): PropertyError {
    return new PropertyError("File upload failed", 500);
  }

  static databaseError(details?: string): PropertyError {
    const message = details ? `Database operation failed: ${details}` : "Database operation failed";
    return new PropertyError(message, 500);
  }

  static insufficientTokens(): PropertyError {
    return new PropertyError("Insufficient tokens available", 400);
  }

  static invalidAddress(): PropertyError {
    return new PropertyError("Invalid address format", 400);
  }

  static validationError(message: string): PropertyError {
    return new PropertyError(`Validation error: ${message}`, 400);
  }

  static conflict(message: string): PropertyError {
    return new PropertyError(message, 409);
  }
}
