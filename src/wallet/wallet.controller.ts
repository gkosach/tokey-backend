import { NextFunction, Request, Response } from "express";
import { WalletService } from "./wallet.service";

export class WalletController {
  private service = new WalletService();

  async linkWallet(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { address } = req.body;
      const userId = req.user!.id;

      const wallet = await this.service.createWallet(userId, address);
      res.status(201).json({
        address: wallet.address,
        whitelisted: wallet.whitelisted,
        userId: wallet.userId,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserWallets(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const wallets = await this.service.getWallets(req.user!.id);
      res.json(
        wallets.map((wallet) => ({
          ...wallet,
          userId: req.user!.id,
        })),
      );
    } catch (error) {
      next(error);
    }
  }
}

export const walletController = new WalletController();
