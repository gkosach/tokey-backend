import { PropertyType } from "../../../prisma/types/prismaTypes";

/**
 * DTO для создания нового свойства.
 * Содержит все необходимые поля для передачи данных о недвижимости.
 */
export class CreatePropertyDto {
  /** Название недвижимости. */
  name!: string;

  /** Описание недвижимости. */
  description!: string;

  /** Цена аренды за месяц. */
  pricePerMonth!: number;

  /** Сумма залога за аренду. */
  securityDeposit!: number;

  /** Сумма за подачу заявки на аренду (опционально). */
  applicationFee?: number;

  /** Разрешено ли проживание с домашними животными. */
  isPetsAllowed: boolean = false;

  /** Включена ли парковка в стоимость аренды. */
  isParkingIncluded: boolean = false;

  /** Тип недвижимости (из enum PropertyType). */
  propertyType!: PropertyType;

  /** Количество спальных мест. */
  beds!: number;

  /** Количество ванных комнат. */
  baths!: number;

  /** Площадь недвижимости в квадратных метрах. */
  squareFeet!: number;

  /** Массив URL-адресов фотографий недвижимости. */
  photoUrls!: string[];

  /** Уникальный идентификатор менеджера (Cognito ID). */
  managerCognitoId!: string;

  /** Адрес недвижимости. */
  address!: string;

  /** Почтовый индекс недвижимости. */
  postalCode!: string;
}
