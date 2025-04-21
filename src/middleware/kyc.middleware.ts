import { Request, Response, NextFunction } from "express";
import { KycError } from "../kyc";
import { prismaConfig, ErrorStatus, KycErrorMessages } from "../common";

export const kycGuard = (userType: "investor" | "manager") => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Проверка наличия пользователя в запросе
      if (!req.user) {
        throw new KycError(ErrorStatus.Unauthorized, KycErrorMessages.VERIFICATION_REQUIRED);
      }

      const userId = req.user.id;

      const user =
        userType === "investor"
          ? await prismaConfig.investor.findUnique({
              where: { cognitoId: userId },
            })
          : await prismaConfig.manager.findUnique({
              where: { cognitoId: userId },
            });

      if (!user || user.kycStatus !== "Approved") {
        throw new KycError(ErrorStatus.Forbidden, KycErrorMessages.VERIFICATION_REQUIRED);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
