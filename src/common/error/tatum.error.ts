import { BaseError } from "./base.error";

export class TatumError extends BaseError {
  constructor(message: string, statusCode: number = 500) {
    super(message, statusCode);
  }

  static initializationFailed(details?: string): TatumError {
    const message = details ? `Tatum SDK initialization failed: ${details}` : "Tatum SDK initialization failed";
    return new TatumError(message, 500);
  }

  static walletCreationFailed(details?: string): TatumError {
    const message = details ? `Wallet creation failed: ${details}` : "Wallet creation failed";
    return new TatumError(message, 500);
  }

  static walletNotFound(signatureId?: string): TatumError {
    const message = signatureId ? `Wallet not found: ${signatureId}` : "Wallet not found";
    return new TatumError(message, 404);
  }

  static invalidResponse(): TatumError {
    return new TatumError("Invalid response from Tatum KMS", 500);
  }

  static apiUnavailable(): TatumError {
    return new TatumError("Tatum API is unavailable", 503);
  }
}
