import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  sub: string;
  "custom:role"?: string;
}

declare module "express" {
  interface Request {
    user?: {
      id: string;
      role: string;
    };
  }
}

/**
 * Создаёт промежуточный обработчик аутентификации JWT.
 *
 * @param allowedRoles Массив разрешённых ролей для доступа.
 * @returns Промежуточный обработчик.
 */
export const authMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    /** Извлекает токен из заголовка Authorization.*/
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      /** Возвращает ошибку 401, если токен не найден. */
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    try {
      /** Декодирует токен и извлекает роль пользователя. */
      const decoded = jwt.decode(token) as DecodedToken;
      const userRole = decoded["custom:role"] || "";
      req.user = {
        id: decoded.sub,
        role: userRole,
      };
      /** Проверяет, имеет ли пользователь доступ на основе роли. */
      const hasAccess = allowedRoles.includes(userRole.toLowerCase());
      if (!hasAccess) {
        /** Возвращает ошибку 403, если доступ запрещён. */
        res.status(403).json({ message: "Access denied" });
        return;
      }
      /** Вызывает следующий обработчик, если доступ разрешён. */
      next();
    } catch (error) {
      /** Обрабатывает ошибки декодирования токена. */
      console.error("Failed to decode token:", error);
      res.status(400).json({ message: "Invalid token" });
      return;
    }
  };
};
