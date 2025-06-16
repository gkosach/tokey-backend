import { NextFunction, RequestHandler, Response } from "express";
import { AuthRequest } from "../common";
import { KycService } from "../kyc/kyc.service";

export const kycVerifiedMiddleware = (): RequestHandler => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
      });
    }

    const kycService = new KycService();

    try {
      const canCreateWallet = await kycService.canCreateWallet(req.user.id);

      if (!canCreateWallet) {
        const kycStatus = await kycService.getKycStatus(req.user.id);

        return res.status(403).json({
          success: false,
          error: "KYC verification required",
          data: {
            currentStatus: kycStatus,
            message: "Complete KYC verification to create wallet",
          },
        });
      }

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
