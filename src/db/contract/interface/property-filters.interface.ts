import { Property } from "@/src/db/entities";

export interface PropertyFilters {
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  baths?: number;
  minSquareFeet?: number;
  maxSquareFeet?: number;
  city?: string;
  state?: string;
  country?: string;
  propertyType?: string;
  isPetsAllowed?: boolean;
  isParkingIncluded?: boolean;
  sortBy?: keyof Property;
  sortDirection?: "ASC" | "DESC"; // Фиксируем тип направления сортировки
  limit?: number;
  offset?: number;
  latitude?: number;
  longitude?: number;
  maxDistance?: number; // Добавляем отсутствующее поле
}
