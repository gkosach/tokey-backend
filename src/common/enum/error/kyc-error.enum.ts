/**
 * Коды и сообщения об ошибках KYC
 */
export enum KycErrorMessages {
  USER_NOT_FOUND = "User not found",
  VERIFICATION_NOT_FOUND = "Verification not found",
  INVALID_STATUS = "Invalid KYC status transition",
  VERIFICATION_FAILED = "Verification process failed",
  PROVIDER_ERROR = "KYC provider error",
  IN_PROGRESS = "Verification already in progress",
}
