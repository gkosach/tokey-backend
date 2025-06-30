import { PropertyStatus } from "@prisma/client";
import { HttpError } from "../../../src/common";
import { PropertyService } from "../../../src/property/property.service";

const { prisma } = require("../../../src/common");

describe("PropertyService - Critical Tests", () => {
  let propertyService: PropertyService;

  beforeEach(() => {
    propertyService = new PropertyService();
    jest.clearAllMocks();

    prisma.property = {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      update: jest.fn(),
    };
  });

  describe("createProperty", () => {
    it("🔴 КРИТИЧНО: создает недвижимость с правильным статусом COMING_SOON", async () => {
      const propertyData = {
        title: "ЖК Северный",
        contractAddress: "0x1234567890123456789012345678901234567890",
        description: "Элитный ЖК",
        address: "Москва, ул. Тверская, 1",
      };

      const mockCreatedProperty = {
        id: "property-123",
        ...propertyData,
        status: PropertyStatus.COMING_SOON,
        createdAt: new Date(),
        media: null,
        tiers: [],
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
  });

  describe("getPropertyById", () => {
    it("🔴 КРИТИЧНО: возвращает недвижимость для валидного UUID", async () => {
      const mockProperty = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        title: "ЖК Северный",
        contractAddress: "0x1234567890123456789012345678901234567890",
        status: PropertyStatus.ACTIVE,
        createdAt: new Date(),
        description: "Элитный ЖК",
        address: "Москва, ул. Тверская, 1",
        media: null,
        tiers: [],
      };

      prisma.property.findUnique.mockResolvedValue(mockProperty);

      const result = await propertyService.getPropertyById("550e8400-e29b-41d4-a716-446655440000");

      expect(prisma.property.findUnique).toHaveBeenCalledWith({
        where: { id: "550e8400-e29b-41d4-a716-446655440000" },
        include: { tiers: true },
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
    it("🔴 КРИТИЧНО: фильтрует по статусу", async () => {
      const mockProperties = [
        {
          id: "prop-1",
          title: "ЖК Активный",
          status: PropertyStatus.ACTIVE,
          description: "Описание",
          address: "Адрес",
          contractAddress: "0x123...",
          createdAt: new Date(),
          media: null,
          tiers: [],
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
        where: { status: PropertyStatus.ACTIVE },
        orderBy: { createdAt: "desc" },
        take: 10,
        skip: 0,
        include: { tiers: true },
      });
      expect(result.properties).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it("🔴 КРИТИЧНО: возвращает все свойства без фильтров", async () => {
      const mockProperties = [
        {
          id: "prop-1",
          title: "ЖК 1",
          status: PropertyStatus.COMING_SOON,
          description: "Описание",
          address: "Адрес",
          contractAddress: "0x123...",
          createdAt: new Date(),
          media: null,
          tiers: [],
        },
        {
          id: "prop-2",
          title: "ЖК 2",
          status: PropertyStatus.ACTIVE,
          description: "Описание",
          address: "Адрес",
          contractAddress: "0x456...",
          createdAt: new Date(),
          media: null,
          tiers: [],
        },
      ];

      prisma.property.findMany.mockResolvedValue(mockProperties);
      prisma.property.count.mockResolvedValue(2);

      const result = await propertyService.getAllProperties();

      expect(prisma.property.findMany).toHaveBeenCalledWith({
        where: {},
        orderBy: { createdAt: "desc" },
        take: 20,
        skip: 0,
        include: { tiers: true },
      });
      expect(result.properties).toHaveLength(2);
      expect(result.total).toBe(2);
    });
  });

  describe("updatePropertyStatus", () => {
    it("🔴 КРИТИЧНО: обновляет статус для валидного UUID", async () => {
      const mockUpdatedProperty = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        title: "ЖК Северный",
        status: PropertyStatus.SOLD_OUT,
        description: "Описание",
        address: "Адрес",
        contractAddress: "0x123...",
        createdAt: new Date(),
        media: null,
        tiers: [],
      };

      prisma.property.update.mockResolvedValue(mockUpdatedProperty);

      const result = await propertyService.updatePropertyStatus(
        "550e8400-e29b-41d4-a716-446655440000",
        PropertyStatus.SOLD_OUT,
      );

      expect(prisma.property.update).toHaveBeenCalledWith({
        where: { id: "550e8400-e29b-41d4-a716-446655440000" },
        data: { status: PropertyStatus.SOLD_OUT },
      });
      expect(result.status).toBe(PropertyStatus.SOLD_OUT);
    });

    it("🔴 КРИТИЧНО: валидирует UUID перед обновлением", async () => {
      try {
        await propertyService.updatePropertyStatus("invalid-uuid", PropertyStatus.ACTIVE);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(400);
        expect((error as HttpError).message).toBe("Invalid ID format");
      }
    });
  });
});
