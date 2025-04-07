export class ApplicationDto {
  /** Уникальный ID заявки (UUID) */
  id!: string;

  /** Дата подачи в формате ISO (например: "2025-04-07T14:48:00.000Z") */
  applicationDate!: string;

  /** Статус заявки. Допустимые значения: PENDING, APPROVED, REJECTED */
  status!: "PENDING" | "APPROVED" | "REJECTED";

  /** Опциональное сообщение от пользователя (макс. 500 символов) */
  message?: string;

  /** ID связанного объекта недвижимости (UUID) */
  propertyId!: string;

  /** ID пользователя-заявителя (UUID) */
  applicantId!: string;
}
