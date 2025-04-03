import { IApplication, ILease, IManager } from "@/src/db/contract";

export interface IProperty {
  id: string; // Было number
  name: string;
  description: string;
  pricePerMonth: number;
  securityDeposit: number;
  applicationFee: number;
  photoUrls: string[];
  isPetsAllowed?: boolean; // Сделано опциональным
  isParkingIncluded?: boolean; // Сделано опциональным
  beds?: number; // Сделано опциональным
  baths?: number; // Сделано опциональным
  squareFeet?: number; // Сделано опциональным
  propertyType?: string; // Сделано опциональным
  address?: string; // Сделано опциональным
  city?: string; // Сделано опциональным
  state?: string; // Сделано опциональным
  country?: string; // Сделано опциональным
  postalCode?: string; // Сделано опциональным
  postedDate?: Date; // Сделано опциональным
  averageRating?: number;
  numberOfReviews?: number;
  location?: any;
  latitude?: number;
  longitude?: number;
  leases?: ILease[];
  manager?: IManager;
  applications?: IApplication[];
}
