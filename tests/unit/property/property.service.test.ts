import { Prisma, PropertyStatus } from "@prisma/client";
import { PropertyError } from "../../../src/common";
import { PropertyService } from "../../../src/property/property.service";

const { prisma } = require("../../../src/common");

describe("PropertyService - Critical Tests", () => {
  let propertyService: PropertyService;

  beforeEach(() => {
    propertyService = new PropertyService();
    jest.clearAllMocks();

    // ✅ ИСПРАВЛЕНО: Мокаем все методы Prisma
    prisma.property = {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      update: jest.fn(),
    };
  });

  // 🔴 КРИТИЧНО: Создание недвижимости (основа инвестиционной платформы)
  // Риск: Неправильные данные = потеря инвестиций и доверия
  // Влияние: Инвесторы не смогут покупать токены недвижимости
  describe("createProperty", () => {
    it("🔴 КРИТИЧНО: создает недвижимость с правильными default значениями", async () => {
      const propertyData = {
        title: "ЖК Северный",
        contractAddress: "0x1234567890123456789012345678901234567890",
        developerId: "dev-123",
        district: "САО",
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
      expect(result.totalTokens).toBe(1000000);
      expect(result.availableTokens).toBe(1000000);
    });

    it("🔴 КРИТИЧНО: обрабатывает дублирование contract address", async () => {
      const prismaError = new Prisma.PrismaClientKnownRequestError("Unique constraint", {
        code: "P2002",
        clientVersion: "5.0.0",
        meta: { target: ["contract_address"] },
      });
      prisma.property.create.mockRejectedValue(prismaError);

      await expect(
        propertyService.createProperty({
          title: "Дубликат",
          contractAddress: "0x1234567890123456789012345678901234567890",
          developerId: "dev-123",
          district: "ЦАО",
          totalTokens: 500000,
          availableTokens: 500000,
        }),
      ).rejects.toThrow();
    });
  });

  // 🔴 КРИТИЧНО: Поиск недвижимости (используется в TokenService для покупок)
  // Риск: Неправильный поиск = невозможность покупки токенов
  // Влияние: Инвесторы не смогут инвестировать в конкретные объекты
  describe("getPropertyById", () => {
    it("🔴 КРИТИЧНО: возвращает недвижимость для покупки токенов", async () => {
      const mockProperty = {
        id: "550e8400-e29b-41d4-a716-446655440000", // ✅ Валидный UUID
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
      expect(result.availableTokens).toBeGreaterThan(0);
      expect(result.status).toBe(PropertyStatus.ACTIVE);
    });

    it("🔴 КРИТИЧНО: выбрасывает PropertyError.notFound для несуществующей недвижимости", async () => {
      prisma.property.findUnique.mockResolvedValue(null);

      await expect(propertyService.getPropertyById("550e8400-e29b-41d4-a716-446655440000")).rejects.toThrow(
        PropertyError,
      );
    });

    it("🔴 КРИТИЧНО: валидирует UUID формат", async () => {
      // ✅ ИСПРАВЛЕНО: Этот тест должен проходить - валидация работает правильно
      await expect(propertyService.getPropertyById("invalid-uuid")).rejects.toThrow("Invalid ID format");
    });
  });

  // 🟡 СРЕДНЯЯ КРИТИЧНОСТЬ: Фильтрация недвижимости (пользовательский опыт)
  describe("getAllProperties", () => {
    it("🟡 СРЕДНЕ-КРИТИЧНО: фильтрует по статусу COMING_SOON", async () => {
      const mockProperties = [
        {
          id: "prop-1",
          title: "ЖК Активный",
          status: PropertyStatus.COMING_SOON,
          district: "ЦАО",
          availableTokens: 500000,
        },
      ];

      prisma.property.findMany.mockResolvedValue(mockProperties);
      prisma.property.count.mockResolvedValue(1);

      const result = await propertyService.getAllProperties({
        status: PropertyStatus.COMING_SOON,
        limit: 10,
        offset: 0,
      });

      expect(prisma.property.findMany).toHaveBeenCalledWith({
        where: {
          status: PropertyStatus.COMING_SOON,
          district: { contains: "" },
          price: { gte: 0, lte: 100000000000000000000 },
          roi: { gte: 0 },
        },
        orderBy: { createdAt: "desc" },
        take: 10,
        skip: 0,
      });
      expect(result.properties).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it("🟡 СРЕДНЕ-КРИТИЧНО: фильтрует по району", async () => {
      const mockProperties = [{ id: "prop-1", district: "Forest Hill", title: "Forest Hill Mansion" }];

      prisma.property.findMany.mockResolvedValue(mockProperties);
      prisma.property.count.mockResolvedValue(1);

      const result = await propertyService.getAllProperties({
        district: "Forest Hill",
      });

      expect(prisma.property.findMany).toHaveBeenCalledWith({
        where: {
          district: { contains: "Forest Hill" },
          price: { gte: 0, lte: 100000000000000000000 },
          roi: { gte: 0 },
        },
        orderBy: { createdAt: "desc" },
        take: 20,
        skip: 0,
      });
      expect(result.properties).toHaveLength(1);
    });
  });

  // 🟡 СРЕДНЯЯ КРИТИЧНОСТЬ: Обновление статуса (жизненный цикл недвижимости)
  describe("updatePropertyStatus", () => {
    it("🟡 СРЕДНЕ-КРИТИЧНО: обновляет статус на SOLD_OUT", async () => {
      const mockUpdatedProperty = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        title: "ЖК Северный",
        status: PropertyStatus.SOLD_OUT,
        availableTokens: 0,
        totalTokens: 1000000,
      };

      prisma.property.update.mockResolvedValue(mockUpdatedProperty);

      const result = await propertyService.updatePropertyStatus(
        "550e8400-e29b-41d4-a716-446655440000", // ✅ Валидный UUID
        PropertyStatus.SOLD_OUT,
      );

      expect(prisma.property.update).toHaveBeenCalledWith({
        where: { id: "550e8400-e29b-41d4-a716-446655440000" },
        data: { status: PropertyStatus.SOLD_OUT },
      });
      expect(result.status).toBe(PropertyStatus.SOLD_OUT);
    });

    it("🟡 СРЕДНЕ-КРИТИЧНО: валидирует UUID перед обновлением", async () => {
      // ✅ ИСПРАВЛЕНО: Этот тест должен проходить - валидация работает правильно
      await expect(propertyService.updatePropertyStatus("invalid-uuid", PropertyStatus.ACTIVE)).rejects.toThrow(
        "Invalid ID format",
      );
    });
  });
});
