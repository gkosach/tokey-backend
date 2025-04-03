import { ILease } from "@/src/db/contract";
import { PaymentStatus } from "@/src/db/contract/enum/payment-status.enum";

/**
 * Интерфейс платежа
 */
export interface IPayment {
  /** Уникальный идентификатор */
  id: string; // Было number
  /** Сумма к оплате */
  amountDue: number;
  /** Оплаченная сумма */
  amountPaid: number;
  /** Срок оплаты */
  dueDate: Date;
  /** Дата фактической оплаты */
  paymentDate?: Date; // Сделано опциональным
  /** Статус платежа */
  paymentStatus: PaymentStatus; // Было string
}
