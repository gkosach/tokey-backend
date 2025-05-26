import { UserErrorMessages } from "../../../common";

export class UserError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly errorCode?: string,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }

  static notFound(): UserError {
    return new UserError(404, "User not found", UserErrorMessages.NOT_FOUND);
  }

  static databaseError(message: string): UserError {
    return new UserError(500, message, UserErrorMessages.DATABASE_ERROR);
  }

  static validationError(message: string): UserError {
    return new UserError(400, message, UserErrorMessages.VALIDATION_FAILED);
  }

  static conflict(message: string): UserError {
    return new UserError(409, message, UserErrorMessages.INVALID_ID);
  }
}
