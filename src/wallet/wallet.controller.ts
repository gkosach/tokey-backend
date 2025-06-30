import { Response } from "express";
import { AuthRequest, HttpError } from "../common";
import { WalletService } from "./wallet.service";

export class WalletController {
  private walletService = new WalletService();

  /**
   * Получает баланс кошелька пользователя
   */
  async getWalletBalance(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw new HttpError("Unauthorized", 401);
    }

    const { walletAddress } = req.query;
    if (!walletAddress || typeof walletAddress !== "string") {
      throw new HttpError("Wallet address is required", 400);
    }

    const balance = await this.walletService.getWalletBalance(walletAddress);

    res.json({
      success: true,
      data: { balance },
    });
  }
}

export const walletController = new WalletController();
