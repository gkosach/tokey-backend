import { IInvestor, ILease, IManager, IProperty } from "@/src/db/contract";
import { ApplicationStatus } from "@/src/db/contract/enum/application-status.enum";

/**
 * Интерфейс заявки на аренду
 */
export interface IApplication {
  /** Уникальный идентификатор */
  id: string; // Было number
  /** Дата подачи заявки */
  applicationDate: Date;
  /** Статус заявки */
  status: ApplicationStatus; // Было string
  /** Сообщение */
  message: string;
  /** Целевой объект недвижимости */
  property: IProperty;
  /** Заявитель */
  applicant: IManager | IInvestor;
  /** Связанный договор аренды */
  lease?: ILease; // Сделано опциональным
}
