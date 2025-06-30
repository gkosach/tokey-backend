import { PropertyStatus } from "@prisma/client";
import { GetPropertiesDTO, GetPropertiesProcessedQuery, GetPropertiesRawQuery } from "../..";

const toNumber = (value?: string): number | undefined => {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed === "" || isNaN(Number(trimmed)) ? undefined : Number(trimmed);
};
const toStringArray = (val?: unknown): string[] | undefined => {
  return typeof val === "string" ? val.split("|") : undefined;
};

export const parsePropertiesQuery = (query: GetPropertiesRawQuery): GetPropertiesProcessedQuery => {
  const result = GetPropertiesDTO.safeParse(query);
  if (!result.success) throw new Error("Validation failed");

  const { offset, type, district, status, minPrice, maxPrice, roi, sort } = result.data;

  return {
    offset: toNumber(offset),
    type,
    district: toStringArray(district),
    status: status as PropertyStatus | undefined,
    minPrice: toNumber(minPrice),
    maxPrice: toNumber(maxPrice),
    roi: toNumber(roi),
    sort,
  };
};
