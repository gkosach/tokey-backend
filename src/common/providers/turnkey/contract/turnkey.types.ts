export interface TurnkeyWallet {
  id: string;
  address: string;
  status: string;
  createdAt: Date;
}

export interface ITurnkeyWalletProvider {
  createManagedWallet(signatureId: string): Promise<TurnkeyWallet>;
  signTransaction(walletId: string, transaction: any): Promise<string>;
  getWalletAddress(walletId: string): Promise<string>;
  healthCheck(): Promise<boolean>;
}
