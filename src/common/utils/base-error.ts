import { ErrorStatus } from "../enum/error/error-status.enum";

export class BaseError extends Error {
  constructor(
    public statusCode: ErrorStatus,
    public message: string,
  ) {
    super(message);
    // Критически важная строка
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
