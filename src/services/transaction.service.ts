import { Transaction } from "@prisma/client";

export class TransactionService {
  private mockTransactions: Transaction[] = [
    {
      id: "tx1",
      txHash: "5MS7B...",
      amount: "100",
      fromWallet: "A1b2...",
      toWallet: "C3d4...",
      propertyId: "prop1",
      userId: "user1",
      walletId: "wallet1",
    },
  ];

  async getTransactions(_userId: string): Promise<Transaction[]> {
    return this.mockTransactions;
  }
}
