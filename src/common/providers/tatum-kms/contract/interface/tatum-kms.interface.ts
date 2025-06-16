import { TatumWallet } from "../types/tatum-wallet.types";

/**
 * Интерфейс для Tatum KMS провайдера
 */
export interface ITatumKMSProvider {
  createManagedWallet(userId: string): Promise<TatumWallet>;
  getWalletInfo(signatureId: string): Promise<TatumWallet>;
  healthCheck(): Promise<boolean>;
}
