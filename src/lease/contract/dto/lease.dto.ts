export class LeaseDto {
  /** Уникальный ID аренды (UUID) */
  id!: string;

  /** Дата начала аренды (ISO строка) */
  startDate!: string;

  /** Дата окончания аренды (ISO строка) */
  endDate!: string;

  /** Сумма аренды в месяц */
  rent!: number;

  /** Депозит за аренду */
  deposit!: number;

  /** ID объекта недвижимости (UUID) */
  propertyId!: string;

  /** ID менеджера (UUID) */
  managerId!: string;

  /** ID инвестора (UUID) */
  investorId!: string;

  /** Список платежей, связанных с арендой */
  paymentIds!: string[];
}
