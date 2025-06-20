import { Response } from "express";
import { AuthRequest, HttpError } from "../common";
import { KycService } from "./kyc.service";

export class KycController {
  constructor(readonly kycService: KycService = new KycService()) {}

  /**
   * Получает текущий статус KYC пользователя
   */
  async getKycStatus(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw new HttpError("Unauthorized", 401);
    }

    const status = await this.kycService.getKycStatus(req.user.id);

    res.json({
      success: true,
      data: status,
    });
  }

  /**
   * Инициирует процесс KYC верификации
   */
  async startVerification(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw new HttpError("Unauthorized", 401);
    }

    const { inquiryId, sessionToken } = await this.kycService.initiateVerification(req.user.id);

    res.status(202).json({
      success: true,
      data: { inquiryId, sessionToken },
    });
  }

  /**
   * Обрабатывает вебхук от KYC провайдера
   */
  async handleWebhook(req: AuthRequest, res: Response): Promise<void> {
    if (!req.body?.data?.attributes?.payload?.data) {
      throw new HttpError("Invalid webhook payload", 400);
    }

    const webhookPayloadData = req.body.data.attributes.payload.data;
    const {
      id: inquiryId,
      attributes: { status },
    } = webhookPayloadData;

    if (!inquiryId || !status) {
      throw new HttpError("Missing inquiryId or status in webhook", 400);
    }

    console.log("New webhook event:", { inquiryId, status });

    await this.kycService.handleWebhook(inquiryId, status);

    res.json({
      success: true,
      message: "Webhook processed successfully",
    });
  }

  /**
   * Получает детальную информацию о KYC пользователя
   */
  async getKycDetails(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw new HttpError("Unauthorized", 401);
    }

    const details = await this.kycService.getKycDetails(req.user.id);

    res.json({
      success: true,
      data: details,
    });
  }
}

export const kycController = new KycController();
