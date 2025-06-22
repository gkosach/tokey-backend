import { Response } from "express";
import { AuthRequest, HttpError } from "../../common";
import { KycService } from "./kyc.service";

export class KycController {
  constructor(private readonly kycService: KycService = new KycService()) {}

  /**
   * Получает текущий статус KYC пользователя
   */
  async getKycStatus(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user) throw new HttpError("Unauthorized", 401);

    const status = await this.kycService.getKycStatus(req.user.id);
    res.json({ success: true, data: status });
  }

  /**
   * Инициирует процесс KYC верификации
   */
  async startVerification(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user) throw new HttpError("Unauthorized", 401);

    const result = await this.kycService.initiateVerification(req.user.id);
    res.json({ success: true, data: result });
  }

  /**
   * Обрабатывает вебхук от KYC провайдера
   */
  async handleWebhook(req: AuthRequest, res: Response): Promise<void> {
    await this.kycService.handleWebhook(req.body);
    res.json({ success: true, message: "Webhook processed" });
  }

  /**
   * Получает детальную информацию о KYC пользователя
   */
  async getKycDetails(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user) throw new HttpError("Unauthorized", 401);

    const details = await this.kycService.getKycDetails(req.user.id);
    res.json({ success: true, data: details });
  }
}

export const kycController = new KycController();
