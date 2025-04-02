import { IApplication, IInvestor, IManager, IPayment, IProperty } from "@/src/db/contract";

export interface ILease {
  /** Уникальный идентификатор */
  id: string; // Было number
  /** Дата начала аренды */
  startDate: Date;
  /** Дата окончания аренды */
  endDate: Date;
  /** Сумма арендной платы */
  rent: number;
  /** Залоговая сумма */
  deposit: number;
  /** Арендуемый объект */
  property: IProperty;
  /** Арендатор */
  investor: IInvestor;
  /** Ответственный менеджер */
  manager: IManager;
  /** Исходная заявка */
  application?: IApplication; // Сделано опциональным
  /** Платежи по договору */
  payments?: IPayment[]; // Сделано опциональным
}
