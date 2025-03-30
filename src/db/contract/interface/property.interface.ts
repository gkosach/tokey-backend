import { IApplication } from "@/src/db/contract/interface/application.interface";
import { ILease } from "@/src/db/contract/interface/lease.interface";
import { IManager } from "@/src/db/contract/interface/manager.interface";

/**
 * Интерфейс объекта недвижимости
 */
export interface IProperty {
  /** Уникальный идентификатор */
  id: number;
  /** Название объекта */
  name: string;
  /** Описание */
  description: string;
  /** Цена аренды в месяц */
  pricePerMonth: number;
  /** Залоговая сумма */
  securityDeposit: number;
  /** Плата за заявку */
  applicationFee: number;
  /** Ссылки на фотографии */
  photoUrls: string[];
  /** Разрешены ли животные */
  isPetsAllowed: boolean;
  /** Включена ли парковка */
  isParkingIncluded: boolean;
  /** Количество спален */
  beds: number;
  /** Количество ванных */
  baths: number;
  /** Площадь (кв. футы) */
  squareFeet: number;
  /** Тип недвижимости */
  propertyType: string;
  /** Адрес */
  address: string;
  /** Город */
  city: string;
  /** Регион */
  state: string;
  /** Страна */
  country: string;
  /** Почтовый индекс */
  postalCode: string;
  /** Дата публикации */
  postedDate: Date;
  /** Средний рейтинг */
  averageRating?: number;
  /** Количество отзывов */
  numberOfReviews?: number;
  /** Геометрическая точка местоположения (PostGIS) */
  location?: any;
  /** Широта местоположения */
  latitude: number;
  /** Долгота местоположения */
  longitude: number;
  /** Связанные договоры аренды */
  leases?: ILease[];
  /** Ответственный менеджер */
  manager: IManager;
  /** Заявки на аренду */
  applications?: IApplication[];
}
