import { BaseError, ErrorStatus, KycErrorMessages } from "../../../common";

export class KycError extends BaseError<KycErrorMessages> {
  static userNotFound(): KycError {
    return new KycError(ErrorStatus.NotFound, KycErrorMessages.USER_NOT_FOUND);
  }

  static invalidStatusTransition(): KycError {
    return new KycError(ErrorStatus.BadRequest, KycErrorMessages.INVALID_STATUS);
  }

  static verificationInProgress(): KycError {
    return new KycError(ErrorStatus.Conflict, KycErrorMessages.IN_PROGRESS);
  }

  static providerError(): KycError {
    return new KycError(ErrorStatus.InternalError, KycErrorMessages.PROVIDER_ERROR);
  }

  static verificationNotFound(): KycError {
    return new KycError(ErrorStatus.NotFound, KycErrorMessages.VERIFICATION_NOT_FOUND);
  }
}
