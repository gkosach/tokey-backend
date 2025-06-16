import { BaseError } from "./base.error";

export class UserError extends BaseError {
  constructor(message: string, statusCode: number = 500) {
    super(message, statusCode);
  }

  static notFound(): UserError {
    return new UserError("User not found", 404);
  }

  static databaseError(details?: string): UserError {
    const message = details ? `Database operation failed: ${details}` : "Database operation failed";
    return new UserError(message, 500);
  }

  static validationError(message: string): UserError {
    return new UserError(`Validation error: ${message}`, 400);
  }

  static conflict(message: string): UserError {
    return new UserError(message, 409);
  }

  static unauthorized(): UserError {
    return new UserError("Unauthorized", 401);
  }

  static forbidden(): UserError {
    return new UserError("Access forbidden", 403);
  }
}
