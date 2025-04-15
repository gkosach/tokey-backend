/**
 * Коды и сообщения об ошибках, связанных с операциями с недвижимостью
 */
export enum PropertyErrorMessages {
  /**
   * Ошибка при обращении к базе данных
   * @example Не удалось создать запись из-за нарушения уникальности
   */
  PROPERTY_ERROR_DATABASE_FAILED = "PROPERTY_ERROR_DATABASE_FAILED",
  /**
   * Некорректные данные в ответе внешнего сервиса
   * @example Отсутствуют координаты в ответе геокодера
   */
  PROPERTY_ERROR_INVALID_RESPONSE = "PROPERTY_ERROR_INVALID_RESPONSE",
  /**
   * Некорректный идентификатор объекта
   */
  PROPERTY_ERROR_INVALID_ID = "PROPERTY_ERROR_INVALID_ID",
  /**
   * Ошибка преобразования адреса в координаты
   * @example Неверный формат почтового индекса
   */
  PROPERTY_ERROR_GEOCODING_FAILED = "PROPERTY_ERROR_GEOCODING_FAILED",

  /**
   * Некорректные входные данные
   * @example Отсутствует обязательное поле 'address'
   */
  PROPERTY_ERROR_INVALID_INPUT = "PROPERTY_ERROR_INVALID_INPUT",

  /**
   * Ошибка загрузки файлов
   * @example Превышен максимальный размер файла
   */
  PROPERTY_ERROR_FILE_UPLOAD_FAILED = "PROPERTY_ERROR_FILE_UPLOAD_FAILED",

  /**
   * Ошибка валидации данных
   * @example Значение цены отрицательное
   */
  PROPERTY_ERROR_VALIDATION_FAILED = "PROPERTY_ERROR_VALIDATION_FAILED",
}
