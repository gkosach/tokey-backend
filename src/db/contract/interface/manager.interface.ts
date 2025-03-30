import { IProperty } from "@/src/db/contract";

/**
 * Интерфейс менеджера (управляющего).
 */
export interface IManager {
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
  /** Роль пользователя (менеджер). */
  role: "manager";
  /** Список объектов недвижимости, которыми управляет менеджер. */
  managedProperties: IProperty[];
}
