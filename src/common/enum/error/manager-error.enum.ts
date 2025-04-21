export enum ManagerErrorMessages {
  /** Ошибка при работе с базой данных */
  DATABASE_ERROR = "Database operation failed",

  /** Менеджер не найден */
  NOT_FOUND = "Manager not found",

  /** Некорректные входные данные */
  INVALID_DATA = "Invalid input data",

  /** Некорректный идентификатор менеджера */
  INVALID_ID = "Invalid manager ID",

  /** Неизвестная ошибка */
  UNKNOWN_ERROR = "Unknown error occurred",
}
