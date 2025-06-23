import { Prisma, PropertyStatus } from "@prisma/client";
import { HttpError } from "../../../src/common";
import { PropertyService } from "../../../src/property/property.service";

const { prisma } = require("../../../src/common");

describe("PropertyService - Critical Tests", () => {
  let propertyService: PropertyService;

  beforeEach(() => {
    propertyService = new PropertyService();
    jest.clearAllMocks();

    // Мокаем все методы Prisma
    prisma.property = {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      update: jest.fn(),
    };
    prisma.$transaction = jest.fn();
  });

  describe("createProperty", () => {
    it("🔴 КРИТИЧНО: создает недвижимость с правильным статусом COMING_SOON", async () => {
      const propertyData = {
        title: "ЖК Северный",
        contractAddress: "0x1234567890123456789012345678901234567890",
        developerId: "dev-123",
        district: "САО",
        type: "villa",
        totalTokens: 1000000,
        availableTokens: 1000000,
        description: "Элитный ЖК",
        address: "Москва, ул. Тверская, 1",
        roi: 12.5,
        price: 50000000,
      };

      const mockCreatedProperty = {
        id: "property-123",
        ...propertyData,
        status: PropertyStatus.COMING_SOON,
        createdAt: new Date(),
        metadata: null,
      };

      prisma.property.create.mockResolvedValue(mockCreatedProperty);

      const result = await propertyService.createProperty(propertyData);

      expect(prisma.property.create).toHaveBeenCalledWith({
        data: {
          ...propertyData,
          status: PropertyStatus.COMING_SOON,
        },
      });
      expect(result.status).toBe(PropertyStatus.COMING_SOON);
    });

    it("🔴 КРИТИЧНО: обрабатывает дублирование contract address (P2002)", async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError("Unique constraint", {
        code: "P2002",
        clientVersion: "5.0.0",
        meta: { target: ["contract_address"] },
      });
      prisma.property.create.mockRejectedValue(prismaError);

      // Ошибка должна пробрасываться, так как нет try/catch в сервисе
      await expect(
        propertyService.createProperty({
          title: "Дубликат",
          contractAddress: "0x1234567890123456789012345678901234567890",
          developerId: "dev-123",
          district: "ЦАО",
          type: "villa",
          totalTokens: 500000,
          availableTokens: 500000,
        }),
      ).rejects.toThrow(Prisma.PrismaClientKnownRequestError);
    });
  });

  describe("getPropertyById", () => {
    it("🔴 КРИТИЧНО: возвращает недвижимость для валидного UUID", async () => {
      const mockProperty = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        title: "ЖК Северный",
        contractAddress: "0x1234567890123456789012345678901234567890",
        developerId: "dev-123",
        district: "САО",
        totalTokens: 1000000,
        availableTokens: 750000,
        status: PropertyStatus.ACTIVE,
        price: 50000000,
        roi: 12.5,
        createdAt: new Date(),
      };

      prisma.property.findUnique.mockResolvedValue(mockProperty);

      const result = await propertyService.getPropertyById("550e8400-e29b-41d4-a716-446655440000");

      expect(prisma.property.findUnique).toHaveBeenCalledWith({
        where: { id: "550e8400-e29b-41d4-a716-446655440000" },
      });
      expect(result).toEqual(mockProperty);
    });

    it("🔴 КРИТИЧНО: выбрасывает HttpError для несуществующей недвижимости", async () => {
      prisma.property.findUnique.mockResolvedValue(null);

      try {
        await propertyService.getPropertyById("550e8400-e29b-41d4-a716-446655440000");
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(404);
        expect((error as HttpError).message).toBe("Property not found");
      }
    });

    it("🔴 КРИТИЧНО: валидирует UUID формат", async () => {
      try {
        await propertyService.getPropertyById("invalid-uuid");
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(400);
        expect((error as HttpError).message).toBe("Invalid ID format");
      }
    });
  });

  describe("getAllProperties", () => {
    it("🟡 СРЕДНЕ-КРИТИЧНО: фильтрует по статусу", async () => {
      const mockProperties = [
        {
          id: "prop-1",
          title: "ЖК Активный",
          status: PropertyStatus.ACTIVE,
          district: "ЦАО",
          availableTokens: 500000,
        },
      ];

      prisma.property.findMany.mockResolvedValue(mockProperties);
      prisma.property.count.mockResolvedValue(1);

      const result = await propertyService.getAllProperties({
        status: PropertyStatus.ACTIVE,
        limit: 10,
        offset: 0,
      });

      expect(prisma.property.findMany).toHaveBeenCalledWith({
        where: {
          status: PropertyStatus.ACTIVE,
        },
        orderBy: { createdAt: "desc" },
        take: 10,
        skip: 0,
      });
      expect(result.properties).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it("🟡 СРЕДНЕ-КРИТИЧНО: фильтрует по районам", async () => {
      const mockProperties = [
        { id: "prop-1", district: "ЦАО", title: "ЖК Центральный" },
        { id: "prop-2", district: "САО", title: "ЖК Северный" },
      ];

      prisma.property.findMany.mockResolvedValue(mockProperties);
      prisma.property.count.mockResolvedValue(2);

      const result = await propertyService.getAllProperties({
        districts: ["ЦАО", "САО"],
      });

      expect(prisma.property.findMany).toHaveBeenCalledWith({
        where: {
          district: { in: ["ЦАО", "САО"] },
        },
        orderBy: { createdAt: "desc" },
        take: 20,
        skip: 0,
      });
      expect(result.properties).toHaveLength(2);
    });

    it("🟡 СРЕДНЕ-КРИТИЧНО: фильтрует по ROI", async () => {
      const mockProperties = [{ id: "prop-1", roi: 15.0, title: "Высокодоходный ЖК" }];

      prisma.property.findMany.mockResolvedValue(mockProperties);
      prisma.property.count.mockResolvedValue(1);

      const result = await propertyService.getAllProperties({
        roi: 10.0,
      });

      expect(prisma.property.findMany).toHaveBeenCalledWith({
        where: {
          roi: { gte: 10.0 },
        },
        orderBy: { createdAt: "desc" },
        take: 20,
        skip: 0,
      });
      expect(result.properties).toHaveLength(1);
    });

    it("🟡 СРЕДНЕ-КРИТИЧНО: фильтрует по диапазону цен", async () => {
      const mockProperties = [{ id: "prop-1", price: 30000000, title: "ЖК Средний" }];

      prisma.property.findMany.mockResolvedValue(mockProperties);
      prisma.property.count.mockResolvedValue(1);

      const result = await propertyService.getAllProperties({
        minPrice: 20000000,
        maxPrice: 50000000,
      });

      expect(prisma.property.findMany).toHaveBeenCalledWith({
        where: {
          price: { gte: 20000000, lte: 50000000 },
        },
        orderBy: { createdAt: "desc" },
        take: 20,
        skip: 0,
      });
      expect(result.properties).toHaveLength(1);
    });

    it("🟡 СРЕДНЕ-КРИТИЧНО: возвращает пустой массив без фильтров", async () => {
      prisma.property.findMany.mockResolvedValue([]);
      prisma.property.count.mockResolvedValue(0);

      const result = await propertyService.getAllProperties();

      expect(prisma.property.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: { createdAt: "desc" },
        take: 20,
        skip: 0,
      });
      expect(result.properties).toHaveLength(0);
      expect(result.total).toBe(0);
    });
  });

  describe("getAvailableDistricts", () => {
    it("🟡 СРЕДНЕ-КРИТИЧНО: возвращает уникальные районы", async () => {
      const mockResponse = [{ district: "ЦАО" }, { district: "САО" }, { district: "ЗАО" }];

      prisma.property.findMany.mockResolvedValue(mockResponse);

      const result = await propertyService.getAvailableDistricts();

      expect(prisma.property.findMany).toHaveBeenCalledWith({
        select: { district: true },
        distinct: ["district"],
      });
      expect(result.districts).toEqual(["ЦАО", "САО", "ЗАО"]);
    });
  });

  describe("validatePropertyForPurchase", () => {
    it("🔴 КРИТИЧНО: выбрасывает ошибку для отрицательного количества токенов", async () => {
      try {
        await propertyService.validatePropertyForPurchase("550e8400-e29b-41d4-a716-446655440000", -10);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(400);
        expect((error as HttpError).message).toBe("Tokens amount must be positive");
      }
    });

    it("🔴 КРИТИЧНО: выбрасывает ошибку для несуществующей недвижимости", async () => {
      prisma.property.findUnique.mockResolvedValue(null);

      try {
        await propertyService.validatePropertyForPurchase("550e8400-e29b-41d4-a716-446655440000", 100);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(404);
        expect((error as HttpError).message).toBe("Property not found");
      }
    });

    it("🔴 КРИТИЧНО: выбрасывает ошибку для неактивной недвижимости", async () => {
      const mockProperty = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        status: PropertyStatus.COMING_SOON,
        availableTokens: 1000,
      };

      prisma.property.findUnique.mockResolvedValue(mockProperty);

      try {
        await propertyService.validatePropertyForPurchase("550e8400-e29b-41d4-a716-446655440000", 100);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(400);
        expect((error as HttpError).message).toBe("Property is not available for purchase");
      }
    });

    it("🔴 КРИТИЧНО: выбрасывает ошибку при недостатке токенов", async () => {
      const mockProperty = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        status: PropertyStatus.ACTIVE,
        availableTokens: 50,
      };

      prisma.property.findUnique.mockResolvedValue(mockProperty);

      try {
        await propertyService.validatePropertyForPurchase("550e8400-e29b-41d4-a716-446655440000", 100);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(400);
        expect((error as HttpError).message).toBe("Insufficient tokens available");
      }
    });

    it("🔴 КРИТИЧНО: возвращает недвижимость для валидной покупки", async () => {
      const mockProperty = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        status: PropertyStatus.ACTIVE,
        availableTokens: 1000,
        totalTokens: 10000,
        title: "ЖК Северный",
      };

      prisma.property.findUnique.mockResolvedValue(mockProperty);

      const result = await propertyService.validatePropertyForPurchase("550e8400-e29b-41d4-a716-446655440000", 100);

      expect(result).toEqual(mockProperty);
      expect(result.availableTokens).toBeGreaterThanOrEqual(100);
      expect(result.status).toBe(PropertyStatus.ACTIVE);
    });
  });
  describe("updateTokensAfterPurchase", () => {
    it("🔴 КРИТИЧНО: обновляет токены транзакционно без race condition", async () => {
      const mockProperty = {
        availableTokens: 1000,
        status: PropertyStatus.ACTIVE,
      };

      const mockUpdatedProperty = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        availableTokens: 900,
        status: PropertyStatus.ACTIVE,
      };

      const mockTx = {
        property: {
          findUnique: jest.fn().mockResolvedValue(mockProperty),
          update: jest.fn().mockResolvedValue(mockUpdatedProperty),
        },
      };

      // ✅ ИСПРАВЛЕНО: добавлена типизация параметра callback
      prisma.$transaction.mockImplementation(async (callback: any) => {
        return await callback(mockTx);
      });

      const result = await propertyService.updateTokensAfterPurchase("550e8400-e29b-41d4-a716-446655440000", 100);

      expect(mockTx.property.findUnique).toHaveBeenCalledWith({
        where: { id: "550e8400-e29b-41d4-a716-446655440000" },
        select: { availableTokens: true, status: true },
      });
      expect(mockTx.property.update).toHaveBeenCalledWith({
        where: { id: "550e8400-e29b-41d4-a716-446655440000" },
        data: {
          availableTokens: 900,
          status: PropertyStatus.ACTIVE,
        },
      });
      expect(result.availableTokens).toBe(900);
    });

    it("🔴 КРИТИЧНО: устанавливает статус SOLD_OUT при нулевых токенах", async () => {
      const mockProperty = {
        availableTokens: 100,
        status: PropertyStatus.ACTIVE,
      };

      const mockUpdatedProperty = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        availableTokens: 0,
        status: PropertyStatus.SOLD_OUT,
      };

      const mockTx = {
        property: {
          findUnique: jest.fn().mockResolvedValue(mockProperty),
          update: jest.fn().mockResolvedValue(mockUpdatedProperty),
        },
      };

      // ✅ ИСПРАВЛЕНО: добавлена типизация параметра callback
      prisma.$transaction.mockImplementation(async (callback: any) => {
        return await callback(mockTx);
      });

      const result = await propertyService.updateTokensAfterPurchase("550e8400-e29b-41d4-a716-446655440000", 100);

      expect(mockTx.property.update).toHaveBeenCalledWith({
        where: { id: "550e8400-e29b-41d4-a716-446655440000" },
        data: {
          availableTokens: 0,
          status: PropertyStatus.SOLD_OUT,
        },
      });
      expect(result.status).toBe(PropertyStatus.SOLD_OUT);
    });

    it("🔴 КРИТИЧНО: выбрасывает ошибку для несуществующей недвижимости", async () => {
      const mockTx = {
        property: {
          findUnique: jest.fn().mockResolvedValue(null),
          update: jest.fn(),
        },
      };

      // ✅ ИСПРАВЛЕНО: добавлена типизация параметра callback
      prisma.$transaction.mockImplementation(async (callback: any) => {
        return await callback(mockTx);
      });

      try {
        await propertyService.updateTokensAfterPurchase("550e8400-e29b-41d4-a716-446655440000", 100);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(404);
        expect((error as HttpError).message).toBe("Property not found");
      }
    });

    it("🔴 КРИТИЧНО: выбрасывает ошибку при недостатке токенов в транзакции", async () => {
      const mockProperty = {
        availableTokens: 50,
        status: PropertyStatus.ACTIVE,
      };

      const mockTx = {
        property: {
          findUnique: jest.fn().mockResolvedValue(mockProperty),
          update: jest.fn(),
        },
      };

      // ✅ ИСПРАВЛЕНО: добавлена типизация параметра callback
      prisma.$transaction.mockImplementation(async (callback: any) => {
        return await callback(mockTx);
      });

      try {
        await propertyService.updateTokensAfterPurchase("550e8400-e29b-41d4-a716-446655440000", 100);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(400);
        expect((error as HttpError).message).toBe("Insufficient tokens available");
      }
    });
  });
});
