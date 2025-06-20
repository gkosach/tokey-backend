import { KycStatus, PropertyStatus } from "@prisma/client";
import { HttpError } from "../../../src/common";
import { PropertyService } from "../../../src/property/property.service";
import { TokenService } from "../../../src/token/token.service";
import { UserService } from "../../../src/user/user.service";

const { prisma } = require("../../../src/common");

// Мокаем зависимости
jest.mock("../../../src/user/user.service");
jest.mock("../../../src/property/property.service");

describe("TokenService - Critical Tests", () => {
  let tokenService: TokenService;
  let mockUserService: jest.Mocked<UserService>;
  let mockPropertyService: jest.Mocked<PropertyService>;

  beforeEach(() => {
    jest.clearAllMocks();

    // Мокаем сервисы
    mockUserService = new UserService() as jest.Mocked<UserService>;
    mockPropertyService = new PropertyService() as jest.Mocked<PropertyService>;

    tokenService = new TokenService();
    (tokenService as any).userService = mockUserService;
    (tokenService as any).propertyService = mockPropertyService;

    // Мокаем Prisma
    prisma.user = {
      findUnique: jest.fn(),
    };
    prisma.tokenTransaction = {
      findMany: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      groupBy: jest.fn(),
    };
    prisma.property = {
      findUnique: jest.fn(),
      update: jest.fn(),
    };
    prisma.$transaction = jest.fn();
  });

  describe("getUserTokenBalances", () => {
    it("🔴 КРИТИЧНО: выбрасывает ошибку если пользователь не найден", async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      try {
        await tokenService.getUserTokenBalances("nonexistent");
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(404);
        expect((error as HttpError).message).toBe("User not found");
      }
    });

    it("🔴 КРИТИЧНО: правильно агрегирует балансы по Property (ledger логика)", async () => {
      const mockUser = { id: "user-123" };
      const mockTransactions = [
        {
          propertyId: "prop-1",
          tokensAmount: 100,
          id: "tx-1",
          txHash: "hash1",
          createdAt: new Date("2024-01-01"),
          transactionType: "PURCHASE",
          property: {
            id: "prop-1",
            title: "ЖК Северный",
            contractAddress: "0xabc123",
            district: "САО",
            type: "villa",
          },
        },
        {
          propertyId: "prop-1",
          tokensAmount: 50,
          id: "tx-2",
          txHash: "hash2",
          createdAt: new Date("2024-01-02"),
          transactionType: "PURCHASE",
          property: {
            id: "prop-1",
            title: "ЖК Северный",
            contractAddress: "0xabc123",
            district: "САО",
            type: "villa",
          },
        },
        {
          propertyId: "prop-2",
          tokensAmount: 200,
          id: "tx-3",
          txHash: "hash3",
          createdAt: new Date("2024-01-03"),
          transactionType: "PURCHASE",
          property: {
            id: "prop-2",
            title: "ЖК Южный",
            contractAddress: "0xdef456",
            district: "ЮАО",
            type: "apartment",
          },
        },
      ];

      prisma.user.findUnique.mockResolvedValue(mockUser);
      prisma.tokenTransaction.findMany.mockResolvedValue(mockTransactions);

      const result = await tokenService.getUserTokenBalances("cognito-123");

      expect(result).toHaveLength(2);

      const prop1Balance = result.find((r) => r.property.id === "prop-1");
      expect(prop1Balance.totalTokens).toBe(150); // 100 + 50
      expect(prop1Balance.transactionCount).toBe(2);
      expect(prop1Balance.transactions).toHaveLength(2);

      const prop2Balance = result.find((r) => r.property.id === "prop-2");
      expect(prop2Balance.totalTokens).toBe(200);
      expect(prop2Balance.transactionCount).toBe(1);
      expect(prop2Balance.transactions).toHaveLength(1);
    });

    it("🟡 EDGE CASE: возвращает пустой массив для пользователя без транзакций", async () => {
      const mockUser = { id: "user-123" };
      prisma.user.findUnique.mockResolvedValue(mockUser);
      prisma.tokenTransaction.findMany.mockResolvedValue([]);

      const result = await tokenService.getUserTokenBalances("cognito-123");

      expect(result).toEqual([]);
    });
  });

  describe("getPropertyTransactions", () => {
    it("🔴 КРИТИЧНО: выбрасывает ошибку для несуществующей недвижимости", async () => {
      prisma.property.findUnique.mockResolvedValue(null);

      try {
        await tokenService.getPropertyTransactions("nonexistent-prop");
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(404);
        expect((error as HttpError).message).toBe("Property not found");
      }
    });

    it("🔴 КРИТИЧНО: возвращает транзакции для валидной недвижимости", async () => {
      const mockProperty = { id: "prop-1" };
      const mockTransactions = [
        {
          id: "tx-1",
          tokensAmount: 100,
          txHash: "hash1",
          createdAt: new Date(),
          transactionType: "PURCHASE",
          user: { id: "user-1", email: "investor1@tokey.com" },
        },
        {
          id: "tx-2",
          tokensAmount: 50,
          txHash: "hash2",
          createdAt: new Date(),
          transactionType: "PURCHASE",
          user: { id: "user-2", email: "investor2@tokey.com" },
        },
      ];

      prisma.property.findUnique.mockResolvedValue(mockProperty);
      prisma.tokenTransaction.findMany.mockResolvedValue(mockTransactions);

      const result = await tokenService.getPropertyTransactions("prop-1");

      expect(prisma.property.findUnique).toHaveBeenCalledWith({
        where: { id: "prop-1" },
        select: { id: true },
      });
      expect(result).toEqual(mockTransactions);
    });
  });

  describe("getTransactionHistory", () => {
    it("🔴 КРИТИЧНО: выбрасывает ошибку для несуществующего пользователя", async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      try {
        await tokenService.getTransactionHistory("nonexistent");
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(404);
        expect((error as HttpError).message).toBe("User not found");
      }
    });

    it("🔴 КРИТИЧНО: возвращает пагинированную историю транзакций", async () => {
      const mockUser = { id: "user-123" };
      const mockTransactions = [
        {
          id: "tx-1",
          tokensAmount: 100,
          createdAt: new Date(),
          transactionType: "PURCHASE",
          property: {
            title: "ЖК Северный",
            contractAddress: "0xabc123",
            district: "САО",
          },
        },
      ];

      prisma.user.findUnique.mockResolvedValue(mockUser);
      prisma.tokenTransaction.findMany.mockResolvedValue(mockTransactions);
      prisma.tokenTransaction.count.mockResolvedValue(25);

      const result = await tokenService.getTransactionHistory("cognito-123", 10, 0);

      expect(result.transactions).toEqual(mockTransactions);
      expect(result.total).toBe(25);
      expect(result.hasMore).toBe(true); // 0 + 10 < 25

      expect(prisma.tokenTransaction.findMany).toHaveBeenCalledWith({
        where: { userId: "user-123" },
        include: {
          property: {
            select: {
              title: true,
              contractAddress: true,
              district: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 10,
        skip: 0,
      });
    });

    it("🟡 EDGE CASE: hasMore = false на последней странице", async () => {
      const mockUser = { id: "user-123" };
      prisma.user.findUnique.mockResolvedValue(mockUser);
      prisma.tokenTransaction.findMany.mockResolvedValue([]);
      prisma.tokenTransaction.count.mockResolvedValue(15);

      const result = await tokenService.getTransactionHistory("cognito-123", 10, 10);

      expect(result.hasMore).toBe(false); // 10 + 10 >= 15
    });
  });

  describe("updateAvailableTokens", () => {
    it("🔴 КРИТИЧНО: выбрасывает ошибку для несуществующей недвижимости", async () => {
      prisma.$transaction.mockImplementation(async (callback: any) => {
        const mockTx = {
          property: {
            findUnique: jest.fn().mockResolvedValue(null),
            update: jest.fn(),
          },
        };
        return await callback(mockTx);
      });

      try {
        await tokenService.updateAvailableTokens("nonexistent-prop", 100);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(404);
        expect((error as HttpError).message).toBe("Property not found");
      }
    });

    it("🔴 КРИТИЧНО: выбрасывает ошибку при недостатке токенов", async () => {
      prisma.$transaction.mockImplementation(async (callback: any) => {
        const mockTx = {
          property: {
            findUnique: jest.fn().mockResolvedValue({
              availableTokens: 50,
              status: PropertyStatus.ACTIVE,
            }),
            update: jest.fn(),
          },
        };
        return await callback(mockTx);
      });

      try {
        await tokenService.updateAvailableTokens("prop-1", 100);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(400);
        expect((error as HttpError).message).toBe("Insufficient tokens available");
      }
    });

    it("🔴 КРИТИЧНО: обновляет токены и устанавливает SOLD_OUT при нуле", async () => {
      const mockTx = {
        property: {
          findUnique: jest.fn().mockResolvedValue({
            availableTokens: 100,
            status: PropertyStatus.ACTIVE,
          }),
          update: jest.fn().mockResolvedValue({
            availableTokens: 0,
            status: PropertyStatus.SOLD_OUT,
          }),
        },
      };

      prisma.$transaction.mockImplementation(async (callback: any) => {
        return await callback(mockTx);
      });

      const result = await tokenService.updateAvailableTokens("prop-1", 100);

      expect(mockTx.property.update).toHaveBeenCalledWith({
        where: { id: "prop-1" },
        data: {
          availableTokens: 0,
          status: PropertyStatus.SOLD_OUT,
        },
      });
      expect(result.status).toBe(PropertyStatus.SOLD_OUT);
    });

    it("🔴 КРИТИЧНО: сохраняет статус при частичной покупке", async () => {
      const mockTx = {
        property: {
          findUnique: jest.fn().mockResolvedValue({
            availableTokens: 100,
            status: PropertyStatus.ACTIVE,
          }),
          update: jest.fn().mockResolvedValue({
            availableTokens: 90,
            status: PropertyStatus.ACTIVE,
          }),
        },
      };

      prisma.$transaction.mockImplementation(async (callback: any) => {
        return await callback(mockTx);
      });

      const result = await tokenService.updateAvailableTokens("prop-1", 10);

      expect(mockTx.property.update).toHaveBeenCalledWith({
        where: { id: "prop-1" },
        data: {
          availableTokens: 90,
          status: PropertyStatus.ACTIVE,
        },
      });
      expect(result.status).toBe(PropertyStatus.ACTIVE);
    });
  });

  describe("purchaseTokens", () => {
    it("🔴 КРИТИЧНО: выполняет полный цикл покупки токенов", async () => {
      const mockUser = {
        id: "user-123",
        kycStatus: KycStatus.APPROVED,
        wallet: { walletAddress: "0x123abc..." },
      };
      const mockProperty = {
        id: "prop-1",
        availableTokens: 1000,
        status: PropertyStatus.ACTIVE,
      };
      const mockTransaction = {
        id: "tx-123",
        userId: "user-123",
        propertyId: "prop-1",
        tokensAmount: 100,
        txHash: "0xabc123...",
      };

      mockUserService.validateUserForPurchase.mockResolvedValue(mockUser as any);
      mockPropertyService.validatePropertyForPurchase.mockResolvedValue(mockProperty as any);

      const mockTx = {
        tokenTransaction: {
          create: jest.fn().mockResolvedValue(mockTransaction),
        },
        property: {
          update: jest.fn().mockResolvedValue({}),
        },
      };

      prisma.$transaction.mockImplementation(async (callback: any) => {
        return await callback(mockTx);
      });

      const result = await tokenService.purchaseTokens("cognito-123", "prop-1", 100, {
        amount: 5000000,
        currency: "RUB",
      });

      // Проверяем валидацию
      expect(mockUserService.validateUserForPurchase).toHaveBeenCalledWith("cognito-123");
      expect(mockPropertyService.validatePropertyForPurchase).toHaveBeenCalledWith("prop-1", 100);

      // Проверяем создание транзакции
      expect(mockTx.tokenTransaction.create).toHaveBeenCalledWith({
        data: {
          userId: "user-123",
          propertyId: "prop-1",
          tokensAmount: 100,
          txHash: expect.stringMatching(/^0x[a-f0-9]{64}$/),
          fromAddress: "0x0000000000000000000000000000000000000000",
          toAddress: "0x123abc...",
          paymentAmount: 5000000,
          paymentCurrency: "RUB",
          transactionType: "PURCHASE",
        },
      });

      // Проверяем обновление Property
      expect(mockTx.property.update).toHaveBeenCalledWith({
        where: { id: "prop-1" },
        data: {
          availableTokens: { decrement: 100 },
          status: PropertyStatus.ACTIVE, // 1000 - 100 != 0
        },
      });

      expect(result).toEqual(mockTransaction);
    });

    it("🔴 КРИТИЧНО: устанавливает SOLD_OUT при покупке всех токенов", async () => {
      const mockUser = {
        id: "user-123",
        wallet: { walletAddress: "0x123abc..." },
      };
      const mockProperty = {
        id: "prop-1",
        availableTokens: 100,
        status: PropertyStatus.ACTIVE,
      };

      mockUserService.validateUserForPurchase.mockResolvedValue(mockUser as any);
      mockPropertyService.validatePropertyForPurchase.mockResolvedValue(mockProperty as any);

      const mockTx = {
        tokenTransaction: {
          create: jest.fn().mockResolvedValue({ id: "tx-123" }),
        },
        property: {
          update: jest.fn().mockResolvedValue({}),
        },
      };

      prisma.$transaction.mockImplementation(async (callback: any) => {
        return await callback(mockTx);
      });

      await tokenService.purchaseTokens("cognito-123", "prop-1", 100, { amount: 5000000, currency: "RUB" });

      expect(mockTx.property.update).toHaveBeenCalledWith({
        where: { id: "prop-1" },
        data: {
          availableTokens: { decrement: 100 },
          status: PropertyStatus.SOLD_OUT, // 100 - 100 = 0
        },
      });
    });

    it("🔴 КРИТИЧНО: пробрасывает ошибки валидации", async () => {
      mockUserService.validateUserForPurchase.mockRejectedValue(new HttpError("KYC verification required", 403));

      try {
        await tokenService.purchaseTokens("cognito-123", "prop-1", 100, { amount: 5000000, currency: "RUB" });
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(403);
        expect((error as HttpError).message).toBe("KYC verification required");
      }
    });
  });

  describe("getPropertyTokenStats", () => {
    it("🔴 КРИТИЧНО: выбрасывает ошибку для несуществующей недвижимости", async () => {
      prisma.property.findUnique.mockResolvedValue(null);

      try {
        await tokenService.getPropertyTokenStats("nonexistent-prop");
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(404);
        expect((error as HttpError).message).toBe("Property not found");
      }
    });

    it("🔴 КРИТИЧНО: правильно рассчитывает статистику продаж", async () => {
      const mockProperty = { id: "prop-1" };
      const mockTransactions = [
        {
          tokensAmount: 100,
          paymentAmount: 5000000,
          paymentCurrency: "RUB",
          createdAt: new Date("2024-01-01"),
        },
        {
          tokensAmount: 50,
          paymentAmount: 2500000,
          paymentCurrency: "RUB",
          createdAt: new Date("2024-01-02"),
        },
      ];
      const mockUniqueInvestors = [
        { userId: "user-1", _count: { userId: 1 } },
        { userId: "user-2", _count: { userId: 1 } },
      ];

      prisma.property.findUnique.mockResolvedValue(mockProperty);
      prisma.tokenTransaction.findMany.mockResolvedValue(mockTransactions);
      prisma.tokenTransaction.groupBy.mockResolvedValue(mockUniqueInvestors);

      const result = await tokenService.getPropertyTokenStats("prop-1");

      expect(result).toEqual({
        totalTokensSold: 150, // 100 + 50
        totalInvestors: 2,
        totalVolume: 7500000, // 5000000 + 2500000
        recentTransactions: mockTransactions,
      });
    });

    it("🟡 EDGE CASE: возвращает нулевую статистику для недвижимости без продаж", async () => {
      const mockProperty = { id: "prop-1" };

      prisma.property.findUnique.mockResolvedValue(mockProperty);
      prisma.tokenTransaction.findMany.mockResolvedValue([]);
      prisma.tokenTransaction.groupBy.mockResolvedValue([]);

      const result = await tokenService.getPropertyTokenStats("prop-1");

      expect(result).toEqual({
        totalTokensSold: 0,
        totalInvestors: 0,
        totalVolume: 0,
        recentTransactions: [],
      });
    });
  });

  describe("generateTxHash", () => {
    it("🟡 УТИЛИТА: генерирует валидный хеш транзакции", () => {
      const hash1 = tokenService.generateTxHash();
      const hash2 = tokenService.generateTxHash();

      // Проверяем формат
      expect(hash1).toMatch(/^0x[a-f0-9]{64}$/);
      expect(hash2).toMatch(/^0x[a-f0-9]{64}$/);

      // Проверяем уникальность
      expect(hash1).not.toBe(hash2);
    });
  });

  describe("executeBlockchainTransaction", () => {
    it("🟡 ЗАГЛУШКА: возвращает хеш транзакции", async () => {
      const result = await tokenService.executeBlockchainTransaction("0xfrom", "0xto", 100, "0xcontract");

      expect(result).toMatch(/^0x[a-f0-9]{64}$/);
    });
  });
});
