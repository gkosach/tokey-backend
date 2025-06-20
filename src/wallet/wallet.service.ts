import { HttpError, prisma } from "../common";
import { TatumKMSProvider } from "../common/providers/tatum-kms/tatum-kms.provider";

/**
 * Сервис для управления кошельками пользователей
 *
 * ОТВЕТСТВЕННОСТЬ:
 * - CRUD операции с кошельками в базе данных
 * - Интеграция с Tatum KMS для создания кошельков
 * - Получение балансов через Tatum API
 *
 * ГРАНИЦЫ:
 * ✅ Создание и управление кошельками
 * ✅ Интеграция с Tatum KMS провайдером
 * ✅ Проверка существования кошельков
 * ❌ Бизнес-логика KYC (должна быть в KycService)
 * ❌ Управление пользователями (должно быть в UserService)
 */
export class WalletService {
  private tatumProvider: TatumKMSProvider;

  constructor() {
    this.tatumProvider = new TatumKMSProvider();
  }

  /**
   * Создает кошелек для пользователя
   */
  async createWalletForUser(userId: string): Promise<string> {
    try {
      // Проверяем существующий кошелек
      const existing = await prisma.wallet.findUnique({ where: { userId } });
      if (existing) {
        console.log(`⏭️ User ${userId} already has wallet: ${existing.walletAddress}`);
        return existing.walletAddress;
      }

      // Проверяем доступность KMS
      const isHealthy = await this.tatumProvider.healthCheck();
      if (!isHealthy) {
        throw new HttpError("KMS service is not available", 503);
      }

      // Создаем кошелек в Tatum
      const walletData = await this.tatumProvider.createManagedWallet(userId);

      // Сохраняем в БД
      const wallet = await prisma.wallet.create({
        data: {
          userId,
          tatumWalletId: walletData.signatureId,
          walletAddress: walletData.address,
          status: "active",
        },
      });

      console.log(`✅ KMS wallet created for user ${userId}: ${wallet.walletAddress}`);
      return wallet.walletAddress;
    } catch (error) {
      console.error(`❌ Wallet creation failed for user ${userId}:`, error);

      // Если это уже HttpError, пробрасываем как есть
      if (error instanceof HttpError) {
        throw error;
      }

      // Иначе оборачиваем в HttpError
      throw new HttpError("Wallet creation failed", 500);
    }
  }

  /**
   * Получает кошелек по userId
   */
  async getWalletByUserId(userId: string) {
    const wallet = await prisma.wallet.findUnique({
      where: { userId },
    });

    if (!wallet) {
      throw new HttpError("Wallet not found", 404);
    }

    return {
      walletAddress: wallet.walletAddress,
      tatumWalletId: wallet.tatumWalletId,
      status: wallet.status,
      createdAt: wallet.createdAt,
    };
  }

  /**
   * Получает баланс кошелька по адресу
   */
  async getWalletBalance(walletAddress: string): Promise<string> {
    try {
      return await this.tatumProvider.getWalletBalance(walletAddress);
    } catch (error) {
      console.error(`❌ Failed to get balance for wallet ${walletAddress}:`, error);
      throw new HttpError("Failed to get wallet balance", 500);
    }
  }

  /**
   * Проверяет существование кошелька
   */
  async hasWallet(userId: string): Promise<boolean> {
    const wallet = await prisma.wallet.findUnique({
      where: { userId },
      select: { userId: true },
    });
    return !!wallet;
  }
}
