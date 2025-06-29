import { Response } from "express";
import { AuthRequest } from "../common";
import { TokenService } from "./token.service";

export class TokenController {
  constructor(readonly tokenService: TokenService = new TokenService()) {}

  /**
   * Получает балансы токенов пользователя
   */
  async getTokenBalances(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user) throw new Error("Unauthorized");

    const balances = await this.tokenService.getUserTokenBalances(req.user.id);
    res.json({
      success: true,
      data: balances,
    });
  }

  /**
   * Покупка токенов
   */
  async purchaseTokens(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user) throw new Error("Unauthorized");

    const { tierId, tokensAmount, userAddress } = req.body;
    const transaction = await this.tokenService.purchaseTokens(req.user.id, tierId, tokensAmount, userAddress);

    res.json({
      success: true,
      data: transaction,
    });
  }

  /**
   * История транзакций
   */
  async getTransactionHistory(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user) throw new Error("Unauthorized");

    const { limit = 20, offset = 0 } = req.query;
    const history = await this.tokenService.getTransactionHistory(req.user.id, Number(limit), Number(offset));

    res.json({
      success: true,
      data: history,
    });
  }
}

export const tokenController = new TokenController();
