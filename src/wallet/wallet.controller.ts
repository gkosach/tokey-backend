import { Response } from "express";
import { AuthRequest } from "../common";
import { KycService } from "../kyc/kyc.service";
import { UserService } from "../user/user.service";
import { WalletService } from "./wallet.service";

export class WalletController {
  private kycService: KycService;
  private walletService: WalletService;
  private userService: UserService;

  constructor() {
    this.kycService = new KycService();
    this.walletService = new WalletService();
    this.userService = new UserService();
  }

  /**
   * Создает кошелек
   */
  async createWallet(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user) throw new Error("Unauthorized");

    const user = await this.userService.getUserByCognitoId(req.user.id);
    const walletAddress = await this.walletService.createWalletForUser(user.id);

    res.status(201).json({
      success: true,
      data: { walletAddress },
      message: "Wallet created successfully",
    });
  }

  /**
   * Получает полный профиль пользователя (KYC + Wallet)
   */
  async getUserProfile(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user) throw new Error("Unauthorized");

    // req.user.id содержит cognitoId, используем его везде последовательно
    const user = await this.userService.getUserByCognitoId(req.user.id);
    const kycDetails = await this.kycService.getKycDetails(req.user.id);

    const hasWallet = await this.walletService.hasWallet(user.id);

    let walletInfo = null;
    if (hasWallet) {
      walletInfo = await this.walletService.getWalletByUserId(user.id);
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
        },
        kyc: kycDetails,
        wallet: walletInfo,
        canCreateWallet: kycDetails.walletEnabled && !hasWallet,
      },
    });
  }

  /**
   * Получает информацию только о кошельке
   */
  async getWalletInfo(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user) throw new Error("Unauthorized");

    const user = await this.userService.getUserByCognitoId(req.user.id);
    const wallet = await this.walletService.getWalletByUserId(user.id);

    res.json({
      success: true,
      data: wallet,
    });
  }

  /**
   * Получает баланс кошелька
   */
  async getWalletBalance(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user) throw new Error("Unauthorized");

    const canPerformOperations = await this.kycService.canPerformOperations(req.user.id);
    if (!canPerformOperations) {
      throw new Error("KYC verification required for balance operations");
    }

    const user = await this.userService.getUserByCognitoId(req.user.id);
    const wallet = await this.walletService.getWalletByUserId(user.id);
    const balance = await this.walletService.getWalletBalance(wallet.walletAddress);

    res.json({
      success: true,
      data: { balance },
    });
  }
}

export const walletController = new WalletController();
