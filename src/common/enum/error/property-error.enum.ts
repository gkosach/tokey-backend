/**
 * Сообщения об ошибках, связанных с операциями с недвижимостью
 */
export enum PropertyErrorMessages {
  /**
   * Ошибка геокодирования: не удалось преобразовать адрес в координаты
   * (некорректный адрес или проблемы с сервисом геокодирования)
   */
  PROPERTY_ERROR_GEOCODING_FAILED = "PROPERTY_ERROR_GEOCODING_FAILED",

  /**
   * Некорректный ответ от внешнего сервиса
   * (отсутствуют необходимые данные в ответе API)
   */
  PROPERTY_ERROR_INVALID_RESPONSE = "PROPERTY_ERROR_INVALID_RESPONSE",

  /**
   * Ошибка взаимодействия с базой данных
   * (проблемы с подключением, нарушение ограничений БД)
   */
  PROPERTY_ERROR_DATABASE_FAILED = "PROPERTY_ERROR_DATABASE_FAILED",

  /**
   * Некорректные входные данные
   * (отсутствуют обязательные поля, неверный формат данных)
   */
  PROPERTY_ERROR_INVALID_INPUT = "PROPERTY_ERROR_INVALID_INPUT",

  /**
   * Ошибка загрузки файлов в хранилище
   * (проблемы с подключением к S3, неверные права доступа)
   */
  PROPERTY_ERROR_FILE_UPLOAD_FAILED = "PROPERTY_ERROR_FILE_UPLOAD_FAILED",

  /**
   * Ошибка валидации данных
   * (некорректные числовые значения, нарушение бизнес-правил)
   */
  PROPERTY_ERROR_VALIDATION_FAILED = "PROPERTY_ERROR_VALIDATION_FAILED",
}
