import { NextFunction, Request, Response } from "express";
import jwksClient from "jwks-rsa";
import jwt, { JwtPayload } from "jsonwebtoken";
import "express";
import dotenv from "dotenv";
dotenv.config();

console.log("[ENV] AWS_REGION:", process.env.AWS_REGION);
console.log("[ENV] COGNITO_USER_POOL_ID:", process.env.COGNITO_USER_POOL_ID);

/**
 * Проверка и логирование переменных окружения
 */
if (!process.env.AWS_REGION || !process.env.COGNITO_USER_POOL_ID) {
  throw new Error("AWS_REGION и COGNITO_USER_POOL_ID должны быть заданы в .env");
}

const cognitoConfig = {
  region: process.env.AWS_REGION,
  userPoolId: process.env.COGNITO_USER_POOL_ID,
  jwksUri: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
};

const client = jwksClient({
  jwksUri: cognitoConfig.jwksUri,
  cache: true,
  rateLimit: true,
});

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      role: string;
    };
  }
}

/**
 *
 * @param allowedRoles
 */
export const authMiddleware = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith("Bearer ")) {
        throw new Error("Authorization header is missing or invalid");
      }

      const token = authHeader.split(" ")[1];
      if (!token) throw new Error("Token missing");

      const getKey = (header: any, callback: any) => {
        client.getSigningKey(header.kid, (err, key) => {
          if (err) {
            console.error("[JWKS] Error fetching key:", err);
            return callback(new Error("Failed to retrieve verification key"));
          }
          if (!key) {
            return callback(new Error("Signing key not found"));
          }
          callback(null, key.getPublicKey());
        });
      };

      const decoded = await new Promise<JwtPayload>((resolve, reject) => {
        jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, decoded) => {
          if (err) {
            console.error("[JWT] Verification failed:", err.message);
            reject(new Error("Invalid or expired token"));
            return;
          }
          resolve(decoded as JwtPayload);
        });
      });

      if (!decoded.sub || !decoded["custom:role"]) {
        throw new Error("Token is missing required claims");
      }

      const userRole = decoded["custom:role"].toLowerCase();
      if (!allowedRoles.includes(userRole)) {
        throw new Error(`Role '${userRole}' is not authorized`);
      }

      req.user = {
        id: decoded.sub,
        role: userRole,
      };

      next();
    } catch (error) {
      console.error("[Auth Middleware] Error:", error);
      res.status(401).json({
        error: "Unauthorized",
        message: error instanceof Error ? error.message : "Authentication failed",
        details: {
          requiredRoles: allowedRoles,
          jwksEndpoint: cognitoConfig.jwksUri,
        },
      });
    }
  };
};
