import { BaseError, ErrorStatus, WalletErrorMessages } from "../../../common";

export class WalletError extends BaseError<WalletErrorMessages> {
  static invalidAddress(): WalletError {
    return new this(ErrorStatus.BadRequest, WalletErrorMessages.INVALID_ADDRESS);
  }

  static alreadyExists(): WalletError {
    return new this(ErrorStatus.Conflict, WalletErrorMessages.ALREADY_EXISTS);
  }

  static notFound(): WalletError {
    return new this(ErrorStatus.NotFound, WalletErrorMessages.NOT_FOUND);
  }

  static databaseError(): WalletError {
    return new this(ErrorStatus.InternalError, WalletErrorMessages.DATABASE_ERROR);
  }
}
