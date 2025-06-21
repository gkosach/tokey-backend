import { Response } from "express";
import { AuthRequest, HttpError } from "../common";
import { UserService } from "../user/user.service";
import { WalletService } from "./wallet.service";

export class WalletController {
  private walletService: WalletService;
  private userService: UserService;

  constructor() {
    this.walletService = new WalletService();
    this.userService = new UserService();
  }

  /**
   * Создает кошелек (использует пользователя из KYC middleware)
   */
  async createWallet(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user?.dbUser) {
      throw new HttpError("User not found after KYC verification", 404);
    }

    // ✅ Используем уже полученного пользователя из middleware
    const walletAddress = await this.walletService.createWalletForUser(req.user.dbUser.id);

    res.status(201).json({
      success: true,
      data: { walletAddress },
      message: "Wallet created successfully",
    });
  }

  /**
   * Получает информацию только о кошельке
   */
  async getWalletInfo(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user) {
      throw new HttpError("Unauthorized", 401);
    }

    // ✅ Этот endpoint не требует KYC, поэтому получаем пользователя здесь
    const user = await this.userService.getUserByCognitoId(req.user.id);
    const wallet = await this.walletService.getWalletByUserId(user.id);

    res.json({
      success: true,
      data: wallet,
    });
  }

  /**
   * Получает баланс кошелька (использует пользователя из KYC middleware)
   */
  async getWalletBalance(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user?.dbUser) {
      throw new HttpError("User not found after KYC verification", 404);
    }

    // ✅ Используем уже полученного пользователя из middleware
    const wallet = await this.walletService.getWalletByUserId(req.user.dbUser.id);
    const balance = await this.walletService.getWalletBalance(wallet.walletAddress);

    res.json({
      success: true,
      data: { balance },
    });
  }
}

export const walletController = new WalletController();
