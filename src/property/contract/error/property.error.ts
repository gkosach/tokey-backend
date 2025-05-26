import { BaseError, ErrorStatus, PropertyErrorMessages } from "../../../common";

export class PropertyError extends BaseError<PropertyErrorMessages> {
  static invalidId(): PropertyError {
    return new this(ErrorStatus.BadRequest, PropertyErrorMessages.INVALID_ID);
  }

  static notFound(): PropertyError {
    return new this(ErrorStatus.NotFound, PropertyErrorMessages.NOT_FOUND);
  }

  static uploadFailed(): PropertyError {
    return new this(ErrorStatus.InternalError, PropertyErrorMessages.UPLOAD_FAILED);
  }

  static databaseError(): PropertyError {
    return new this(ErrorStatus.InternalError, PropertyErrorMessages.DATABASE_ERROR);
  }
}
