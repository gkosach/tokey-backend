import { KycStatus, Prisma, User, Wallet } from "@prisma/client";
import { HttpError, prisma } from "../common";

/**
 * Сервис для управления данными пользователей (User Entity)
 *
 * ОТВЕТСТВЕННОСТЬ:
 * - CRUD операции с пользователями в базе данных
 * - Валидация и обработка ошибок при работе с User entity
 * - Обновление всех полей пользователя (включая KYC поля)
 */
export class UserService {
  /**
   * Создает нового пользователя БЕЗ кошелька
   */
  async createUser(data: { cognitoId: string; email: string }): Promise<User> {
    try {
      return await prisma.user.create({
        data: {
          cognitoId: data.cognitoId,
          email: data.email,
        },
      });
    } catch (error) {
      if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
        throw error;
      }

      if (error.code === "P2002") {
        throw new HttpError("User with this email or cognitoId already exists", 409);
      }

      throw new HttpError("User creation failed", 500);
    }
  }

  /**
   * Получает пользователя по ID (первичный ключ)
   */
  async getUserById(id: string): Promise<User> {
    return prisma.user.findUniqueOrThrow({
      where: { id },
    });
  }

  /**
   * Получает пользователя по Cognito ID
   */
  async getUserByCognitoId(cognitoId: string): Promise<User & { wallet: Wallet | null }> {
    console.log("🔍 UserService.getUserByCognitoId - searching for:", cognitoId);

    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: { cognitoId },
        include: { wallet: true },
      });

      console.log("✅ Found user:", { id: user.id, email: user.email });
      return user;
    } catch {
      console.error("❌ User not found for cognitoId:", cognitoId);
      throw new HttpError("User not found", 404);
    }
  }

  /**
   * Находит пользователя по KYC Provider ID
   */
  async getUserByKycProviderId(providerId: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: { kycProviderId: providerId },
    });
  }

  /**
   * Обновляет email пользователя
   */
  async updateUserEmail(cognitoId: string, email: string): Promise<User> {
    try {
      return await prisma.user.update({
        where: { cognitoId },
        data: { email },
      });
    } catch (error) {
      if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
        throw error;
      }

      if (error.code === "P2002") {
        throw new HttpError("Email already exists", 409);
      }

      throw new HttpError("Email update failed", 500);
    }
  }

  /**
   * Проверяет пользователя для покупки токенов
   */
  async validateUserForPurchase(cognitoId: string): Promise<{
    id: string;
    kycStatus: KycStatus | null;
    wallet: { walletAddress: string };
  }> {
    const user = await prisma.user.findUnique({
      where: { cognitoId },
      select: {
        id: true,
        kycStatus: true,
        wallet: { select: { walletAddress: true } },
      },
    });

    if (!user) {
      throw new HttpError("User not found", 404);
    }

    if (!user.wallet) {
      throw new HttpError("User wallet not found", 404);
    }

    if (user.kycStatus !== KycStatus.APPROVED) {
      throw new HttpError("KYC verification required", 403);
    }

    return {
      id: user.id,
      kycStatus: user.kycStatus,
      wallet: user.wallet,
    };
  }

  /**
   * Обновляет KYC поля в User entity
   */
  async updateKycStatus(cognitoId: string, status: KycStatus, providerId?: string): Promise<User> {
    return prisma.user.update({
      where: { cognitoId },
      data: {
        kycStatus: status,
        kycProviderId: providerId,
        kycCompletedAt: status === KycStatus.COMPLETED ? new Date() : undefined,
      },
    });
  }
}
