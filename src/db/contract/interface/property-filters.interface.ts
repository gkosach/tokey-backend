import { IProperty } from "@/src/db/contract";

/**
 * Интерфейс фильтров для поиска объектов недвижимости
 */
export interface PropertyFilters {
  /** Минимальная цена аренды в месяц */
  minPrice?: number;
  /** Максимальная цена аренды в месяц */
  maxPrice?: number;
  /** Количество спален */
  beds?: number;
  /** Количество ванных комнат */
  baths?: number;
  /** Минимальная площадь в квадратных футах */
  minSquareFeet?: number;
  /** Максимальная площадь в квадратных футах */
  maxSquareFeet?: number;
  /** Город */
  city?: string;
  /** Штат/область */
  state?: string;
  /** Страна */
  country?: string;
  /** Тип недвижимости */
  propertyType?: string;
  /** Разрешены ли домашние животные */
  isPetsAllowed?: boolean;
  /** Включена ли парковка */
  isParkingIncluded?: boolean;
  /** Поле для сортировки */
  sortBy?: keyof IProperty;
  /** Направление сортировки */
  sortDirection?: "ASC" | "DESC";
  /** Ограничение количества результатов */
  limit?: number;
  /** Смещение для пагинации */
  offset?: number;
  /** Широта центральной точки для поиска по расстоянию */
  latitude?: number;
  /** Долгота центральной точки для поиска по расстоянию */
  longitude?: number;
  /** Максимальное расстояние в километрах для поиска */
  maxDistance?: number;
}
