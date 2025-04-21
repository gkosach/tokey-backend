/**
 * Коды и сообщения об ошибках KYC процесса
 */
export enum KycErrorMessages {
  /** Необходима KYC верификация */
  VERIFICATION_REQUIRED = "KYC verification required",

  /** Ошибка создания сессии верификации */
  SESSION_CREATION_FAILED = "KYC session creation failed",

  /** Не удалось обработать вебхук от провайдера */
  WEBHOOK_PROCESSING_FAILED = "Failed to process KYC webhook",

  /** Сессия верификации не найдена */
  SESSION_NOT_FOUND = "KYC session not found",

  /** Неверная подпись вебхука */
  INVALID_WEBHOOK_SIGNATURE = "Invalid KYC webhook signature",

  /** Пользователь уже верифицирован */
  ALREADY_VERIFIED = "User already verified",

  /** Истек срок действия сессии верификации */
  SESSION_EXPIRED = "KYC session expired",

  /** Неподдерживаемая страна для верификации */
  UNSUPPORTED_COUNTRY = "Country not supported for KYC",

  /** Ошибка проверки документов */
  DOCUMENT_VERIFICATION_FAILED = "KYC document verification failed",

  /** Непредвиденная ошибка KYC */
  GENERIC_ERROR = "Unexpected KYC error",
}
