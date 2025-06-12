import { BaseError } from "./base.error";

export class KycError extends BaseError {
  constructor(message: string, statusCode: number = 500) {
    super(message, statusCode);
  }

  static verificationNotFound(): KycError {
    return new KycError("Verification not found", 404);
  }

  static providerError(details?: string): KycError {
    const message = details ? `KYC provider error: ${details}` : "KYC provider error";
    return new KycError(message, 500);
  }

  static alreadyVerified(): KycError {
    return new KycError("User is already verified", 409);
  }

  static validationError(message: string): KycError {
    return new KycError(`Validation error: ${message}`, 400);
  }

  static unauthorized(): KycError {
    return new KycError("Unauthorized - authentication required", 401);
  }

  static verificationRequired(): KycError {
    return new KycError("KYC verification required to access this resource", 403);
  }
}
