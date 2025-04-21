import { ErrorStatus, InvestorErrorMessages, BaseError } from "../../../common";

/**
 * Кастомные ошибки для операций с инвесторами
 */
export class InvestorError extends BaseError<InvestorErrorMessages> {
  /**
   * @param statusCode HTTP-статус код ошибки
   * @param message Сообщение об ошибке из enum InvestorErrorMessages
   */
  constructor(
    public readonly statusCode: ErrorStatus,
    public readonly message: InvestorErrorMessages,
  ) {
    super(statusCode, message);
  }

  /** Инвестор не найден */
  static notFound() {
    return new this(ErrorStatus.NotFound, InvestorErrorMessages.INVESTOR_NOT_FOUND);
  }

  /** Некорректный ID объекта недвижимости */
  static invalidPropertyId() {
    return new this(ErrorStatus.BadRequest, InvestorErrorMessages.INVALID_PROPERTY_ID);
  }

  /** Ошибка базы данных */
  static databaseError() {
    return new this(ErrorStatus.InternalError, InvestorErrorMessages.INVESTOR_ERROR_DATABASE_FAILED);
  }

  /** Некорректные входные данные */
  static invalidData() {
    return new this(ErrorStatus.BadRequest, InvestorErrorMessages.INVESTOR_INVALID_DATA);
  }
}
