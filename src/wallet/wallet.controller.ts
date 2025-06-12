import { Response } from "express";
import { AuthRequest } from "../common";
import { TokenController } from "../token/token.controller";
import { WalletService } from "./wallet.service";

export class WalletController {
  constructor(
    readonly walletService: WalletService = new WalletService(),
    readonly tokenController: TokenController = new TokenController(),
  ) {}

  /**
   * Получает балансы токенов (делегируем в TokenController)
   */
  async getTokenBalances(req: AuthRequest, res: Response): Promise<void> {
    return this.tokenController.getTokenBalances(req, res);
  }

  /**
   * Покупка токенов (делегируем в TokenController)
   */
  async purchaseTokens(req: AuthRequest, res: Response): Promise<void> {
    return this.tokenController.purchaseTokens(req, res);
  }

  /**
   * История транзакций (делегируем в TokenController)
   */
  async getTransactionHistory(req: AuthRequest, res: Response): Promise<void> {
    return this.tokenController.getTransactionHistory(req, res);
  }

  /**
   * Получает информацию о кошельке
   */
  async getWalletInfo(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user) throw new Error("Unauthorized");

    const wallet = await this.walletService.getWalletByUserId(req.user.id);

    res.json({
      success: true,
      data: wallet,
    });
  }

  /**
   * Проверка статуса кошелька
   */
  async checkWalletStatus(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user) throw new Error("Unauthorized");

    const status = await this.walletService.checkWalletStatus(req.user.id);

    res.json({
      success: true,
      data: status,
    });
  }

  /**
   * Создает кошелек для пользователя
   */
  async createWallet(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user) throw new Error("Unauthorized");

    const walletAddress = await this.walletService.createWalletForUser(req.user.id);

    res.status(201).json({
      success: true,
      data: { walletAddress },
    });
  }
}

export const walletController = new WalletController();
