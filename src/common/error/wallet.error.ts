import { BaseError } from "./base.error";

export class WalletError extends BaseError {
  constructor(message: string, statusCode: number = 500) {
    super(message, statusCode);
  }

  static notFound(): WalletError {
    return new WalletError("Wallet not found", 404);
  }

  static notEnabled(): WalletError {
    return new WalletError("Wallet not enabled - KYC required", 403);
  }

  static validationError(message: string): WalletError {
    return new WalletError(`Validation error: ${message}`, 400);
  }

  static insufficientBalance(): WalletError {
    return new WalletError("Insufficient balance", 400);
  }

  static transactionFailed(details?: string): WalletError {
    const message = details ? `Transaction failed: ${details}` : "Transaction failed";
    return new WalletError(message, 500);
  }
}
