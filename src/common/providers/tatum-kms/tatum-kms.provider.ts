import axios from "axios";
import crypto from "crypto";
import { TATUM_API_URL } from "../../constants";
import { TatumError } from "../../error";
import { ITatumKMSProvider, TatumWallet } from "./index";

/**
 * Провайдер для работы с Tatum KMS API
 */
export class TatumKMSProvider implements ITatumKMSProvider {
  private readonly tatumApiUrl = TATUM_API_URL;
  private readonly apiKey = process.env.TATUM_API_KEY;
  private readonly testnet = process.env.NODE_ENV !== "production";

  constructor() {
    if (!this.apiKey && process.env.NODE_ENV === "production") {
      throw new Error("TATUM_API_KEY environment variable is required in production");
    }
  }

  /**
   * Создает managed wallet через Tatum KMS
   */
  async createManagedWallet(userId: string): Promise<TatumWallet> {
    try {
      console.log(`🔑 Creating KMS wallet for user ${userId}...`);

      if (process.env.NODE_ENV === "development" || !this.apiKey) {
        return this.createMockWallet(userId);
      }
      const response = await axios.post(
        `${this.tatumApiUrl}/polygon/wallet/managed`,
        {
          mnemonic: undefined,
        },
        {
          headers: {
            "x-api-key": this.apiKey,
            "Content-Type": "application/json",
          },
          timeout: 30000,
        },
      );

      const { signatureId, address } = response.data;

      console.log(`✅ KMS wallet created for user ${userId}: ${address}`);

      return {
        signatureId,
        address,
        status: "active",
        createdAt: new Date(),
      };
    } catch (error) {
      console.error("❌ KMS wallet creation failed:", error);

      if (process.env.NODE_ENV === "development") {
        console.log("🧪 Falling back to mock wallet creation");
        return this.createMockWallet(userId);
      }

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || error.message;
        throw TatumError.walletCreationFailed(`KMS API error: ${message}`);
      }

      throw TatumError.walletCreationFailed("Unknown KMS error");
    }
  }

  /**
   * Создает mock кошелек для разработки
   */
  private createMockWallet(userId: string): TatumWallet {
    const hash = crypto.createHash("sha256").update(userId).digest("hex");
    const address = `0x${hash.substring(0, 40)}`;
    const signatureId = `mock_${userId}_${Date.now()}`;

    console.log(`🧪 Mock wallet created for user ${userId}: ${address}`);

    return {
      signatureId,
      address,
      status: "active",
      createdAt: new Date(),
    };
  }

  /**
   * Получает адрес кошелька по signatureId
   */
  private async getWalletAddress(signatureId: string): Promise<{ address: string }> {
    if (process.env.NODE_ENV === "development" || !this.apiKey) {
      const hash = crypto.createHash("sha256").update(signatureId).digest("hex");
      return { address: `0x${hash.substring(0, 40)}` };
    }

    try {
      const response = await axios.get(`${this.tatumApiUrl}/kms/${signatureId}`, {
        headers: {
          "x-api-key": this.apiKey,
        },
      });

      return response.data;
    } catch (error) {
      console.error("❌ Failed to get wallet address:", error);
      throw new Error("Failed to retrieve wallet address from KMS");
    }
  }

  /**
   * Получает информацию о кошельке из KMS
   */
  async getWalletInfo(signatureId: string): Promise<TatumWallet> {
    if (process.env.NODE_ENV === "development" || !this.apiKey) {
      const hash = crypto.createHash("sha256").update(signatureId).digest("hex");
      return {
        signatureId,
        address: `0x${hash.substring(0, 40)}`,
        status: "active",
        createdAt: new Date(),
      };
    }

    try {
      const response = await axios.get(`${this.tatumApiUrl}/kms/${signatureId}`, {
        headers: {
          "x-api-key": this.apiKey,
        },
      });

      return {
        signatureId,
        address: response.data.address,
        status: "active",
        createdAt: new Date(response.data.createdAt || Date.now()),
      };
    } catch (error) {
      console.error("❌ Failed to get wallet info:", error);
      throw TatumError.walletCreationFailed("Failed to get wallet info from KMS");
    }
  }

  /**
   * Проверка доступности KMS API
   */
  async healthCheck(): Promise<boolean> {
    // В development режиме всегда возвращаем true
    if (process.env.NODE_ENV === "development") {
      console.log("🧪 Mock health check - always healthy in development");
      return true;
    }

    if (!this.apiKey) {
      return false;
    }

    try {
      const response = await axios.get(`${this.tatumApiUrl}/tatum/version`, {
        headers: {
          "x-api-key": this.apiKey,
        },
        timeout: 5000,
      });

      return response.status === 200;
    } catch (error) {
      console.error("❌ KMS health check failed:", error);
      return false;
    }
  }

  /**
   * Получает баланс кошелька
   */
  async getWalletBalance(address: string): Promise<string> {
    if (process.env.NODE_ENV === "development" || !this.apiKey) {
      console.log(`🧪 Mock balance for ${address}: `);
      return "0x16345785d8a0000";
    }

    try {
      const response = await axios.post(
        "https://polygon-mumbai.gateway.tatum.io/",
        {
          jsonrpc: "2.0",
          method: "eth_getBalance",
          params: [address, "latest"],
          id: 1,
        },
        {
          headers: {
            "x-api-key": this.apiKey,
            "Content-Type": "application/json",
          },
        },
      );

      return response.data.result;
    } catch (error) {
      console.error("❌ Failed to get balance:", error);
      throw new Error("Failed to get wallet balance");
    }
  }
}
