import { KycStatus } from "@prisma/client";
import { NextFunction, RequestHandler, Response } from "express";
import { AuthRequest } from "../common";
import { UserService } from "../user/user.service";

export const kycVerifiedMiddleware = (): RequestHandler => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
    }

    try {
      const userService = new UserService();
      const user = await userService.getUserByCognitoId(req.user.id);

      if (user.kycStatus !== KycStatus.APPROVED) {
        return res.status(403).json({
          success: false,
          error: "KYC verification required",
          data: {
            currentStatus: user.kycStatus,
            requiredStatus: "APPROVED",
            message: "Complete KYC verification to access this feature",
          },
        });
      }

      req.user.dbUser = user;
      next();
    } catch (error) {
      console.error("KYC verification failed:", error instanceof Error ? error.message : "Unknown error");
      res.status(500).json({
        success: false,
        error: "KYC verification check failed",
      });
    }
  };
};
