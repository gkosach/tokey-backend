import { Prisma, Wallet } from "@prisma/client";
import { verifySolanaAddress } from "../blockchain/utils/verify-solana-address";
import { prisma } from "../common";
import { WalletError } from "./contract/error/wallet.error";
import { WalletResponse } from "./contract/types/wallet-response.types";

export class WalletService {
  async createWallet(userId: string, address: string): Promise<Wallet> {
    if (!verifySolanaAddress(address)) {
      throw WalletError.invalidAddress();
    }

    try {
      return await prisma.wallet.create({
        data: { userId, address },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") throw WalletError.alreadyExists();
      }
      throw WalletError.databaseError();
    }
  }

  async getWallets(userId: string): Promise<Pick<Wallet, "id" | "address" | "whitelisted">[]> {
    return prisma.wallet.findMany({
      where: { userId },
      select: {
        id: true,
        address: true,
        whitelisted: true,
        userId: true,
      },
    }) as Promise<WalletResponse[]>;
  }
}
