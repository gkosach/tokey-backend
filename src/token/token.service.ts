import { PropertyStatus } from "@prisma/client";
import { HttpError, prisma } from "../common";
import { PropertyService } from "../property/property.service";
import { UserService } from "../user/user.service";

/**
 * Сервис для управления токенами недвижимости
 *
 * ОТВЕТСТВЕННОСТЬ:
 * - Расчет балансов токенов пользователей по всем Property
 * - Обработка покупки токенов и создание транзакций
 * - Получение истории транзакций и статистики
 * - Обновление доступных токенов в Property
 */
export class TokenService {
  private userService: UserService;
  private propertyService: PropertyService;

  constructor() {
    this.userService = new UserService();
    this.propertyService = new PropertyService();
  }

  /**
   * Получает балансы токенов пользователя по всем Property
   * Каждая Property = отдельный смарт-контракт
   */
  async getUserTokenBalances(cognitoId: string) {
    const user = await prisma.user.findUnique({
      where: { cognitoId },
      select: { id: true },
    });

    if (!user) {
      throw new HttpError("User not found", 404);
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
            type: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const balanceMap = new Map();

    transactions.forEach((tx) => {
      const existing = balanceMap.get(tx.propertyId);
      if (existing) {
        existing.totalTokens += tx.tokensAmount;
        existing.transactionCount += 1;
        existing.transactions.push({
          id: tx.id,
          tokensAmount: tx.tokensAmount,
          txHash: tx.txHash,
          createdAt: tx.createdAt,
          transactionType: tx.transactionType,
        });
      } else {
        balanceMap.set(tx.propertyId, {
          property: tx.property,
          totalTokens: tx.tokensAmount,
          transactionCount: 1,
          transactions: [
            {
              id: tx.id,
              tokensAmount: tx.tokensAmount,
              txHash: tx.txHash,
              createdAt: tx.createdAt,
              transactionType: tx.transactionType,
            },
          ],
        });
      }
    });

    return Array.from(balanceMap.values());
  }

  /**
   * Получает транзакции по конкретной недвижимости
   */
  async getPropertyTransactions(propertyId: string) {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { id: true },
    });

    if (!property) {
      throw new HttpError("Property not found", 404);
    }

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
   * Получает историю транзакций пользователя (ledger)
   */
  async getTransactionHistory(cognitoId: string, limit: number = 20, offset: number = 0) {
    const user = await prisma.user.findUnique({
      where: { cognitoId },
      select: { id: true },
    });

    if (!user) {
      throw new HttpError("User not found", 404);
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

      if (!property) {
        throw new HttpError("Property not found", 404);
      }

      if (property.availableTokens < purchasedTokens) {
        throw new HttpError("Insufficient tokens available", 400);
      }

      const newAvailableTokens = property.availableTokens - purchasedTokens;
      const newStatus = newAvailableTokens === 0 ? PropertyStatus.SOLD_OUT : property.status;

      return tx.property.update({
        where: { id: propertyId },
        data: {
          availableTokens: newAvailableTokens,
          status: newStatus,
        },
      });
    });
  }

  /**
   * Покупает токены недвижимости (упрощенная версия)
   */
  async purchaseTokens(
    cognitoId: string,
    propertyId: string,
    tokensAmount: number,
    paymentData: { amount: number; currency: string },
  ) {
    const user = await this.userService.validateUserForPurchase(cognitoId);
    const property = await this.propertyService.validatePropertyForPurchase(propertyId, tokensAmount);
    const txHash = this.generateTxHash();
    return prisma.$transaction(async (tx) => {
      const transaction = await tx.tokenTransaction.create({
        data: {
          userId: user.id,
          propertyId,
          tokensAmount,
          txHash,
          fromAddress: "0x0000000000000000000000000000000000000000",
          toAddress: user.wallet.walletAddress,
          paymentAmount: paymentData.amount,
          paymentCurrency: paymentData.currency,
          transactionType: "PURCHASE",
        },
      });

      await tx.property.update({
        where: { id: propertyId },
        data: {
          availableTokens: { decrement: tokensAmount },
          status: property.availableTokens - tokensAmount === 0 ? PropertyStatus.SOLD_OUT : property.status,
        },
      });

      return transaction;
    });
  }

  /**
   * Генерирует хеш транзакции (временная заглушка)
   */
  generateTxHash(): string {
    return `0x${Math.random().toString(16).substring(2, 66).padStart(64, "0")}`;
  }

  /**
   * В будущем здесь будет интеграция с Tatum
   */
  async executeBlockchainTransaction(
    fromAddress: string,
    toAddress: string,
    tokensAmount: number,
    contractAddress: string,
  ): Promise<string> {
    // TODO: Интеграция с Tatum для реальной блокчейн транзакции
    return this.generateTxHash();
  }

  /**
   * Статистика по токенам недвижимости
   */
  async getPropertyTokenStats(propertyId: string) {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { id: true },
    });

    if (!property) {
      throw new HttpError("Property not found", 404);
    }

    const transactions = await prisma.tokenTransaction.findMany({
      where: { propertyId },
      select: {
        tokensAmount: true,
        createdAt: true,
        paymentAmount: true,
        paymentCurrency: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const totalSold = transactions.reduce((sum, tx) => sum + tx.tokensAmount, 0);
    const totalVolume = transactions.reduce((sum, tx) => sum + tx.paymentAmount, 0);

    const uniqueInvestors = await prisma.tokenTransaction.groupBy({
      by: ["userId"],
      where: { propertyId },
      _count: { userId: true },
    });

    return {
      totalTokensSold: totalSold,
      totalInvestors: uniqueInvestors.length,
      totalVolume,
      recentTransactions: transactions.slice(0, 10),
    };
  }
}
