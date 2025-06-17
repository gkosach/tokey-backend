import { NextFunction, Response } from "express";
import { AuthRequest } from "../common";
import { PersonaInquiryEvent } from "./contract/enum/persona-inquiry-event.enum";
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

      const { inquiryId, sessionToken } = await this.kycService.initiateVerification(req.user.id);

      res.status(202).json({
        success: true,
        data: { inquiryId, sessionToken },
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
      const webhookPayloadData = req.body.data.attributes.payload.data;
      const {
        id: inquiryId,
        attributes: { status },
      } = webhookPayloadData;

      console.log("New webhook event:", { inquiryId: inquiryId, status: status });

      await this.kycService.handleWebhook(inquiryId as string, status as PersonaInquiryEvent);

      res.json({
        success: true,
        message: "Webhook processed successfully",
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
