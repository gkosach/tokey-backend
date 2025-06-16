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
          kycStatus: KycStatus.NOT_STARTED,
        },
      });

      console.log("✅ Found user:", { id: user.id, email: user.email });
      return user;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw UserError.conflict("User with this email or cognitoId already exists");
      }
      throw UserError.databaseError("User creation failed");
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
  async getUserByCognitoId(cognitoId: string): Promise<User> {
    console.log("🔍 UserService.getUserByCognitoId - searching for:", cognitoId);

    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: { cognitoId },
      });

      console.log("✅ Found user:", { id: user.id, email: user.email });
      return user;
    } catch (error) {
      console.error("❌ User not found for cognitoId:", cognitoId);
      console.error("💥 Error:", error);
      throw error;
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
  async getUserTokenBalances(cognitoId: string) {
    // @german create me
  }
}
