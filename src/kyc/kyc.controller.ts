import { Request, Response, NextFunction } from "express";
import { KycService } from "./kyc.service";
import { CreateKycSessionDto } from "./index";

/**
 * Контроллер для работы с KYC процессом
 */
export class KycController {
  private readonly kycService = new KycService();

  /**
   * Инициализация KYC-сессии
   * @route POST /kyc/init
   * @param req.body - CreateKycSessionDto
   * @returns Ссылка на верификацию
   */
  createSession = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: CreateKycSessionDto = req.body;
      const result = await this.kycService.createSession(dto.userId, dto.userType);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Обработка вебхука от Persona
   * @route POST /kyc/webhook
   * @param req.body - Payload от Persona
   * @returns 200 OK или ошибка
   */
  handleWebhook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.kycService.handleWebhook(req.body);
      res.status(200).json({ status: "ok" });
    } catch (error) {
      next(error);
    }
  };
}

export const kycController = new KycController();
