  import { prisma, WalletError } from "../common";
  import { TatumKMSProvider } from "../common/providers/tatum-kms/tatum-kms.provider";

  export class WalletService {
    private tatumProvider: TatumKMSProvider;

    constructor() {
      this.tatumProvider = new TatumKMSProvider();
    }

    /**
     * Создает кошелек
     */
    async createWalletForUser(userId: string): Promise<string> {
      try {
        const existing = await prisma.wallet.findUnique({ where: { userId } });
        if (existing) {
          console.log(`⏭️ User ${userId} already has wallet: ${existing.walletAddress}`);
          return existing.walletAddress;
        }

        const isHealthy = await this.tatumProvider.healthCheck();
        if (!isHealthy) {
          throw new Error("KMS service is not available");
        }

        const walletData = await this.tatumProvider.createManagedWallet(userId);

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
        throw WalletError.transactionFailed("Wallet creation failed");
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
        throw WalletError.notFound();
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
      return await this.tatumProvider.getWalletBalance(walletAddress);
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
