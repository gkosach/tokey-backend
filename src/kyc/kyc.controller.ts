import { NextFunction, Request, Response } from "express";
import { KycService } from "./kyc.service";

export class KycController {
  private service = new KycService();

  async getKycStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const status = await this.service.getKycStatus(userId);
      res.json({ status });
    } catch (error) {
      next(error);
    }
  }

  async startVerification(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const { inquiryId } = await this.service.initiateVerification(userId);
      res.json({ inquiryId });
    } catch (error) {
      console.error("KYC start error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async handleWebhook(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        data: {
          id: verificationId,
          attributes: { status },
        },
      } = req.body;

      await this.service.handleWebhook(verificationId, status === "approved" ? "approved" : "declined");

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}

export const kycController = new KycController();
