import { BaseError } from "./base.error";

export class TokenError extends BaseError {
  constructor(message: string, statusCode: number = 500) {
    super(message, statusCode);
  }

  static notFound(): TokenError {
    return new TokenError("Token not found", 404);
  }

  static userNotFound(): TokenError {
    return new TokenError("User not found", 404);
  }

  static insufficientTokens(): TokenError {
    return new TokenError("Insufficient tokens available", 400);
  }

  static kycRequired(): TokenError {
    return new TokenError("KYC verification required", 403);
  }

  static purchaseFailed(details?: string): TokenError {
    const message = details ? `Purchase failed: ${details}` : "Purchase failed";
    return new TokenError(message, 500);
  }
}
