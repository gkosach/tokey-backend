import dotenv from "dotenv";
import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { SystemErrorMessages } from "../common";

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
    };
  }
}

/**
 * Middleware для аутентификации через Cognito JWT
 * @returns Express middleware функция
 */
export const authMiddleware = (): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith("Bearer ")) {
        throw new Error("Неверный формат заголовка авторизации");
      }

      const token = authHeader.split(" ")[1];
      if (!token) throw new Error("Отсутствует токен авторизации");

      const getKey: jwt.GetPublicKeyOrSecret = (header, callback) => {
        client.getSigningKey(header.kid, (err, key) => {
          if (err || !key) {
            return callback(new Error("Ошибка получения ключа подписи"));
          }
          callback(null, key.getPublicKey());
        });
      };

      const decoded = await new Promise<JwtPayload>((resolve, reject) => {
        jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, decoded) => {
          if (err) reject(new Error(`Ошибка верификации токена: ${err.message}`));
          resolve(decoded as JwtPayload);
        });
      });

      if (!decoded.sub) {
        throw new Error("Токен не содержит идентификатора пользователя (sub)");
      }

      req.user = { id: decoded.sub };
      next();
    } catch (error) {
      console.error("[Auth error]", error);
      res.status(401).json({
        error: SystemErrorMessages.INTERNAL_ERROR,
        message: error instanceof Error ? error.message : "Неизвестная ошибка",
        docs: {
          jwks: cognitoConfig.jwksUri,
          auth_scheme: "Bearer <token>",
        },
      });
    }
  };
};
