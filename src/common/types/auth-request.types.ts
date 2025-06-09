import { Request } from "express";

/** Расширенный интерфейс Request с информацией о пользователе */
export interface AuthRequest extends Request {
  user?: {
    id: string;
    accessToken: string;
  };
}
