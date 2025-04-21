import { Request, Response, NextFunction } from "express";
import { KycError } from "../kyc";
import { prisma, ErrorStatus, KycErrorMessages } from "../common";

export const kycGuard = (userType: "investor" | "manager") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Проверка наличия пользователя в запросе
      if (!req.user) {
        throw new KycError(ErrorStatus.Unauthorized, KycErrorMessages.KYC_VERIFICATION_REQUIRED);
      }

      const userId = req.user.id;

      const user =
        userType === "investor"
          ? await prisma.investor.findUnique({
              where: { cognitoId: userId },
            })
          : await prisma.manager.findUnique({
              where: { cognitoId: userId },
            });

      if (!user || user.kycStatus !== "Approved") {
        throw new KycError(ErrorStatus.Forbidden, KycErrorMessages.KYC_VERIFICATION_REQUIRED);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
