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

  // 🔴 КРИТИЧНО: Создание пользователя (основа системы)
  // Риск: Неправильные default значения = нарушение безопасности
  // Влияние: Все новые пользователи будут созданы с неправильными данными
  describe("createUser", () => {
    it("🔴 КРИТИЧНО: создает пользователя с правильными default значениями", async () => {
      const userData = { cognitoId: "new-123", email: "new@tokey.com" };
      const mockCreatedUser = {
        id: "user-456",
        ...userData,
        walletAddress: null, // КРИТИЧНО: должен быть null до создания кошелька
        kycStatus: KycStatus.PENDING, // КРИТИЧНО: должен быть PENDING по умолчанию
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
          kycStatus: KycStatus.PENDING, // КРИТИЧНО: проверяем default статус
        },
      });
      expect(result.kycStatus).toBe(KycStatus.PENDING);
      expect(result.walletAddress).toBeNull(); // КРИТИЧНО: кошелек создается отдельно
    });

    it("🔴 КРИТИЧНО: обрабатывает дублирование пользователей", async () => {
      // Риск: Дублирование пользователей = нарушение уникальности
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
      ).rejects.toThrow();
    });
  });

  // 🔴 КРИТИЧНО: Поиск пользователя (используется во всех модулях)
  // Риск: Неправильный поиск = падение всей системы
  // Влияние: Все операции с пользователями перестанут работать
  describe("getUserByCognitoId", () => {
    it("🔴 КРИТИЧНО: возвращает пользователя с кошельком", async () => {
      // Этот метод используется в: WalletService, TokenService, KycService
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        email: "test@tokey.com",
        kycStatus: KycStatus.COMPLETED,
        wallet: {
          // КРИТИЧНО: должен включать wallet для других модулей
          polygonAddress: "0x123...",
          tatumWalletId: "tatum_123",
          status: "active",
        },
      };

      prisma.user.findUniqueOrThrow.mockResolvedValue(mockUser);

      const result = await userService.getUserByCognitoId("cognito-123");

      expect(prisma.user.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { cognitoId: "cognito-123" },
        include: { wallet: true }, // КРИТИЧНО: wallet нужен для других сервисов
      });
      expect(result).toEqual(mockUser);
    });

    it("🔴 КРИТИЧНО: выбрасывает правильную ошибку при отсутствии пользователя", async () => {
      // Риск: Неправильная ошибка = неправильная обработка в других модулях
      const prismaError = new Prisma.PrismaClientKnownRequestError("Not found", {
        code: "P2025",
        clientVersion: "5.0.0",
      });
      prisma.user.findUniqueOrThrow.mockRejectedValue(prismaError);

      await expect(userService.getUserByCognitoId("nonexistent")).rejects.toThrow(UserError);
    });
  });

  // 🟡 СРЕДНЯЯ КРИТИЧНОСТЬ: Обновление email (безопасность аккаунта)
  // Риск: Дублирование email = нарушение уникальности
  // Влияние: Проблемы с авторизацией и восстановлением паролей
  describe("updateUserEmail", () => {
    it("🟡 СРЕДНЕ-КРИТИЧНО: предотвращает дублирование email", async () => {
      // Риск: Два пользователя с одним email = проблемы с авторизацией
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
      // Риск: Неправильная обработка ошибок = потеря данных
      const prismaError = new Prisma.PrismaClientKnownRequestError("Database error", {
        code: "P2003",
        clientVersion: "5.0.0",
      });
      prisma.user.update.mockRejectedValue(prismaError);

      await expect(userService.updateUserEmail("cognito-123", "new@email.com")).rejects.toThrow("Email update failed");
    });
  });
});
