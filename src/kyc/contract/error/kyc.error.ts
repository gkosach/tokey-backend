import { ErrorStatus } from "../../../common/enum/error/error-status.enum";
import { BaseError } from "../../../common/utils/base-error";
import { KycErrorMessages } from "../../../common/enum/error/kyc-error.enum";

/**
 * Кастомная ошибка для KYC-процесса.
 * originalError сохраняет оригинальное сообщение ошибки для логирования.
 */
export class KycError extends BaseError {
  public originalError?: string;

  constructor(code: ErrorStatus, message: KycErrorMessages, originalError?: string) {
    super(code, message);
    this.originalError = originalError;
    if (originalError) {
      console.error(`[KYC ERROR] ${message}: ${originalError}`);
    }
  }
}
