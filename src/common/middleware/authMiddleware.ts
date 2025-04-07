import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  sub: string;
  "custom:role"?: string;
}

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

export const authMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization || "";
    const [authType, token] = authHeader.split(" ");

    console.log("[AUTH] Authorization header:", authHeader);

    if (authType.toLowerCase() !== "bearer" || !token) {
      console.log("[AUTH] Invalid authorization format");
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      console.log("[AUTH] Received token:", token);

      const decoded = jwt.decode(token) as DecodedToken;
      console.log("[AUTH] Decoded token:", JSON.stringify(decoded, null, 2));

      if (!decoded?.sub) {
        console.log("[AUTH] Missing sub in token");
        throw new Error("Invalid token structure");
      }

      const userRole = decoded["custom:role"]?.toLowerCase() || "";
      console.log("[AUTH] User role detected:", userRole);

      req.user = {
        id: decoded.sub,
        role: userRole,
      };

      console.log("[AUTH] Allowed roles:", allowedRoles);
      const hasAccess = allowedRoles.includes(userRole);
      if (!hasAccess) {
        console.log(`[AUTH] Access denied for role '${userRole}'`);
        res.status(403).json({ message: "Access Denied" });
        return;
      }

      console.log("[AUTH] Authentication successful");
      next();
    } catch (err) {
      console.error("[AUTH] Authentication error:", err);
      res.status(400).json({ message: "Invalid token" });
    }
  };
};
