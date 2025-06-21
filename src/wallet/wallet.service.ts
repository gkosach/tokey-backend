import { parseEther } from "viem";
import { BlockchainService } from "../blockchain/blockchain.service";
import { HttpError, prisma, TurnkeyWalletProvider } from "../common";

/**
 * Сервис для управления кошельками
 * ОТВЕТСТВЕННОСТЬ: Бизнес-логика + координация между провайдерами
 */
export class WalletService {
  private turnkeyProvider: TurnkeyWalletProvider;
  private blockchainService: BlockchainService;
  private readonly isTestnet = process.env.NODE_ENV !== "production";

  constructor() {
    this.turnkeyProvider = new TurnkeyWalletProvider();
    this.blockchainService = new BlockchainService();
  }

  /**
   * Создает кошелек через Turnkey
   */
  async createWalletForUser(userId: string): Promise<string> {
    try {
      const existing = await prisma.wallet.findUnique({ where: { userId } });
      if (existing) {
        return existing.walletAddress;
      }

      const isHealthy = await this.turnkeyProvider.healthCheck();
      if (!isHealthy) {
        throw new HttpError("Wallet service is temporarily unavailable", 503);
      }

      const signatureId = `wallet_${userId}_${Date.now()}`;
      const walletData = await this.turnkeyProvider.createManagedWallet(signatureId);

      const wallet = await prisma.wallet.create({
        data: {
          userId,
          turnkeyWalletId: walletData.id,
          walletAddress: walletData.address,
          status: "active",
        },
      });

      console.log(`✅ Wallet created for user ${userId}: ${wallet.walletAddress}`);
      return wallet.walletAddress;
    } catch (error) {
      console.error(`❌ Wallet creation failed for user ${userId}:`, error);
      throw new HttpError("Wallet creation failed", 500);
    }
  }
  /**
   * Получает баланс (только блокчейн)
   */
  async getWalletBalance(walletAddress: string): Promise<string> {
    return await this.blockchainService.getBalance(walletAddress);
  }

  /**
   * Получает баланс токена (только блокчейн)
   */
  async getTokenBalance(userId: string, tokenContract: string): Promise<string> {
    const wallet = await this.getWalletByUserId(userId);
    return await this.blockchainService.getTokenBalance(wallet.walletAddress, tokenContract);
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
      turnkeyWalletId: wallet.turnkeyWalletId,
      status: wallet.status,
      createdAt: wallet.createdAt,
    };
  }

  /**
   * Отправляет транзакцию (координация Turnkey + Blockchain)
   */
  async sendFromWallet(userId: string, toAddress: string, amount: string): Promise<string> {
    try {
      const wallet = await this.getWalletByUserId(userId);
      const fromAddress = await this.turnkeyProvider.getWalletAddress(wallet.turnkeyWalletId!);
      const [nonce, gasPrice, balance] = await Promise.all([
        this.blockchainService.getNonce(fromAddress),
        this.blockchainService.getGasPrice(),
        this.blockchainService.getBalance(fromAddress),
      ]);
      const amountWei = parseEther(amount);
      if (BigInt(balance) < amountWei) {
        throw new HttpError("Insufficient balance", 400);
      }
      const transaction = {
        from: fromAddress as `0x${string}`,
        to: toAddress as `0x${string}`,
        value: amountWei,
        gas: 21000n,
        gasPrice,
        nonce,
        chainId: this.isTestnet ? 80002 : 137,
      };
      await this.blockchainService.simulateTransaction(transaction);
      const serializedTx = this.blockchainService.serializeTransaction(transaction);
      const signedTx = await this.turnkeyProvider.signTransaction(wallet.turnkeyWalletId!, serializedTx);
      return await this.blockchainService.broadcastTransaction(signedTx);
    } catch (error) {
      throw error instanceof HttpError ? error : new HttpError("Transaction failed", 500);
    }
  }
  /**
   * Получает нативный баланс пользователя (удобный метод)
   */
  async getUserWalletBalance(userId: string): Promise<string> {
    try {
      const wallet = await this.getWalletByUserId(userId);
      return await this.getWalletBalance(wallet.walletAddress);
    } catch (error) {
      console.error(`❌ Failed to get balance for user ${userId}:`, error);
      throw new HttpError("Failed to get user wallet balance", 500);
    }
  }

  /**
   * Получает кошелек с информацией о пользователе
   */
  async getWalletWithUser(userId: string) {
    const wallet = await prisma.wallet.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            kycStatus: true,
          },
        },
      },
    });

    if (!wallet) {
      throw new HttpError("Wallet not found", 404);
    }

    return wallet;
  }

  /**
   * Проверяет существование кошелька у пользователя
   */
  async hasWallet(userId: string): Promise<boolean> {
    const count = await prisma.wallet.count({
      where: { userId },
    });
    return count > 0;
  }
}
