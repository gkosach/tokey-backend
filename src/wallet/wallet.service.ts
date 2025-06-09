import { KycStatus } from "@prisma/client";
import { prisma } from "../common";
import { WalletError } from "./contract/error/wallet.error";

export class WalletService {
  /**
   * Получает информацию о HSM кошельке пользователя
   * @param userId - Cognito ID пользователя
   * @returns Информация о кошельке
   */
  async getWalletInfo(userId: string): Promise<{
    walletAddress: string;
    isEnabled: boolean;
    kycStatus: KycStatus;
    kycCompletedAt: Date | null;
  }> {
    const user = await prisma.user.findUnique({
      where: { cognitoId: userId },
      select: {
        walletAddress: true,
        kycStatus: true,
        kycCompletedAt: true,
      },
    });

    if (!user) {
      throw WalletError.notFound();
    }

    return {
      walletAddress: user.walletAddress,
      isEnabled: user.kycStatus === KycStatus.COMPLETED,
      kycStatus: user.kycStatus,
      kycCompletedAt: user.kycCompletedAt,
    };
  }

  /**
   * Проверяет, может ли пользователь выполнять операции с кошельком
   * @param userId - Cognito ID пользователя
   * @returns true если KYC завершен
   */
  async isWalletEnabled(userId: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { cognitoId: userId },
      select: { kycStatus: true },
    });

    if (!user) {
      throw WalletError.notFound();
    }

    return user.kycStatus === KycStatus.COMPLETED;
  }

  /**
   * Получает баланс токенов пользователя по всем объектам
   * @param userId - Cognito ID пользователя
   * @returns Балансы по объектам недвижимости
   */
  async getTokenBalances(userId: string) {
    const user = await prisma.user.findUnique({
      where: { cognitoId: userId },
      select: { id: true },
    });

    if (!user) {
      throw WalletError.notFound();
    }

    const transactions = await prisma.transaction.findMany({
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

    // Группируем транзакции по объектам
    const balanceMap = new Map<
      string,
      {
        property: any;
        totalTokens: number;
        transactionCount: number;
      }
    >();

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
   * Покупает токены недвижимости (создает транзакцию)
   * @param userId - Cognito ID пользователя
   * @param propertyId - ID объекта недвижимости
   * @param tokensAmount - Количество токенов
   * @param txHash - Хэш транзакции в блокчейне
   * @returns Созданная транзакция
   */
  async purchaseTokens(userId: string, propertyId: string, tokensAmount: number, txHash: string) {
    // Проверяем, что пользователь существует и KYC завершен
    const user = await prisma.user.findUnique({
      where: { cognitoId: userId },
      select: { id: true, kycStatus: true },
    });

    if (!user) {
      throw WalletError.notFound();
    }

    if (user.kycStatus !== KycStatus.COMPLETED) {
      throw WalletError.notEnabled();
    }

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { availableTokens: true, status: true },
    });

    if (!property) {
      throw WalletError.validationError("Property not found");
    }

    if (property.status !== "ACTIVE") {
      throw WalletError.validationError("Property is not available for purchase");
    }

    if (property.availableTokens < tokensAmount) {
      throw WalletError.validationError("Insufficient tokens available");
    }

    // Создаем транзакцию и обновляем доступные токены
    return prisma.$transaction(async (tx) => {
      // Создаем транзакцию
      const transaction = await tx.transaction.create({
        data: {
          userId: user.id,
          propertyId,
          tokensAmount,
          txHash,
        },
        include: {
          property: {
            select: {
              title: true,
              contractAddress: true,
            },
          },
        },
      });

      // Обновляем доступные токены
      await tx.property.update({
        where: { id: propertyId },
        data: {
          availableTokens: {
            decrement: tokensAmount,
          },
        },
      });

      return transaction;
    });
  }

  /**
   * Получает историю транзакций пользователя
   * @param userId - Cognito ID пользователя
   * @param limit - Количество записей
   * @param offset - Смещение для пагинации
   * @returns История транзакций
   */
  async getTransactionHistory(userId: string, limit: number = 20, offset: number = 0) {
    const user = await prisma.user.findUnique({
      where: { cognitoId: userId },
      select: { id: true },
    });

    if (!user) {
      throw WalletError.notFound();
    }

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
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
      prisma.transaction.count({
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
   * Получает статистику кошелька пользователя
   * @param userId - Cognito ID пользователя
   * @returns Статистика кошелька
   */
  async getWalletStats(userId: string) {
    const user = await prisma.user.findUnique({
      where: { cognitoId: userId },
      select: { id: true, walletAddress: true, kycStatus: true },
    });

    if (!user) {
      throw WalletError.notFound();
    }

    const [totalTransactions, totalTokens, uniqueProperties] = await Promise.all([
      prisma.transaction.count({
        where: { userId: user.id },
      }),
      prisma.transaction.aggregate({
        where: { userId: user.id },
        _sum: { tokensAmount: true },
      }),
      prisma.transaction.groupBy({
        by: ["propertyId"],
        where: { userId: user.id },
        _count: { propertyId: true },
      }),
    ]);

    return {
      walletAddress: user.walletAddress,
      isEnabled: user.kycStatus === KycStatus.COMPLETED,
      totalTransactions,
      totalTokensOwned: totalTokens._sum.tokensAmount || 0,
      uniquePropertiesCount: uniqueProperties.length,
    };
  }
}
