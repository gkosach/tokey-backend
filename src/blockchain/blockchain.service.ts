import { createPublicClient, http, serializeTransaction as viemSerializeTransaction } from "viem";
import { polygon, polygonAmoy } from "viem/chains";
import { HttpError, POLYGON_RPC_URLS } from "../common";

/**
 * Сервис для работы с блокчейном
 * ОТВЕТСТВЕННОСТЬ: Только RPC вызовы к блокчейну
 */
export class BlockchainService {
  private readonly isTestnet = process.env.NODE_ENV !== "production";

  /**
   * Создает публичный клиент для чтения блокчейна
   */
  private getPublicClient() {
    const chain = this.isTestnet ? polygonAmoy : polygon;
    return createPublicClient({
      chain,
      transport: http(this.isTestnet ? POLYGON_RPC_URLS.TESTNET : POLYGON_RPC_URLS.MAINNET),
    });
  }

  /**
   * Получает баланс MATIC по адресу
   */
  async getBalance(address: string): Promise<string> {
    try {
      const publicClient = this.getPublicClient();
      const balance = await publicClient.getBalance({
        address: address as `0x${string}`,
      });

      console.log(`💰 Balance for ${address}: ${balance.toString()} wei`);
      return balance.toString();
    } catch (error: any) {
      console.error("❌ Failed to get balance:", error);
      throw new HttpError("Failed to get balance", 500);
    }
  }

  /**
   * Получает баланс ERC-20 токена
   */
  async getTokenBalance(address: string, tokenContract: string): Promise<string> {
    try {
      const publicClient = this.getPublicClient();
      const balance = (await publicClient.readContract({
        address: tokenContract as `0x${string}`,
        abi: [
          {
            constant: true,
            inputs: [{ name: "_owner", type: "address" }],
            name: "balanceOf",
            outputs: [{ name: "balance", type: "uint256" }],
            type: "function",
          },
        ],
        functionName: "balanceOf",
        args: [address as `0x${string}`],
      })) as bigint;

      console.log(`🪙 Token balance for ${address}: ${balance.toString()}`);
      return balance.toString();
    } catch (error: any) {
      console.error("❌ Failed to get token balance:", error);
      throw new HttpError("Failed to get token balance", 500);
    }
  }

  /**
   * Получает nonce для адреса
   */
  async getNonce(address: string): Promise<number> {
    try {
      const publicClient = this.getPublicClient();
      return await publicClient.getTransactionCount({
        address: address as `0x${string}`,
      });
    } catch (error: any) {
      console.error("❌ Failed to get nonce:", error);
      return 0;
    }
  }

  /**
   * Получает gas price
   */
  async getGasPrice(): Promise<bigint> {
    try {
      const publicClient = this.getPublicClient();
      return await publicClient.getGasPrice();
    } catch (error: any) {
      // ✅ Исправлено: добавлен тип error
      console.error("❌ Failed to get gas price:", error);
      return BigInt("0x4a817c800");
    }
  }

  /**
   * Симулирует транзакцию перед отправкой
   */
  async simulateTransaction(transaction: any): Promise<void> {
    try {
      const publicClient = this.getPublicClient();
      await publicClient.call({
        account: transaction.from,
        to: transaction.to,
        value: transaction.value,
        gas: transaction.gas,
        gasPrice: transaction.gasPrice,
      });
    } catch (error: any) {
      throw new HttpError(`Transaction simulation failed: ${error.message}`, 400);
    }
  }

  /**
   * Сериализует транзакцию для Turnkey
   */
  serializeTransaction(transaction: any): string {
    return viemSerializeTransaction(transaction);
  }

  /**
   * Отправляет через Viem (более надежно чем fetch)
   */
  async broadcastTransaction(signedTransaction: string): Promise<string> {
    try {
      const publicClient = this.getPublicClient();
      return await publicClient.sendRawTransaction({
        serializedTransaction: signedTransaction as `0x${string}`,
      });
    } catch (error: any) {
      console.error("❌ Failed to broadcast transaction:", error);
      throw new HttpError("Failed to broadcast transaction", 500);
    }
  }
}
