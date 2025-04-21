/**
 * Коды и сообщения об ошибках, связанных с операциями с инвесторами
 */
export enum InvestorErrorMessages {
  /** Ошибка при работе с базой данных */
  INVESTOR_ERROR_DATABASE_FAILED = "Database operation failed",

  /** Инвестор не найден в системе */
  INVESTOR_NOT_FOUND = "Investor not found",

  /** Некорректный формат ID объекта недвижимости */
  INVALID_PROPERTY_ID = "Invalid property ID format",

  /** Некорректные данные в запросе */
  INVESTOR_INVALID_DATA = "Invalid input data",
}
