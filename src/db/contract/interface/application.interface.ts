import { IInvestor, ILease, IManager, IProperty } from "@/src/db/contract";

/**
 * Интерфейс заявки на аренду
 */
export interface IApplication {
  /** Уникальный идентификатор */
  id: number;
  /** Дата подачи заявки */
  applicationDate: Date;
  /** Статус заявки */
  status: string;
  /** Сообщение */
  message: string;
  /** Целевой объект недвижимости */
  property: IProperty;
  /** Заявитель */
  applicant: IManager | IInvestor;
  /** Связанный договор аренды */
  lease?: ILease;
}
