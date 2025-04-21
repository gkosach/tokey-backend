/**
 * Коды и сообщения об ошибках, связанных с операциями с недвижимостью
 */
export enum PropertyErrorMessages {
  /** Некорректный идентификатор объекта */
  INVALID_ID = "Invalid property ID",

  /**  Недвижимость не найдена */
  NOT_FOUND = "Property not found",

  /** Ошибка загрузки файлов */
  UPLOAD_FAILED = "File upload failed",

  /** Некорректный адрес объекта */
  INVALID_ADDRESS = "Invalid address format",

  /** Недопустимый тип недвижимости */
  INVALID_TYPE = "Invalid property type",

  /** Ошибка модерации объекта */
  MODERATION_FAILED = "Moderation operation failed",
}
