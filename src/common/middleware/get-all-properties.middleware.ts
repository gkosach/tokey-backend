import { NextFunction, Response } from "express";
import { GetPropertiesRequest } from "../types";
import { parsePropertiesQuery } from "../utils";
import { GetPropertiesDTO } from "../validators";

export const getAllPropertyMiddleware = () => {
  return (req: GetPropertiesRequest, res: Response, next: NextFunction) => {
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
