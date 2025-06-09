import { NextFunction, Request, Response } from "express";
import { WalletService } from "./wallet.service";

export class WalletController {
  private service = new WalletService();

  /**
   * Получает информацию о HSM кошельке пользователя
   * @returns Информация о кошельке и его статусе
   */
  async getWalletInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new Error("Unauthorized");

      const walletInfo = await this.service.getWalletInfo(req.user.id);

      res.json({
        success: true,
        data: walletInfo,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Получает балансы токенов по всем объектам недвижимости
   * @returns Балансы токенов пользователя
   */
  async getTokenBalances(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new Error("Unauthorized");

      const balances = await this.service.getTokenBalances(req.user.id);

      res.json({
        success: true,
        data: balances,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Покупает токены недвижимости
   * @returns Информация о созданной транзакции
   */
  async purchaseTokens(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new Error("Unauthorized");

      const { propertyId, tokensAmount, txHash } = req.body;

      if (!propertyId || !tokensAmount || !txHash) {
        res.status(400).json({
          success: false,
          error: "Missing required fields: propertyId, tokensAmount, txHash",
        });
        return;
      }

      const transaction = await this.service.purchaseTokens(req.user.id, propertyId, tokensAmount, txHash);

      res.status(201).json({
        success: true,
        data: transaction,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Получает историю транзакций пользователя
   * @returns История транзакций с пагинацией
   */
  async getTransactionHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new Error("Unauthorized");

      const { limit, offset } = req.query;

      const history = await this.service.getTransactionHistory(
        req.user.id,
        limit ? parseInt(limit as string) : 20,
        offset ? parseInt(offset as string) : 0,
      );

      res.json({
        success: true,
        data: history,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Получает статистику кошелька пользователя
   * @returns Общая статистика по кошельку
   */
  async getWalletStats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new Error("Unauthorized");

      const stats = await this.service.getWalletStats(req.user.id);

      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Проверяет статус кошелька (доступен ли для операций)
   * @returns Статус доступности кошелька
   */
  async checkWalletStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new Error("Unauthorized");

      const isEnabled = await this.service.isWalletEnabled(req.user.id);

      res.json({
        success: true,
        data: {
          isEnabled,
          message: isEnabled
            ? "Wallet is enabled and ready for operations"
            : "Wallet requires KYC completion to be enabled",
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const walletController = new WalletController();
