import { ErrorStatus, PropertyErrorMessages, BaseError } from "../../../common";

export class PropertyError extends BaseError<PropertyErrorMessages> {
  constructor(code: ErrorStatus, message: PropertyErrorMessages) {
    super(code, message);
  }

  static invalidId(): PropertyError {
    return new this(ErrorStatus.BadRequest, PropertyErrorMessages.INVALID_ID);
  }

  static notFound(): PropertyError {
    return new this(ErrorStatus.NotFound, PropertyErrorMessages.NOT_FOUND);
  }

  static invalidAddress(): PropertyError {
    return new this(ErrorStatus.BadRequest, PropertyErrorMessages.INVALID_ADDRESS);
  }

  static uploadFailed(): PropertyError {
    return new this(ErrorStatus.InternalError, PropertyErrorMessages.UPLOAD_FAILED);
  }

  static invalidType(): PropertyError {
    return new this(ErrorStatus.BadRequest, PropertyErrorMessages.INVALID_TYPE);
  }
}
