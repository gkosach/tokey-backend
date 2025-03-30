import type { ILease } from "./lease.interface";

/**
 * Интерфейс инвестора (арендатора).
 */
export interface IInvestor {
  /** Уникальный идентификатор пользователя. */
  id: number;
  /** Идентификатор пользователя в Cognito. */
  cognitoId: string;
  /** Полное имя пользователя. */
  name: string;
  /** Электронная почта пользователя. */
  email: string;
  /** Номер телефона пользователя. */
  phoneNumber: string;
  /** Роль пользователя (инвестор). */
  role: "investor";
  /** Список договоров аренды, связанных с инвестором. */
  leases: ILease[];
}
