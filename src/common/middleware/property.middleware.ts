import { NextFunction, Request, Response } from "express";
import { GetPropertiesProcessedQuery } from "../types";
import { parsePropertiesQuery } from "../utils";
import { GetPropertiesDTO } from "../validators";

/**
 * Расширение типов Express для добавления объекта property в объект запроса
 */
declare module "express-serve-static-core" {
  interface Request {
    properties?: { query?: GetPropertiesProcessedQuery };
  }
}

export const getAllPropertyMiddleware = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = GetPropertiesDTO.safeParse(req.query);
      const validatedQuery = result.error ? {} : result.data;
      const parsedQuery = parsePropertiesQuery(validatedQuery);

      req.properties = { query: parsedQuery };
      next();
    } catch (err) {
      console.error("Properties query validation failed:", err);
      res.status(400).json({ success: false, error: "Invalid query parameters" });
    }
  };
};
