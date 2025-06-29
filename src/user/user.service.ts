import { KycStatus, Prisma, User } from "@prisma/client";
import { HttpError, prisma } from "../common";

export class UserService {
  async createUser(data: { cognitoId: string; email: string }): Promise<User> {
    try {
      return await prisma.user.create({
        data: {
          cognitoId: data.cognitoId,
          email: data.email,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new HttpError("User with this email or cognitoId already exists", 409);
      }
      throw new HttpError("User creation failed", 500);
    }
  }

  async getUserByCognitoId(cognitoId: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { cognitoId },
    });

    if (!user) {
      throw new HttpError("User not found", 404);
    }

    return user;
  }

  /**
   * Находит пользователя по KYC Provider ID
   */
  async getUserByKycProviderId(providerId: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: { kycProviderId: providerId },
    });
  }

  async updateUserEmail(cognitoId: string, email: string): Promise<User> {
    try {
      return await prisma.user.update({
        where: { cognitoId },
        data: { email },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new HttpError("Email already exists", 409);
      }
      throw new HttpError("Email update failed", 500);
    }
  }

  async validateUserForPurchase(cognitoId: string): Promise<{
    id: string;
    kycStatus: KycStatus | null;
  }> {
    const user = await this.getUserByCognitoId(cognitoId);

    if (user.kycStatus !== KycStatus.APPROVED) {
      throw new HttpError("KYC verification required", 403);
    }

    return {
      id: user.id,
      kycStatus: user.kycStatus,
    };
  }

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
