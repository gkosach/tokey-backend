import { NextFunction, Request, RequestHandler, Response } from "express";
import { ErrorStatus, KycErrorMessages, prisma } from "../common";
import { KycError } from "../kyc";

export const kycGuard = (): RequestHandler => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw new KycError(ErrorStatus.Unauthorized, KycErrorMessages.VERIFICATION_FAILED);
      }

      const userId = req.user.id;
      const user = await prisma.user.findUnique({
        where: { cognitoId: userId },
      });

      if (!user || user.kycStatus !== "VERIFIED") {
        throw new KycError(ErrorStatus.Forbidden, KycErrorMessages.VERIFICATION_FAILED);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
