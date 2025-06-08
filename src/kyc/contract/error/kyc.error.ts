export class KycError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = "KycError";
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, KycError.prototype);
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

  static verificationInProgress(): KycError {
    return new KycError("Verification is already in progress", 409);
  }

  static databaseError(details?: string): KycError {
    const message = details ? `Database operation failed: ${details}` : "Database operation failed";
    return new KycError(message, 500);
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
