import { Prisma } from "@prisma/client";

/**
 * Тип для свойства с включенной локацией
 */
export type PropertyWithLocation = Prisma.PropertyGetPayload<{
  include: {
    location: true;
  };
}>;
