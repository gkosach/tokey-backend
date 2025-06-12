import { KycStatus } from "@prisma/client";
import { prisma, WalletError } from "../common";

export class WalletService {
  /**
   * Создает кошелек через Tatum KMS
   */
  async createWalletForUser(userId: string): Promise<string> {
    const tatumWallet = await this.generateTatumWallet();

    await prisma.wallet.create({
      data: {
        userId,
        tatumWalletId: tatumWallet.signatureId,
        walletAddress: tatumWallet.address,
        status: "active",
      },
    });

    return tatumWallet.address;
  }

  /**
   * Получает кошелек пользователя по Cognito ID
   */
  async getWalletByUserId(cognitoId: string) {
    const user = await prisma.user.findUnique({
      where: { cognitoId },
      include: { wallet: true },
    });

    if (!user || !user.wallet) {
      throw WalletError.notFound();
    }

    return {
      walletAddress: user.wallet.walletAddress, // ✅ ИСПРАВЛЕНО: используем walletAddress
      tatumWalletId: user.wallet.tatumWalletId,
      status: user.wallet.status,
      isEnabled: user.kycStatus === KycStatus.COMPLETED,
      kycStatus: user.kycStatus,
    };
  }

  /**
   * Проверяет статус кошелька
   */
  async checkWalletStatus(cognitoId: string) {
    const user = await prisma.user.findUnique({
      where: { cognitoId },
      select: { kycStatus: true, wallet: true },
    });

    if (!user) {
      throw WalletError.notFound();
    }

    return {
      hasWallet: !!user.wallet,
      isEnabled: user.kycStatus === KycStatus.COMPLETED,
      kycStatus: user.kycStatus,
      walletAddress: user.wallet?.walletAddress || null,
    };
  }

  /**
   * Генерирует кошелек через Tatum KMS
   */
  private async generateTatumWallet(): Promise<{ signatureId: string; address: string }> {
    // TODO: Реальная интеграция с Tatum KMS
    // const result = await tatumKms.generatemanagedwallet('MATIC');

    // Временная заглушка
    return {
      signatureId: `tatum_${Date.now()}`,
      address: `0x${Math.random().toString(16).substring(2, 42).padStart(40, "0")}`,
    };
  }
}
