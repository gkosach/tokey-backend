import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "express";

/**
 * Расширение интерфейса Request для хранения пользователя.
 */
declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      role: string;
    };
  }
}

/**
 * Интерфейс для декодированного JWT-токена.
 */
interface DecodedToken extends JwtPayload {
  sub: string;
  "custom:role"?: string;
}

/**
 * Мидлвар для аутентификации и авторизации по JWT.
 * @param allowedRoles - массив ролей, которым разрешён доступ
 * @returns Express middleware
 */
export const authMiddleware =
  (allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      // Верификация токена с помощью секретного ключа
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
      const userRole = (decoded["custom:role"] || "").toLowerCase();

      req.user = {
        id: decoded.sub,
        role: userRole,
      };

      const hasAccess = allowedRoles.includes(userRole);
      if (!hasAccess) {
        res.status(403).json({ message: "Access Denied" });
        return;
      }

      next();
    } catch (err) {
      console.error("Failed to verify token:", err);
      res.status(400).json({ message: "Invalid token" });
    }
  };
