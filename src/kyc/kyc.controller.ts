import { Response } from "express";
import { AuthRequest, HttpError } from "../common";
import { KycService } from "./kyc.service";

/**
 * @swagger
 * tags:
 *   name: KYC
 *   description: Know Your Customer verification
 */
export class KycController {
  constructor(private readonly kycService: KycService = new KycService()) {}

  /**
   * @swagger
   * /api/kyc/status:
   *   get:
   *     summary: Get current KYC status
   *     tags: [KYC]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: KYC status
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/KycDetails'
   *       401:
   *         description: Unauthorized
   */
  async getKycStatus(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user) throw new HttpError("Unauthorized", 401);

    const status = await this.kycService.getKycStatus(req.user.id);
    res.json({ success: true, data: status });
  }

  /**
   * @swagger
   * /api/kyc/verificate:
   *   post:
   *     summary: Start KYC verification process
   *     tags: [KYC]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Verification process started
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   type: string
   *                   description: Verification URL or session ID
   *       401:
   *         description: Unauthorized
   */
  async startVerification(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user) throw new HttpError("Unauthorized", 401);

    const result = await this.kycService.initiateVerification(req.user.id);
    res.json({ success: true, data: result });
  }

  /**
   * @swagger
   * /api/kyc/webhook:
   *   post:
   *     summary: Handle KYC webhook (internal use)
   *     tags: [KYC]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/PersonaWebhook'
   *     responses:
   *       200:
   *         description: Webhook processed
   */
  async handleWebhook(req: AuthRequest, res: Response): Promise<void> {
    await this.kycService.handleWebhook(req.body);
    res.json({ success: true, message: "Webhook processed" });
  }

  /**
   * @swagger
   * /api/kyc/details:
   *   get:
   *     summary: Get detailed KYC information
   *     tags: [KYC]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Detailed KYC information
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/KycDetails'
   *       401:
   *         description: Unauthorized
   */
  async getKycDetails(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user) throw new HttpError("Unauthorized", 401);

    const details = await this.kycService.getKycDetails(req.user.id);
    res.json({ success: true, data: details });
  }
}

export const kycController = new KycController();
