import dotenv from "dotenv";
import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

dotenv.config();

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

export const authMiddleware = (): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.decode(token, { complete: true });
      if (!decoded?.header.kid) throw new Error("Invalid token");

      const key = await client.getSigningKey(decoded.header.kid);
      const publicKey = key.getPublicKey();

      jwt.verify(token, publicKey, { algorithms: ['RS256'] });
      next();
    } catch (err) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
};
