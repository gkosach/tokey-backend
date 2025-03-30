import { ILease } from "@/src/db/contract";

/**
 * Интерфейс платежа
 */
export interface IPayment {
  /** Уникальный идентификатор */
  id: number;
  /** Сумма к оплате */
  amountDue: number;
  /** Оплаченная сумма */
  amountPaid: number;
  /** Срок оплаты */
  dueDate: Date;
  /** Дата фактической оплаты */
  paymentDate?: Date;
  /** Статус платежа */
  paymentStatus: string;
  /** Связанный договор */
  lease: ILease;
}
