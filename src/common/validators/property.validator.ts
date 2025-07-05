import { PropertyStatus } from "@prisma/client";
import { z } from "zod";

const statusValues = Object.values(PropertyStatus) as [string, ...string[]];
const sortingValues = ["title_asc", "title_desc", "price_asc", "price_desc"] as const;

const nullableString = z
  .string()
  .optional()
  .transform((val) => val?.trim() || undefined);

export const GetPropertiesDTO = z.object({
  offset: nullableString.catch(undefined),
  type: nullableString.catch(undefined),
  district: nullableString.catch(undefined),
  status: z.enum(statusValues).optional().catch(undefined),
  minPrice: nullableString.catch(undefined),
  maxPrice: nullableString.catch(undefined),
  roi: nullableString.catch(undefined),
  sort: z.enum(sortingValues).optional().catch(undefined),
});
