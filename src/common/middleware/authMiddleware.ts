import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

interface DecodedToken extends JwtPayload {
  sub: string;
  "custom:role": string;
}

export const authMiddleware = (allowedRoles: string[] = []) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization || "";
      const [authType, token] = authHeader.split(" ");
      if (authType.toLowerCase() !== "bearer" || !token) {
        throw new Error("Invalid authorization format. Use: Bearer <token>");
      }
      const secretKey = process.env.JWT_SECRET;
      if (!secretKey) {
        throw new Error("JWT_SECRET is not defined in .env file");
      }
      const decoded = jwt.verify(token, secretKey) as DecodedToken;
      const role = decoded["custom:role"]?.toLowerCase() || "manager";
      if (!decoded.sub || !decoded["custom:role"]) {
        throw new Error("Invalid token structure");
      }
      if (!allowedRoles.includes(role)) {
        throw new Error(`Role '${role}' not allowed`);
      }

      req.user = {
        id: decoded.sub,
        role: role,
      };
      next();
    } catch (error) {
      console.error("[AUTH] Authentication error:", error);
      handleAuthError(error, res);
    }
  };
};

const handleAuthError = (error: unknown, res: Response) => {
  const message = error instanceof Error ? error.message : "Authentication error";
  let statusCode = 401;

  if (message.includes("permissions")) statusCode = 403;
  if (message.includes("invalid")) statusCode = 400;

  res.status(statusCode).json({
    error: "Authentication failed",
    details: message.replace(/Token/g, "").trim(),
  });
};
