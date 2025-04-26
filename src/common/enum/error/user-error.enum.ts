/**
 * Коды и сообщения об ошибках, связанных с пользователями
 */
export enum UserErrorMessages {
  /** Некорректный идентификатор пользователя */
  INVALID_ID = "Invalid user ID",

  /** Пользователь не найден */
  NOT_FOUND = "User not found",

  /** Конфликт уникальных данных */
  DUPLICATE_DATA = "Email or phone already exists",

  /** Ошибка валидации данных */
  VALIDATION_FAILED = "User data validation failed",

  /** Ошибка базы данных */
  DATABASE_ERROR = "Database operation failed",
}
