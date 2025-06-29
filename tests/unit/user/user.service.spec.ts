import { KycStatus } from "@prisma/client";
import { UserService } from "../../../src/user/user.service";
import { mockUsers } from "../../mocks/prisma.mock";

// Мокаем необходимые зависимости
jest.mock("../../../src/common", () => ({
  prisma: {
    user: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      findFirst: jest.fn(),
    },
  },
  HttpError: class MockHttpError extends Error {
    constructor(
      public message: string,
      public statusCode: number,
    ) {
      super(message);
      this.name = "HttpError";
    }
  },
}));

// Импортируем после мока
import { Prisma } from "@prisma/client";
import { prisma } from "../../../src/common";

describe("UserService - Критические методы", () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    jest.clearAllMocks();
  });

  // 1. Тест для createUser
  describe("createUser", () => {
    it("🟢 создает пользователя", async () => {
      const userData = { cognitoId: "test-123", email: "test@tokey.com" };
      const mockCreatedUser = mockUsers.kycPending;

      (prisma.user.create as jest.Mock).mockResolvedValue(mockCreatedUser);

      const result = await userService.createUser(userData);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          cognitoId: "test-123",
          email: "test@tokey.com",
        },
      });
      expect(result).toEqual(mockCreatedUser);
    });

    it("🔴 бросает ошибку 409 при дубликате", async () => {
      const userData = { cognitoId: "test-123", email: "test@tokey.com" };

      (prisma.user.create as jest.Mock).mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError("Duplicate", {
          code: "P2002",
          clientVersion: "test",
          meta: { target: ["email"] },
        }),
      );

      await expect(userService.createUser(userData)).rejects.toThrow(
        expect.objectContaining({
          message: "User with this email or cognitoId already exists",
          statusCode: 409,
        }),
      );
    });
  });

  // 2. Тест для getUserByCognitoId
  describe("getUserByCognitoId", () => {
    it("🟢 успешно получает пользователя", async () => {
      const cognitoId = "cognito-123";
      const mockUser = mockUsers.kycPending;

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.getUserByCognitoId(cognitoId);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { cognitoId },
      });
      expect(result).toEqual(mockUser);
    });

    it("🔴 бросает ошибку 404 если пользователь не найден", async () => {
      const cognitoId = "non-existent";

      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(userService.getUserByCognitoId(cognitoId)).rejects.toThrow(
        expect.objectContaining({
          message: "User not found",
          statusCode: 404,
        }),
      );
    });
  });

  // 3. Тест для updateUserEmail
  describe("updateUserEmail", () => {
    it("🟢 успешно обновляет email", async () => {
      const cognitoId = "cognito-123";
      const newEmail = "new@tokey.com";
      const mockUpdatedUser = { ...mockUsers.kycPending, email: newEmail };

      (prisma.user.update as jest.Mock).mockResolvedValue(mockUpdatedUser);

      const result = await userService.updateUserEmail(cognitoId, newEmail);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { cognitoId },
        data: { email: newEmail },
      });
      expect(result).toEqual(mockUpdatedUser);
    });

    it("🔴 бросает ошибку 409 при дубликате email", async () => {
      const cognitoId = "cognito-123";
      const newEmail = "existing@tokey.com";

      (prisma.user.update as jest.Mock).mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError("Duplicate", {
          code: "P2002",
          clientVersion: "test",
          meta: { target: ["email"] },
        }),
      );

      await expect(userService.updateUserEmail(cognitoId, newEmail)).rejects.toThrow(
        expect.objectContaining({
          message: "Email already exists",
          statusCode: 409,
        }),
      );
    });
  });

  // 4. Тест для validateUserForPurchase
  describe("validateUserForPurchase", () => {
    const validUser = {
      id: "user-123",
      kycStatus: KycStatus.APPROVED,
    };

    it("🟢 успешно проверяет пользователя", async () => {
      const cognitoId = "cognito-123";
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(validUser);

      const result = await userService.validateUserForPurchase(cognitoId);
      expect(result).toEqual({
        id: validUser.id,
        kycStatus: validUser.kycStatus,
      });
    });

    it("🔴 бросает ошибку 404 если пользователь не найден", async () => {
      const cognitoId = "non-existent";
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(userService.validateUserForPurchase(cognitoId)).rejects.toThrow(
        expect.objectContaining({
          message: "User not found",
          statusCode: 404,
        }),
      );
    });

    it("🔴 бросает ошибку 403 если KYC не пройден", async () => {
      const cognitoId = "cognito-123";
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        ...validUser,
        kycStatus: KycStatus.CREATED,
      });

      await expect(userService.validateUserForPurchase(cognitoId)).rejects.toThrow(
        expect.objectContaining({
          message: "KYC verification required",
          statusCode: 403,
        }),
      );
    });
  });

  // 5. Тест для updateKycStatus
  describe("updateKycStatus", () => {
    const baseMockUser = mockUsers.kycPending;

    it("🟢 успешно обновляет статус KYC", async () => {
      const cognitoId = "cognito-123";
      const status = KycStatus.APPROVED;
      const providerId = "persona_123";
      const mockUpdatedUser = {
        ...baseMockUser,
        kycStatus: status,
        kycProviderId: providerId,
      };

      (prisma.user.update as jest.Mock).mockResolvedValue(mockUpdatedUser);

      const result = await userService.updateKycStatus(cognitoId, status, providerId);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { cognitoId },
        data: {
          kycStatus: status,
          kycProviderId: providerId,
          kycCompletedAt: undefined,
        },
      });
      expect(result).toEqual(mockUpdatedUser);
    });

    it("🟢 устанавливает дату завершения для COMPLETED", async () => {
      const cognitoId = "cognito-123";
      const status = KycStatus.COMPLETED;
      const providerId = "persona_123";
      const mockUpdatedUser = {
        ...baseMockUser,
        kycStatus: status,
        kycProviderId: providerId,
        kycCompletedAt: new Date(),
      };

      (prisma.user.update as jest.Mock).mockResolvedValue(mockUpdatedUser);

      const result = await userService.updateKycStatus(cognitoId, status, providerId);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { cognitoId },
        data: {
          kycStatus: status,
          kycProviderId: providerId,
          kycCompletedAt: expect.any(Date),
        },
      });
      expect(result.kycCompletedAt).toBeInstanceOf(Date);
    });
  });

  // 6. Тест для getUserByKycProviderId
  describe("getUserByKycProviderId", () => {
    it("🟢 успешно находит пользователя по KYC ID", async () => {
      const providerId = "persona_123";
      const mockUser = mockUsers.kycApproved;

      (prisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);

      const result = await userService.getUserByKycProviderId(providerId);

      expect(prisma.user.findFirst).toHaveBeenCalledWith({
        where: { kycProviderId: providerId },
      });
      expect(result).toEqual(mockUser);
    });

    it("🟢 возвращает null если пользователь не найден", async () => {
      const providerId = "non-existent";

      (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

      const result = await userService.getUserByKycProviderId(providerId);
      expect(result).toBeNull();
    });
  });
});
