import { KycStatus, Prisma } from "@prisma/client";
import { UserError } from "../../../src/common";
import { UserService } from "../../../src/user/user.service";

const { prisma } = require("../../../src/common");

describe("UserService - Critical Tests", () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    jest.clearAllMocks();
  });

  describe("createUser", () => {
    it("🔴 КРИТИЧНО: создает пользователя с правильными default значениями", async () => {
      const userData = { cognitoId: "new-123", email: "new@tokey.com" };
      const mockCreatedUser = {
        id: "user-456",
        ...userData,
        kycStatus: KycStatus.NOT_STARTED,
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
          kycStatus: KycStatus.NOT_STARTED,
        },
      });
      expect(result.kycStatus).toBe(KycStatus.NOT_STARTED);
    });

    it("🔴 КРИТИЧНО: обрабатывает дублирование пользователей", async () => {
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
      ).rejects.toThrow(UserError); // 🔧 ИСПРАВЛЕНО: ожидаем UserError
    });
  });

  describe("getUserByCognitoId", () => {
    it("🔴 КРИТИЧНО: возвращает пользователя", async () => {
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

      // 🔧 ИСПРАВЛЕНО: убрали include wallet
      expect(prisma.user.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { cognitoId: "cognito-123" },
      });
      expect(result).toEqual(mockUser);
    });

    it("🔴 КРИТИЧНО: пробрасывает Prisma ошибку при отсутствии пользователя", async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError("Not found", {
        code: "P2025",
        clientVersion: "5.0.0",
      });
      prisma.user.findUniqueOrThrow.mockRejectedValue(prismaError);

      // 🔧 ИСПРАВЛЕНО: ожидаем Prisma ошибку, а не UserError
      await expect(userService.getUserByCognitoId("nonexistent")).rejects.toThrow(Prisma.PrismaClientKnownRequestError);
    });
  });

  describe("updateUserEmail", () => {
    it("🟡 СРЕДНЕ-КРИТИЧНО: предотвращает дублирование email", async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError("Unique constraint", {
        code: "P2002",
        clientVersion: "5.0.0",
      });
      prisma.user.update.mockRejectedValue(prismaError);

      await expect(userService.updateUserEmail("cognito-123", "duplicate@tokey.com")).rejects.toThrow(
        "Email already exists",
      );
    });

    it("🟡 СРЕДНЕ-КРИТИЧНО: обрабатывает ошибки БД", async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError("Database error", {
        code: "P2003",
        clientVersion: "5.0.0",
      });
      prisma.user.update.mockRejectedValue(prismaError);

      await expect(userService.updateUserEmail("cognito-123", "new@email.com")).rejects.toThrow("Email update failed");
    });

    it("🆕 КРИТИЧНО: успешно обновляет email", async () => {
      const mockUpdatedUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        email: "updated@tokey.com",
        kycStatus: KycStatus.PENDING,
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
  });

  describe("getUserById", () => {
    it("🆕 КРИТИЧНО: возвращает пользователя по ID", async () => {
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

      const result = await userService.getUserById("user-123");

      expect(prisma.user.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { id: "user-123" },
      });
      expect(result).toEqual(mockUser);
    });
  });
});
