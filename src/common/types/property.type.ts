import { PropertyStatus } from "@prisma/client";
import { Request } from "express";
import { z } from "zod";
import { GetPropertiesDTO } from "../validators/property.validator";
import { AllowedFileTypes } from "./storage-service";

export interface GetPropertiesProcessedQuery {
  offset?: number;
  type?: string;
  roi?: number;
  district?: string[];
  status?: PropertyStatus;
  minPrice?: number;
  maxPrice?: number;
  sort?: "title_asc" | "title_desc" | "price_asc" | "price_desc";
}

export interface GetPropertiesRequest extends Request {
  properties?: { query?: GetPropertiesProcessedQuery };
}

export type GetPropertiesRawQuery = z.infer<typeof GetPropertiesDTO>;

export type FilesPathsRecord = Record<AllowedFileTypes, string[] | undefined>;
