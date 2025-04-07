export class PaymentDto {
  /** Уникальный ID платежа (UUID) */
  id!: string;

  /** Сумма, которая должна быть оплачена */
  amountDue!: number;

  /** Сумма, которая была оплачена */
  amountPaid!: number;

  /** Дата, до которой должен быть произведен платеж (ISO строка) */
  dueDate!: string;

  /** Дата фактической оплаты (ISO строка или null) */
  paymentDate?: string | null;

  /** Статус платежа (например, PAID, PENDING, OVERDUE) */
  paymentStatus!: string;
}
