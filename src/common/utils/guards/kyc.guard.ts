import { KycStatus } from "@prisma/client";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { KycError } from "../../../kyc";
import { prisma } from "../../config/prisma";

/**
 * Guard middleware для проверки статуса KYC пользователя
 * Проверяет, что пользователь прошел KYC верификацию
 * перед доступом к защищенным операциям
 *
 * @returns Express middleware функция
 * @throws {KycError} unauthorized - Если пользователь не авторизован
 * @throws {KycError} verificationNotFound - Если пользователь не найден
 * @throws {KycError} verificationRequired - Если KYC не завершен
 */
export const kycGuard = (): RequestHandler => {
  return async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw KycError.unauthorized();
      }

      const userId = req.user.id;

      const user = await prisma.user.findUnique({
        where: { cognitoId: userId },
        select: { kycStatus: true },
      });
      if (!user) {
        throw KycError.verificationNotFound();
      }

      if (user.kycStatus !== KycStatus.COMPLETED) {
        throw KycError.verificationRequired();
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
