import { KycStatus, Prisma, User } from "@prisma/client";
import { prisma, UserError } from "../common";

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
          kycStatus: KycStatus.PENDING,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw UserError.conflict("User with this email or cognitoId already exists");
      }
      throw UserError.databaseError("User creation failed");
    }
  }
  /**
   * Получает пользователя по Cognito ID БЕЗ транзакций
   */
  async getUserByCognitoId(cognitoId: string): Promise<User> {
    try {
      return await prisma.user.findUniqueOrThrow({
        where: { cognitoId },
        include: {
          wallet: true,
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
   * Завершает KYC верификацию
   */
  async completeKycVerification(cognitoId: string, status: KycStatus): Promise<User> {
    try {
      return await prisma.user.update({
        where: { cognitoId },
        data: {
          kycStatus: status,
          kycCompletedAt: status === KycStatus.COMPLETED ? new Date() : null,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
        throw UserError.notFound();
      }
      throw UserError.databaseError("KYC verification update failed");
    }
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
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw UserError.conflict("Email already exists");
        }
        throw UserError.databaseError("Email update failed");
      }
      throw error;
    }
  }
}
