import { Turnkey } from "@turnkey/sdk-server";
import { HttpError } from "../../error";
import { ITurnkeyWalletProvider, TurnkeyWallet } from "./index";

/**
 * Провайдер для работы ТОЛЬКО с Turnkey API
 * ОТВЕТСТВЕННОСТЬ: Только создание кошельков и подписание
 */
export class TurnkeyWalletProvider implements ITurnkeyWalletProvider {
  private readonly turnkeyClient: Turnkey;
  private readonly organizationId = process.env.TURNKEY_ORGANIZATION_ID!;

  constructor() {
    if (!process.env.TURNKEY_API_PUBLIC || !process.env.TURNKEY_SECRET || !process.env.TURNKEY_ORGANIZATION_ID) {
      throw new Error("TURNKEY environment variables are required");
    }

    this.turnkeyClient = new Turnkey({
      apiBaseUrl: "https://api.turnkey.com",
      apiPrivateKey: process.env.TURNKEY_SECRET,
      apiPublicKey: process.env.TURNKEY_API_PUBLIC,
      defaultOrganizationId: this.organizationId,
    });
  }

  /**
   * Создает кошелек через Turnkey
   */
  async createManagedWallet(signatureId: string): Promise<TurnkeyWallet> {
    try {
      const response = await this.turnkeyClient.apiClient().createWallet({
        organizationId: this.organizationId,
        walletName: signatureId,
        accounts: [
          {
            curve: "CURVE_SECP256K1",
            pathFormat: "PATH_FORMAT_BIP32",
            path: "m/44'/60'/0'/0/0",
            addressFormat: "ADDRESS_FORMAT_ETHEREUM",
          },
        ],
      });

      console.log(`✅ Turnkey wallet created: ${response.addresses[0]}`);

      return {
        id: response.walletId,
        address: response.addresses[0],
        status: "active",
        createdAt: new Date(),
      };
    } catch (error) {
      console.error("❌ Turnkey wallet creation failed:", error);
      throw new HttpError("Turnkey wallet creation failed", 500);
    }
  }

  /**
   * Подписывает транзакцию через Turnkey (без Viem зависимостей)
   */
  async signTransaction(walletId: string, serializedTransaction: string): Promise<string> {
    try {
      const signResponse = await this.turnkeyClient.apiClient().signTransaction({
        organizationId: this.organizationId,
        signWith: walletId,
        type: "TRANSACTION_TYPE_ETHEREUM",
        unsignedTransaction: serializedTransaction,
      });

      if (!signResponse.signedTransaction) {
        throw new Error("Empty signed transaction received");
      }

      return signResponse.signedTransaction;
    } catch (error) {
      console.error("❌ Turnkey signing failed:", error);
      throw new HttpError("Turnkey signing failed", 500);
    }
  }

  /**
   * Получает адрес кошелька
   */
  async getWalletAddress(walletId: string): Promise<string> {
    try {
      const accountsResponse = await this.turnkeyClient.apiClient().getWalletAccounts({
        organizationId: this.organizationId,
        walletId: walletId,
      });

      if (!accountsResponse.accounts?.[0]?.address) {
        throw new Error("No address found for wallet");
      }

      return accountsResponse.accounts[0].address;
    } catch (error) {
      console.error("❌ Failed to get wallet address:", error);
      throw new HttpError("Failed to get wallet address", 500);
    }
  }

  /**
   * Health check для Turnkey API
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.turnkeyClient.apiClient().getOrganization({
        organizationId: this.organizationId,
      });
      return true;
    } catch (error) {
      console.error("❌ Turnkey health check failed:", error);
      return false;
    }
  }
}
