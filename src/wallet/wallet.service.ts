import { Wallet } from "@prisma/client";
import { parseEther } from "viem";
import { BlockchainService } from "../blockchain/blockchain.service";
import { HttpError, prisma, TurnkeyWalletProvider } from "../common";

/**
 * Wallet management service.
 * Responsibility: Business logic + provider coordination.
 */
export class WalletService {
  private turnkeyProvider = new TurnkeyWalletProvider();
  private blockchainService = new BlockchainService();
  private readonly isTestnet = process.env.NODE_ENV !== "production";

  /**
   * Helper: Get wallet or throw 404.
   */
  async requireWallet(userId: string): Promise<Wallet> {
    const wallet = await prisma.wallet.findUnique({ where: { userId } });
    if (!wallet) throw new HttpError("Wallet not found for user", 404);
    return wallet;
  }

  /**
   * Create wallet via Turnkey.
   */
  async createWalletForUser(userId: string): Promise<string> {
    try {
      const existing = await prisma.wallet.findUnique({ where: { userId } });
      if (existing) return existing.walletAddress;

      if (!(await this.turnkeyProvider.healthCheck())) {
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
   * Get native balance (blockchain only).
   */
  async getWalletBalance(walletAddress: string): Promise<string> {
    return this.blockchainService.getBalance(walletAddress);
  }

  /**
   * Get token balance (blockchain only).
   */
  async getTokenBalance(userId: string, tokenContract: string): Promise<string> {
    const wallet = await this.requireWallet(userId);
    return this.blockchainService.getTokenBalance(wallet.walletAddress, tokenContract);
  }

  /**
   * Get wallet by userId (nullable).
   */
  async getWalletByUserId(userId: string): Promise<Wallet | null> {
    return prisma.wallet.findUnique({ where: { userId } });
  }

  /**
   * Send transaction (Turnkey + Blockchain).
   */
  async sendFromWallet(userId: string, toAddress: string, amount: string): Promise<string> {
    try {
      const wallet = await this.requireWallet(userId);
      const fromAddress = await this.turnkeyProvider.getWalletAddress(wallet.turnkeyWalletId);

      const [nonce, gasPrice, balance] = await Promise.all([
        this.blockchainService.getNonce(fromAddress),
        this.blockchainService.getGasPrice(),
        this.blockchainService.getBalance(fromAddress),
      ]);

      const amountWei = parseEther(amount);
      if (BigInt(balance) < amountWei) throw new HttpError("Insufficient balance", 400);

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
      const signedTx = await this.turnkeyProvider.signTransaction(wallet.turnkeyWalletId, serializedTx);
      return this.blockchainService.broadcastTransaction(signedTx);
    } catch (error) {
      throw error instanceof HttpError ? error : new HttpError("Transaction failed", 500);
    }
  }

  /**
   * Get user's native wallet balance.
   */
  async getUserWalletBalance(userId: string): Promise<string> {
    try {
      const wallet = await this.requireWallet(userId);
      return this.getWalletBalance(wallet.walletAddress);
    } catch (error) {
      console.error(`❌ Failed to get balance for user ${userId}:`, error);
      throw new HttpError("Failed to get user wallet balance", 500);
    }
  }

  /**
   * Get wallet with user info.
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
    if (!wallet) throw new HttpError("Wallet not found", 404);
    return wallet;
  }

  /**
   * Check if user has wallet.
   */
  async hasWallet(userId: string): Promise<boolean> {
    return (await prisma.wallet.count({ where: { userId } })) > 0;
  }
}
