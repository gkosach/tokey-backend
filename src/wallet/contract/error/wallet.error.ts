export class WalletError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = "WalletError";
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, WalletError.prototype);
  }

  static invalidAddress(): WalletError {
    return new WalletError("Invalid wallet address", 400);
  }

  static alreadyExists(): WalletError {
    return new WalletError("Wallet already exists", 409);
  }

  static notFound(): WalletError {
    return new WalletError("Wallet not found", 404);
  }

  static databaseError(details?: string): WalletError {
    const message = details ? `Database operation failed: ${details}` : "Database operation failed";
    return new WalletError(message, 500);
  }

  static notEnabled(): WalletError {
    return new WalletError("Wallet not enabled - KYC required", 403);
  }

  static hsmError(details?: string): WalletError {
    const message = details ? `HSM operation failed: ${details}` : "HSM operation failed";
    return new WalletError(message, 500);
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
