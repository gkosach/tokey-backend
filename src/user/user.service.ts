import { KycStatus, Prisma, User } from "@prisma/client";
import { prisma } from "../common";
import { UserError } from "./contract/error/user.error";

/** Тип пользователя с транзакциями для детальной информации */
type UserWithTransactions = Prisma.UserGetPayload<{
  include: {
    transactions: {
      include: {
        property: true;
      };
    };
  };
}>;

export class UserService {
  /**
   * Получает пользователя по Cognito ID
   * @param cognitoId - Уникальный идентификатор пользователя в Cognito
   * @returns Пользователь с транзакциями
   * @throws {UserError} NOT_FOUND - Если пользователь не найден
   * @throws {UserError} DATABASE_ERROR - При ошибках базы данных
   */
  async getUserByCognitoId(cognitoId: string): Promise<UserWithTransactions> {
    try {
      return await prisma.user.findUniqueOrThrow({
        where: { cognitoId },
        include: {
          transactions: {
            include: { property: true },
            orderBy: { createdAt: "desc" },
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        throw UserError.notFound();
      }
      throw UserError.databaseError("User lookup failed");
    }
  }

  /**
   * Создает нового пользователя с автоматически генерируемым HSM кошельком
   * @param data - Данные пользователя из Cognito
   * @returns Созданный пользователь
   */
  async createUser(data: { cognitoId: string; email: string }): Promise<User> {
    try {
      // TODO: Интеграция с HSM для генерации walletAddress
      const walletAddress = await this.generateHSMWallet();

      return await prisma.user.upsert({
        where: { cognitoId: data.cognitoId },
        create: {
          cognitoId: data.cognitoId,
          email: data.email,
          walletAddress,
          kycStatus: KycStatus.PENDING,
        },
        update: {},
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.error("[Prisma Error]", error.meta);
        if (error.code === "P2002") {
          throw UserError.conflict(`User with email ${data.email} already exists`);
        }
        throw UserError.databaseError("User creation failed");
      }
      throw error;
    }
  }

  /**
   * Инициирует процесс KYC-верификации через Persona
   * @param cognitoId - Идентификатор пользователя в Cognito
   * @param personaVerificationId - ID верификации из Persona
   * @returns Обновленный пользователь со статусом KYC PENDING
   */
  async initiateKycVerification(cognitoId: string, personaVerificationId: string): Promise<User> {
    return prisma.user.update({
      where: { cognitoId },
      data: {
        kycStatus: KycStatus.PENDING,
        kycProviderId: personaVerificationId,
      },
    });
  }

  /**
   * Завершает KYC верификацию
   * @param cognitoId - Идентификатор пользователя
   * @param status - Результат верификации
   * @returns Обновленный пользователь
   */
  async completeKycVerification(
    cognitoId: string,
    status: typeof KycStatus.COMPLETED | typeof KycStatus.REJECTED,
  ): Promise<User> {
    return prisma.user.update({
      where: { cognitoId },
      data: {
        kycStatus: status,
        kycCompletedAt: status === KycStatus.COMPLETED ? new Date() : null,
      },
    });
  }

  /**
   * Обновляет email пользователя
   * @param cognitoId - Идентификатор пользователя
   * @param email - Новый email
   * @returns Обновленный пользователь
   */
  async updateUserEmail(cognitoId: string, email: string): Promise<User> {
    try {
      return prisma.user.update({
        where: { cognitoId },
        data: { email },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw UserError.conflict("Email already exists");
        }
        throw UserError.databaseError("Email update failed");
      }
      throw error;
    }
  }

  /**
   * Получает баланс токенов пользователя по объектам недвижимости
   * @param userId - Идентификатор пользователя
   * @returns Агрегированные балансы по объектам
   */
  async getUserTokenBalances(userId: string) {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            contractAddress: true,
          },
        },
      },
    });

    // Группируем вручную для избежания проблем с groupBy
    const balanceMap = new Map<string, { property: any; totalTokens: number }>();

    transactions.forEach((tx) => {
      const existing = balanceMap.get(tx.propertyId);
      if (existing) {
        existing.totalTokens += tx.tokensAmount;
      } else {
        balanceMap.set(tx.propertyId, {
          property: tx.property,
          totalTokens: tx.tokensAmount,
        });
      }
    });

    return Array.from(balanceMap.values());
  }

  /**
   * Временная заглушка для генерации HSM кошелька (Polygon адрес)
   * TODO: Заменить на реальную интеграцию с HSM
   */
  private async generateHSMWallet(): Promise<string> {
    // Временная генерация Polygon/Ethereum адреса для разработки
    const randomHex = Math.random().toString(16).substring(2, 42);
    return `0x${randomHex.padStart(40, "0")}`;
  }
}
