import { BlockchainService } from "../blockchain/blockchain.service";

/**
 * Сервис для работы с кошельками (только чтение)
 */
export class WalletService {
  private blockchainService = new BlockchainService();

  /**
   * Получает баланс кошелька в сети
   */
  async getWalletBalance(walletAddress: string): Promise<string> {
    return this.blockchainService.getBalance(walletAddress);
  }

  /**
   * Получает баланс токена для кошелька
   */
  async getTokenBalance(walletAddress: string, tokenContract: string): Promise<string> {
    return this.blockchainService.getTokenBalance(walletAddress, tokenContract);
  }
}
