/**
 * Общие системные ошибки
 */
export enum SystemErrorMessages {
  /** Доступ запрещен */
  ACCESS_DENIED = "Access denied",

  /** Неверный формат запроса */
  INVALID_REQUEST = "Invalid request format",

  /** Ошибка интеграции с блокчейном */
  BLOCKCHAIN_ERROR = "Blockchain service error",

  /** Внутренняя ошибка сервера */
  INTERNAL_ERROR = "Internal server error",
}
