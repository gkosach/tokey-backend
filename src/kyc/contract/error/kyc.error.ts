import { ErrorStatus, BaseError, KycErrorMessages } from "../../../common";

/**
 * Кастомная ошибка для KYC-процесса
 */
export class KycError extends BaseError<KycErrorMessages> {
  /**
   * @param statusCode HTTP-статус код ошибки
   * @param message Сообщение об ошибке из enum KycErrorMessages
   */
  constructor(
    public readonly statusCode: ErrorStatus,
    public readonly message: KycErrorMessages,
  ) {
    super(statusCode, message);
  }

  /** Ошибка создания сессии */
  static sessionCreationFailed() {
    return new this(ErrorStatus.InternalError, KycErrorMessages.SESSION_CREATION_FAILED);
  }

  /** Необходима верификация */
  static verificationRequired() {
    return new this(ErrorStatus.Forbidden, KycErrorMessages.VERIFICATION_REQUIRED);
  }

  /** Ошибка обработки вебхука */
  static webhookProcessingFailed() {
    return new this(ErrorStatus.InternalError, KycErrorMessages.WEBHOOK_PROCESSING_FAILED);
  }

  /** Сессия не найдена */
  static sessionNotFound() {
    return new this(ErrorStatus.NotFound, KycErrorMessages.SESSION_NOT_FOUND);
  }

  /** Неверная подпись вебхука */
  static invalidWebhookSignature() {
    return new this(ErrorStatus.Forbidden, KycErrorMessages.INVALID_WEBHOOK_SIGNATURE);
  }

  /** Уже верифицирован */
  static alreadyVerified() {
    return new this(ErrorStatus.BadRequest, KycErrorMessages.ALREADY_VERIFIED);
  }

  /** Истек срок действия сессии */
  static sessionExpired() {
    return new this(ErrorStatus.BadRequest, KycErrorMessages.SESSION_EXPIRED);
  }

  /** Страна не поддерживается */
  static unsupportedCountry() {
    return new this(ErrorStatus.BadRequest, KycErrorMessages.UNSUPPORTED_COUNTRY);
  }

  /** Ошибка проверки документов */
  static documentVerificationFailed() {
    return new this(ErrorStatus.BadRequest, KycErrorMessages.DOCUMENT_VERIFICATION_FAILED);
  }

  /** Общая ошибка */
  static generic() {
    return new this(ErrorStatus.InternalError, KycErrorMessages.GENERIC_ERROR);
  }
}
