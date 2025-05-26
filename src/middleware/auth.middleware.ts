import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

dotenv.config();

/**
 * Проверка и настройка окружения
 * Выводим в консоль ключевые параметры для отладки
 */
console.log("[ENV] AWS_REGION:", process.env.AWS_REGION);
console.log("[ENV] COGNITO_USER_POOL_ID:", process.env.COGNITO_USER_POOL_ID);

/**
 * Валидация обязательных переменных окружения
 * @throws {Error} Если отсутствуют AWS_REGION или COGNITO_USER_POOL_ID
 */
if (!process.env.AWS_REGION || !process.env.COGNITO_USER_POOL_ID) {
  throw new Error("AWS_REGION и COGNITO_USER_POOL_ID должны быть заданы в .env");
}

/**
 * Конфигурация Cognito
 */
const cognitoConfig = {
  region: process.env.AWS_REGION,
  userPoolId: process.env.COGNITO_USER_POOL_ID,
  jwksUri: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
};

/**
 * Клиент для работы с JWKS (JSON Web Key Set)
 * Использует кеширование и ограничение запросов
 */
const client = jwksClient({
  jwksUri: cognitoConfig.jwksUri,
  cache: true,
  rateLimit: true,
});

/**
 * Расширение типов Express для добавления пользователя в объект запроса
 */
declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      accessToken: string;
    };
  }
}

export const authMiddleware = (): ((req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    try {
      const decoded = jwt.decode(token, { complete: true });
      req.user = {
        id: decoded?.payload.sub as string,
        accessToken: token,
      };
      next();
    } catch {
      res.status(401).json({ error: "Invalid token" });
    }
  };
};
