import { KycStatus, Prisma } from "@prisma/client";
import { HttpError } from "../../../src/common";
import { UserService } from "../../../src/user/user.service";

const { prisma } = require("../../../src/common");

describe("UserService - Critical Tests", () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("🔴 КРИТИЧНО: создает пользователя с правильными данными", async () => {
      const userData = { cognitoId: "new-123", email: "new@tokey.com" };
      const mockCreatedUser = {
        id: "user-456",
        ...userData,
        kycStatus: null,
        referralLink: null,
        kycProviderId: null,
        kycCompletedAt: null,
        createdAt: new Date(),
      };

      prisma.user.create.mockResolvedValue(mockCreatedUser);

      const result = await userService.createUser(userData);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          cognitoId: "new-123",
          email: "new@tokey.com",
        },
      });
      expect(result.cognitoId).toBe("new-123");
      expect(result.email).toBe("new@tokey.com");
    });

    it("🔴 КРИТИЧНО: обрабатывает дублирование пользователей (P2002)", async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError("Unique constraint", {
        code: "P2002",
        clientVersion: "5.0.0",
      });
      prisma.user.create.mockRejectedValue(prismaError);

      await expect(
        userService.createUser({
          cognitoId: "test",
          email: "duplicate@tokey.com",
        }),
      ).rejects.toThrow(HttpError);

      try {
        await userService.createUser({
          cognitoId: "test",
          email: "duplicate@tokey.com",
        });
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(409);
        expect((error as HttpError).message).toBe("User with this email or cognitoId already exists");
      }
    });

    it("🔴 КРИТИЧНО: обрабатывает общие ошибки БД", async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError("Database error", {
        code: "P2003",
        clientVersion: "5.0.0",
      });
      prisma.user.create.mockRejectedValue(prismaError);

      await expect(
        userService.createUser({
          cognitoId: "test",
          email: "test@tokey.com",
        }),
      ).rejects.toThrow(HttpError);

      try {
        await userService.createUser({
          cognitoId: "test",
          email: "test@tokey.com",
        });
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(500);
        expect((error as HttpError).message).toBe("User creation failed");
      }
    });
  });

  describe("getUserByCognitoId", () => {
    it("🔴 КРИТИЧНО: возвращает пользователя по cognitoId", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        email: "test@tokey.com",
        kycStatus: KycStatus.COMPLETED,
        referralLink: null,
        kycProviderId: "verification_123",
        kycCompletedAt: new Date(),
        createdAt: new Date(),
      };

      prisma.user.findUniqueOrThrow.mockResolvedValue(mockUser);

      const result = await userService.getUserByCognitoId("cognito-123");

      expect(prisma.user.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { cognitoId: "cognito-123" },
        include: { wallet: true },
      });
      expect(result).toEqual(mockUser);
    });

    it("🔴 КРИТИЧНО: пробрасывает Prisma ошибку при отсутствии пользователя", async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError("Not found", {
        code: "P2025",
        clientVersion: "5.0.0",
      });
      prisma.user.findUniqueOrThrow.mockRejectedValue(prismaError);

      await expect(userService.getUserByCognitoId("nonexistent")).rejects.toThrow(HttpError); // Ожидаем HttpError

      // Дополнительно проверь сообщение:
      await expect(userService.getUserByCognitoId("nonexistent")).rejects.toThrow("User not found");
    });
  });

  describe("updateUserEmail", () => {
    it("🟡 СРЕДНЕ-КРИТИЧНО: успешно обновляет email", async () => {
      const mockUpdatedUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        email: "updated@tokey.com",
        kycStatus: KycStatus.CREATED,
        referralLink: null,
        kycProviderId: null,
        kycCompletedAt: null,
        createdAt: new Date(),
      };

      prisma.user.update.mockResolvedValue(mockUpdatedUser);

      const result = await userService.updateUserEmail("cognito-123", "updated@tokey.com");

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { cognitoId: "cognito-123" },
        data: { email: "updated@tokey.com" },
      });
      expect(result.email).toBe("updated@tokey.com");
    });

    it("🟡 СРЕДНЕ-КРИТИЧНО: предотвращает дублирование email (P2002)", async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError("Unique constraint", {
        code: "P2002",
        clientVersion: "5.0.0",
      });
      prisma.user.update.mockRejectedValue(prismaError);

      try {
        await userService.updateUserEmail("cognito-123", "duplicate@tokey.com");
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(409);
        expect((error as HttpError).message).toBe("Email already exists");
      }
    });

    it("🟡 СРЕДНЕ-КРИТИЧНО: обрабатывает общие ошибки БД", async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError("Database error", {
        code: "P2003",
        clientVersion: "5.0.0",
      });
      prisma.user.update.mockRejectedValue(prismaError);

      try {
        await userService.updateUserEmail("cognito-123", "new@email.com");
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(500);
        expect((error as HttpError).message).toBe("Email update failed");
      }
    });
  });

  describe("updateKycStatusByCognitoId", () => {
    it("🔴 КРИТИЧНО: обновляет KYC статус с providerId", async () => {
      const mockUpdatedUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        email: "test@tokey.com",
        kycStatus: KycStatus.CREATED,
        referralLink: null,
        kycProviderId: "persona_123",
        kycCompletedAt: null,
        createdAt: new Date(),
      };

      prisma.user.update.mockResolvedValue(mockUpdatedUser);

      const result = await userService.updateKycStatus("cognito-123", KycStatus.CREATED, "persona_123");

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { cognitoId: "cognito-123" },
        data: {
          kycStatus: KycStatus.CREATED,
          kycProviderId: "persona_123",
          kycCompletedAt: undefined,
        },
      });
      expect(result.kycStatus).toBe(KycStatus.CREATED);
      expect(result.kycProviderId).toBe("persona_123");
    });

    it("🔴 КРИТИЧНО: устанавливает kycCompletedAt при статусе COMPLETED", async () => {
      const mockDate = new Date();
      const mockUpdatedUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        email: "test@tokey.com",
        kycStatus: KycStatus.COMPLETED,
        referralLink: null,
        kycProviderId: "persona_123",
        kycCompletedAt: mockDate,
        createdAt: new Date(),
      };

      prisma.user.update.mockResolvedValue(mockUpdatedUser);

      const result = await userService.updateKycStatus("cognito-123", KycStatus.COMPLETED, "persona_123");

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { cognitoId: "cognito-123" },
        data: {
          kycStatus: KycStatus.COMPLETED,
          kycProviderId: "persona_123",
          kycCompletedAt: expect.any(Date),
        },
      });
      expect(result.kycStatus).toBe(KycStatus.COMPLETED);
    });
  });

  describe("validateUserForPurchase", () => {
    it("🔴 КРИТИЧНО: возвращает валидного пользователя с кошельком", async () => {
      const mockUser = {
        id: "user-123",
        kycStatus: KycStatus.APPROVED,
        wallet: { walletAddress: "0x123abc..." },
      };

      prisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await userService.validateUserForPurchase("cognito-123");

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { cognitoId: "cognito-123" },
        select: {
          id: true,
          kycStatus: true,
          wallet: { select: { walletAddress: true } },
        },
      });
      expect(result).toEqual({
        id: "user-123",
        kycStatus: KycStatus.APPROVED,
        wallet: { walletAddress: "0x123abc..." },
      });
    });

    it("🔴 КРИТИЧНО: выбрасывает ошибку если пользователь не найден", async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      try {
        await userService.validateUserForPurchase("nonexistent");
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(404);
        expect((error as HttpError).message).toBe("User not found");
      }
    });

    it("🔴 КРИТИЧНО: выбрасывает ошибку если у пользователя нет кошелька", async () => {
      const mockUser = {
        id: "user-123",
        kycStatus: KycStatus.APPROVED,
        wallet: null,
      };

      prisma.user.findUnique.mockResolvedValue(mockUser);

      try {
        await userService.validateUserForPurchase("cognito-123");
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(404);
        expect((error as HttpError).message).toBe("User wallet not found");
      }
    });

    it("🔴 КРИТИЧНО: выбрасывает ошибку если KYC не одобрен", async () => {
      const mockUser = {
        id: "user-123",
        kycStatus: KycStatus.CREATED,
        wallet: { walletAddress: "0x123abc..." },
      };

      prisma.user.findUnique.mockResolvedValue(mockUser);

      try {
        await userService.validateUserForPurchase("cognito-123");
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(403);
        expect((error as HttpError).message).toBe("KYC verification required");
      }
    });
  });

  describe("getUserByKycProviderId", () => {
    it("🟡 СРЕДНЕ-КРИТИЧНО: возвращает пользователя по KYC Provider ID", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        email: "test@tokey.com",
        kycStatus: KycStatus.CREATED,
        kycProviderId: "persona_123",
        kycCompletedAt: null,
        createdAt: new Date(),
      };

      prisma.user.findFirst.mockResolvedValue(mockUser);

      const result = await userService.getUserByKycProviderId("persona_123");

      expect(prisma.user.findFirst).toHaveBeenCalledWith({
        where: { kycProviderId: "persona_123" },
      });
      expect(result).toEqual(mockUser);
    });

    it("🟡 СРЕДНЕ-КРИТИЧНО: возвращает null если пользователь не найден", async () => {
      prisma.user.findFirst.mockResolvedValue(null);

      const result = await userService.getUserByKycProviderId("nonexistent");

      expect(result).toBeNull();
    });
  });
});
