import { KycStatus, Prisma } from "@prisma/client";
import { UserError } from "../../../src/user/contract/error/user.error";
import { UserService } from "../../../src/user/user.service";

const { prisma } = require("../../../src/common");

describe("UserService", () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
    jest.clearAllMocks();
  });

  describe("getUserByCognitoId", () => {
    it("возвращает пользователя с транзакциями", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        email: "test@tokey.com",
        walletAddress: "0x123...",
        kycStatus: KycStatus.PENDING,
        transactions: [],
      };

      prisma.user.findUniqueOrThrow.mockResolvedValue(mockUser);

      const result = await userService.getUserByCognitoId("cognito-123");

      expect(result).toEqual(mockUser);
    });

    it("выбрасывает UserError.notFound при отсутствии пользователя", async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError("Not found", {
        code: "P2025",
        clientVersion: "5.0.0",
      });
      prisma.user.findUniqueOrThrow.mockRejectedValue(prismaError);

      await expect(userService.getUserByCognitoId("nonexistent")).rejects.toThrow(UserError);
    });
  });

  describe("createUser", () => {
    it("создает пользователя с HSM кошельком", async () => {
      const userData = { cognitoId: "new-123", email: "new@tokey.com" };
      const mockCreatedUser = {
        id: "user-456",
        ...userData,
        walletAddress: "0x456...",
        kycStatus: KycStatus.PENDING,
      };

      prisma.user.upsert.mockResolvedValue(mockCreatedUser);

      const result = await userService.createUser(userData);

      expect(result).toEqual(mockCreatedUser);
    });

    it("выбрасывает UserError.conflict при дублировании email", async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError("Unique constraint", {
        code: "P2002",
        clientVersion: "5.0.0",
      });
      prisma.user.upsert.mockRejectedValue(prismaError);

      await expect(userService.createUser({ cognitoId: "test", email: "duplicate@tokey.com" })).rejects.toThrow(
        UserError,
      );
    });
  });

  describe("updateUserEmail", () => {
    it("обновляет email пользователя", async () => {
      const mockUpdatedUser = {
        id: "user-123",
        email: "updated@tokey.com",
      };

      prisma.user.update.mockResolvedValue(mockUpdatedUser);

      const result = await userService.updateUserEmail("cognito-123", "updated@tokey.com");

      expect(result).toEqual(mockUpdatedUser);
    });

    it("выбрасывает UserError.conflict при дублировании email", async () => {
      prisma.user.update.mockImplementation(() => {
        throw new Prisma.PrismaClientKnownRequestError("Unique constraint violation", {
          code: "P2002",
          clientVersion: "5.0.0",
          meta: { target: ["email"] },
        });
      });

      await expect(userService.updateUserEmail("cognito-123", "duplicate@tokey.com")).rejects.toThrow(
        "Email already exists",
      );
    });
  });

  describe("getUserTokenBalances", () => {
    it("возвращает агрегированные балансы по объектам", async () => {
      const mockTransactions = [
        {
          propertyId: "prop-1",
          tokensAmount: 1000,
          property: { id: "prop-1", title: "ЖК Тест 1", contractAddress: "0x111" },
        },
        {
          propertyId: "prop-1",
          tokensAmount: 500,
          property: { id: "prop-1", title: "ЖК Тест 1", contractAddress: "0x111" },
        },
        {
          propertyId: "prop-2",
          tokensAmount: 2000,
          property: { id: "prop-2", title: "ЖК Тест 2", contractAddress: "0x222" },
        },
      ];

      prisma.transaction.findMany.mockResolvedValue(mockTransactions);

      const result = await userService.getUserTokenBalances("user-123");

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        property: { id: "prop-1", title: "ЖК Тест 1", contractAddress: "0x111" },
        totalTokens: 1500,
      });
      expect(result[1]).toEqual({
        property: { id: "prop-2", title: "ЖК Тест 2", contractAddress: "0x222" },
        totalTokens: 2000,
      });
    });

    it("возвращает пустой массив при отсутствии транзакций", async () => {
      prisma.transaction.findMany.mockResolvedValue([]);

      const result = await userService.getUserTokenBalances("user-123");

      expect(result).toEqual([]);
    });
  });
});
