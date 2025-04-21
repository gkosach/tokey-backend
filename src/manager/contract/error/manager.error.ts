import { BaseError, ErrorStatus, ManagerErrorMessages } from "../../../common";

export class ManagerError extends BaseError<ManagerErrorMessages> {
  constructor(
    public readonly statusCode: ErrorStatus,
    public readonly message: ManagerErrorMessages,
  ) {
    super(statusCode, message);
  }

  static databaseError() {
    return new this(ErrorStatus.InternalError, ManagerErrorMessages.DATABASE_ERROR);
  }

  static notFound() {
    return new this(ErrorStatus.NotFound, ManagerErrorMessages.NOT_FOUND);
  }

  static invalidData() {
    return new this(ErrorStatus.BadRequest, ManagerErrorMessages.INVALID_DATA);
  }

  static invalidId() {
    return new this(ErrorStatus.BadRequest, ManagerErrorMessages.INVALID_ID);
  }

  static unknownError() {
    return new this(ErrorStatus.InternalError, ManagerErrorMessages.UNKNOWN_ERROR);
  }
}
