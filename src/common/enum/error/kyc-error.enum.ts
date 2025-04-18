export enum KycErrorMessages {
  /**
   * Необходима KYC верификация
   */
  KYC_VERIFICATION_REQUIRED = "KYC_VERIFICATION_REQUIRED",

  /**
   * Ошибка создания сессии верификации
   */
  KYC_SESSION_CREATION_FAILED = "KYC_SESSION_CREATION_FAILED",

  /**
   * Не удалось обработать вебхук от провайдера
   */
  KYC_WEBHOOK_PROCESSING_FAILED = "KYC_WEBHOOK_PROCESSING_FAILED",

  /**
   * Сессия верификации не найдена
   */
  KYC_SESSION_NOT_FOUND = "KYC_SESSION_NOT_FOUND",

  /**
   * Неверная подпись вебхука
   */
  KYC_INVALID_WEBHOOK_SIGNATURE = "KYC_INVALID_WEBHOOK_SIGNATURE",

  /**
   * Пользователь уже верифицирован
   */
  KYC_ALREADY_VERIFIED = "KYC_ALREADY_VERIFIED",

  /**
   * Истек срок действия сессии верификации
   */
  KYC_SESSION_EXPIRED = "KYC_SESSION_EXPIRED",

  /**
   * Неподдерживаемая страна для верификации
   */
  KYC_UNSUPPORTED_COUNTRY = "KYC_UNSUPPORTED_COUNTRY",

  /**
   * Ошибка проверки документов
   */
  KYC_DOCUMENT_VERIFICATION_FAILED = "KYC_DOCUMENT_VERIFICATION_FAILED",

  /**
   * Непредвиденная ошибка KYC
   */
  KYC_GENERIC_ERROR = "KYC_GENERIC_ERROR",
}
