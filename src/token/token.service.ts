import { PropertyStatus } from "@prisma/client";
import { prisma, TokenError } from "../common";

export class TokenService {
  /**
   * Получает балансы токенов пользователя
   */
  async getUserTokenBalances(cognitoId: string) {
    const user = await prisma.user.findUnique({
      where: { cognitoId },
      select: { id: true },
    });

    if (!user) {
      throw TokenError.userNotFound();
    }

    const transactions = await prisma.tokenTransaction.findMany({
      where: { userId: user.id },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            contractAddress: true,
            district: true,
          },
        },
      },
    });

    const balanceMap = new Map();

    transactions.forEach((tx) => {
      const existing = balanceMap.get(tx.propertyId);
      if (existing) {
        existing.totalTokens += tx.tokensAmount;
        existing.transactionCount += 1;
      } else {
        balanceMap.set(tx.propertyId, {
          property: tx.property,
          totalTokens: tx.tokensAmount,
          transactionCount: 1,
        });
      }
    });

    return Array.from(balanceMap.values());
  }

  /**
   * Получает транзакции по недвижимости
   */
  async getPropertyTransactions(propertyId: string) {
    return prisma.tokenTransaction.findMany({
      where: { propertyId },
      include: {
        user: {
          select: { id: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Получает историю транзакций пользователя (ЕДИНСТВЕННЫЙ метод)
   */
  async getTransactionHistory(cognitoId: string, limit: number = 20, offset: number = 0) {
    const user = await prisma.user.findUnique({
      where: { cognitoId },
      select: { id: true },
    });

    if (!user) {
      throw TokenError.userNotFound();
    }

    const [transactions, total] = await Promise.all([
      prisma.tokenTransaction.findMany({
        where: { userId: user.id },
        include: {
          property: {
            select: {
              title: true,
              contractAddress: true,
              district: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.tokenTransaction.count({
        where: { userId: user.id },
      }),
    ]);

    return {
      transactions,
      total,
      hasMore: offset + limit < total,
    };
  }

  /**
   * Обновляет доступные токены после покупки
   */
  async updateAvailableTokens(propertyId: string, purchasedTokens: number) {
    return prisma.$transaction(async (tx) => {
      const property = await tx.property.findUnique({
        where: { id: propertyId },
      });

      if (!property || property.availableTokens < purchasedTokens) {
        throw TokenError.insufficientTokens();
      }

      return tx.property.update({
        where: { id: propertyId },
        data: {
          availableTokens: { decrement: purchasedTokens },
          status: property.availableTokens - purchasedTokens === 0 ? PropertyStatus.SOLD_OUT : property.status,
        },
      });
    });
  }

  /**
   * Покупает токены недвижимости
   */
  async purchaseTokens(cognitoId: string, propertyId: string, tokensAmount: number, paymentData: any) {
    const user = await prisma.user.findUnique({
      where: { cognitoId },
      select: { id: true, kycStatus: true, wallet: true },
    });

    if (!user || !user.wallet) {
      throw TokenError.userNotFound();
    }

    if (user.kycStatus !== "COMPLETED") {
      throw TokenError.kycRequired();
    }

    // TODO: Интеграция с Tatum для подписания транзакции
    const txHash = `0x${Math.random().toString(16).substring(2, 66).padStart(64, "0")}`;

    return prisma.$transaction(async (tx) => {
      const transaction = await tx.tokenTransaction.create({
        data: {
          userId: user.id,
          propertyId,
          tokensAmount,
          txHash,
          fromAddress: "0x0000000000000000000000000000000000000000",
          toAddress: user.wallet!.walletAddress,
          paymentAmount: paymentData.amount,
          paymentCurrency: paymentData.currency,
          transactionType: "PURCHASE",
        },
      });

      await tx.property.update({
        where: { id: propertyId },
        data: {
          availableTokens: { decrement: tokensAmount },
        },
      });

      return transaction;
    });
  }

  /**
   * Статистика по токенам недвижимости
   */
  async getPropertyTokenStats(propertyId: string) {
    const transactions = await prisma.tokenTransaction.findMany({
      where: { propertyId },
      select: { tokensAmount: true, createdAt: true },
    });

    const totalSold = transactions.reduce((sum, tx) => sum + tx.tokensAmount, 0);

    const uniqueInvestors = await prisma.tokenTransaction.groupBy({
      by: ["userId"],
      where: { propertyId },
      _count: { userId: true },
    });

    return {
      totalTokensSold: totalSold,
      totalInvestors: uniqueInvestors.length,
      recentTransactions: transactions.slice(0, 10),
    };
  }
}
