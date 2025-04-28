import { KycStatus, Prisma, StakingRecord, User, Wallet } from "@prisma/client";
import { prisma } from "../common";
import { UserError } from "./contract/error/user.error";

function verifySolanaSignature(address: string, signature: string): boolean {
  console.log(`[verifySolanaSignature]: ${address} ${signature}`);
  // TODO: Реализовать настоящую проверку подписи
  return true;
}

type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    wallets: true;
    stakingRecords: {
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
   * @returns Пользователь с привязанными кошельками и записями стейкинга
   * @throws {UserError} NOT_FOUND - Если пользователь не найден
   * @throws {UserError} DATABASE_ERROR - При ошибках базы данных
   */
  async getUserByCognitoId(cognitoId: string): Promise<UserWithRelations> {
    try {
      return await prisma.user.findUniqueOrThrow({
        where: { cognitoId },
        include: {
          wallets: true,
          stakingRecords: {
            include: { property: true },
          },
        },
      });
  } catch (error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      return this.createUser(cognitoId);
    }
    throw UserError.databaseError("User lookup failed");
  }
  throw error;
}
  }

private async createUser(cognitoId: string): Promise<UserWithRelations> {
  return prisma.user.create({
    data: {
      cognitoId,
      name: "New User",
      email: `${cognitoId}@temp.com`,
      phoneNumber: "",
      kycStatus: KycStatus.NOT_STARTED
    },
    include: {
      wallets: true,
      stakingRecords: {
        include: { property: true }
      }
    }
  });
}

  /**
   * Инициирует процесс KYC-верификации
   * @param cognitoId - Идентификатор пользователя в Cognito
   * @param _documents - Документы для верификации (не используется)
   * @returns Обновленный пользователь со статусом KYC PENDING
   */
  async initiateKycVerification(cognitoId: string, _documents: unknown): Promise<User> {
    return prisma.user.update({
      where: { cognitoId },
      data: {
        kycStatus: KycStatus.PENDING,
      },
    });
  }

  async updateUserSettings(
    cognitoId: string,
    data: Partial<Pick<User, "name" | "email" | "phoneNumber">>,
  ): Promise<User> {
    try {
      return prisma.user.update({
        where: { cognitoId },
        data: {
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw UserError.conflict("Email or phone already exists");
        }
        throw UserError.databaseError("Update failed");
      }
      throw error;
    }
  }

  /**
   * Привязывает кошелек Solana к пользователю
   * @param userId - Идентификатор пользователя
   * @param address - Адрес кошелька
   * @param signature - Подпись для верификации
   * @returns Созданный кошелек
   * @throws {UserError} VALIDATION_ERROR - При неверной подписи
   * @throws {UserError} CONFLICT - При дубликате кошелька
   */
  async linkSolanaWallet(userId: string, address: string, signature: string): Promise<Wallet> {
    if (!verifySolanaSignature(address, signature)) {
      throw UserError.validationError("Invalid wallet signature");
    }

    try {
      return prisma.wallet.create({
        data: {
          address,
          userId,
          whitelisted: false,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw UserError.conflict("Wallet already linked");
        }
        throw UserError.databaseError("Wallet linking failed");
      }
      throw error;
    }
  }

  /**
   * Получает записи стейкинга пользователя
   * @param userId - Идентификатор пользователя
   * @returns Массив записей стейкинга с информацией о недвижимости
   */
  async getStakingRecords(userId: string): Promise<StakingRecord[]> {
    return prisma.stakingRecord.findMany({
      where: { userId },
      include: {
        property: {
          select: {
            id: true,
            title: true,
            solanaMint: true,
            metadata: true,
          },
        },
      },
    });
  }
}
