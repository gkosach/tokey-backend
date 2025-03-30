import { IApplication, IInvestor, IManager, IPayment, IProperty } from "@/src/db/contract";

/**
 * Интерфейс договора аренды
 */
export interface ILease {
  /** Уникальный идентификатор */
  id: number;
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
  application: IApplication;
  /** Платежи по договору */
  payments?: IPayment[];
}
