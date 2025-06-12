import { NextFunction, Response } from "express";
import { AuthRequest } from "../common";
import { KycService } from "./kyc.service";

export class KycController {
  constructor(readonly kycService: KycService = new KycService()) {}

  /**
   * Получает текущий статус KYC пользователя
   * @returns Статус KYC верификации
   * @throws {Error} Если пользователь не авторизован
   */
  async getKycStatus(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new Error("Unauthorized");

      const status = await this.kycService.getKycStatus(req.user.id);

      res.json({
        success: true,
        data: { status },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Инициирует процесс KYC верификации
   * @returns ID верификации для прохождения KYC
   * @throws {Error} Если пользователь не авторизован
   */
  async startVerification(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new Error("Unauthorized");

      const { inquiryId } = await this.kycService.initiateVerification(req.user.id);

      res.status(202).json({
        success: true,
        data: { inquiryId },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Обрабатывает вебхук от KYC провайдера
   * @returns Статус 200 при успешной обработке
   */
  async handleWebhook(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        data: {
          id: verificationId,
          attributes: { status },
        },
      } = req.body;

      await this.kycService.handleWebhook(verificationId, status === "approved" ? "approved" : "declined");

      res.json({
        success: true,
        message: "Webhook processed successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Обновляет статус KYC пользователя
   * @returns Статус обновления KYC
   * @throws {Error} Если пользователь не авторизован
   */
  async updateKycStatus(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new Error("Unauthorized");

      const { inquiryId } = req.body;
      if (!inquiryId) {
        this.startVerification(req, res, next);
        return;
      }

      const response = await this.kycService.handleInquiryStatusUpdate(inquiryId, req.user.id);

      res.json({
        success: true,
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Получает детальную информацию о KYC пользователя
   * @returns Детальная информация о KYC
   * @throws {Error} Если пользователь не авторизован
   */
  async getKycDetails(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new Error("Unauthorized");

      const details = await this.kycService.getKycDetails(req.user.id);

      res.json({
        success: true,
        data: details,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const kycController = new KycController();
