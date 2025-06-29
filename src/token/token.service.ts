import { PropertyTier } from "@prisma/client";
import { HttpError, prisma } from "../common";
import { UserService } from "../user/user.service";

export class TokenService {
  private userService = new UserService();

  /**
   * Получает балансы токенов пользователя
   */
  async getUserTokenBalances(userId: string) {
    const transactions = await prisma.tokenTransaction.findMany({
      where: { userId },
      include: {
        tier: {
          include: {
            property: {
              select: {
                id: true,
                title: true,
                contractAddress: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const balanceMap = new Map<
      string,
      {
        tier: PropertyTier;
        property: any;
        totalTokens: number;
        transactions: any[];
      }
    >();

    transactions.forEach((tx) => {
      const key = tx.tierId;
      if (!balanceMap.has(key)) {
        balanceMap.set(key, {
          tier: tx.tier,
          property: tx.tier.property,
          totalTokens: 0,
          transactions: [],
        });
      }
      const entry = balanceMap.get(key)!;
      entry.totalTokens += tx.tokensAmount;
      entry.transactions.push({
        id: tx.id,
        tokensAmount: tx.tokensAmount,
        createdAt: tx.createdAt,
      });
    });

    return Array.from(balanceMap.values());
  }

  /**
   * Покупка токенов
   */
  async purchaseTokens(userId: string, tierId: string, tokensAmount: number, userAddress: string) {
    // Проверка пользователя
    await this.userService.validateUserForPurchase(userId);

    // Получаем уровень
    const tier = await prisma.propertyTier.findUnique({
      where: { id: tierId },
      include: { property: true },
    });
    if (!tier) {
      throw new HttpError("Tier not found", 404);
    }

    // Проверка доступности токенов
    const sold = await prisma.tokenTransaction.aggregate({
      where: { tierId },
      _sum: { tokensAmount: true },
    });
    const available = tier.totalSupply - (sold._sum.tokensAmount || 0);
    if (available < tokensAmount) {
      throw new HttpError("Insufficient tokens available", 400);
    }

    // Создаем транзакцию
    return prisma.tokenTransaction.create({
      data: {
        userId,
        tierId,
        tokensAmount,
        userAddress,
        contractAddress: tier.property.contractAddress,
        paymentAmount: tier.price * tokensAmount,
        txHash: this.generateTxHash(),
      },
    });
  }

  /**
   * История транзакций
   */
  async getTransactionHistory(userId: string, limit: number, offset: number) {
    const [transactions, total] = await Promise.all([
      prisma.tokenTransaction.findMany({
        where: { userId },
        include: {
          tier: {
            include: {
              property: {
                select: {
                  title: true,
                  contractAddress: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.tokenTransaction.count({ where: { userId } }),
    ]);

    return {
      transactions,
      total,
      hasMore: offset + limit < total,
    };
  }

  /**
   * Генерирует хеш транзакции (заглушка)
   */
  private generateTxHash(): string {
    return `0x${Math.random().toString(16).substring(2, 66).padStart(64, "0")}`;
  }
}
