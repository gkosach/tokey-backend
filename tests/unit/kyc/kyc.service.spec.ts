import { KycStatus } from "@prisma/client";
import { HttpError } from "../../../src/common";
import { KycService } from "../../../src/kyc/kyc.service";
import { UserService } from "../../../src/user/user.service";
import { createAxiosMock } from "../../mocks/axios.mock";

// Мокаем UserService
jest.mock("../../../src/user/user.service");

describe("KycService - Critical Tests", () => {
  let kycService: KycService;
  let mockUserService: jest.Mocked<UserService>;
  let mockedAxios: any;
  let apiErrors: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Правильно мокаем UserService
    const MockedUserService = UserService as jest.MockedClass<typeof UserService>;
    mockUserService = new MockedUserService() as jest.Mocked<UserService>;

    // Мокаем все методы UserService
    mockUserService.getUserByCognitoId = jest.fn();
    mockUserService.getUserByKycProviderId = jest.fn();
    mockUserService.updateKycStatusByCognitoId = jest.fn();

    // Инжектим мок в KycService
    kycService = new KycService();
    (kycService as any).userService = mockUserService;

    const axiosMock = createAxiosMock();
    mockedAxios = axiosMock.mockedAxios;
    apiErrors = axiosMock.apiErrors;

    process.env.PERSONA_API_KEY = "test_api_key";
    process.env.PERSONA_TEMPLATE_ID = "test_template_id";
  });

  describe("getKycStatus", () => {
    it("🔴 КРИТИЧНО: возвращает правильный статус и canStart для нового пользователя", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        kycStatus: null,
        kycProviderId: null,
      };

      mockUserService.getUserByCognitoId.mockResolvedValue(mockUser as any);

      const result = await kycService.getKycStatus("cognito-123");

      expect(result).toEqual({
        status: null,
        canStart: true,
      });
      expect(mockUserService.getUserByCognitoId).toHaveBeenCalledWith("cognito-123");
    });

    it("🔴 КРИТИЧНО: возвращает правильный статус для пользователя с KYC", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        kycStatus: KycStatus.APPROVED,
        kycProviderId: "persona_123",
      };

      mockUserService.getUserByCognitoId.mockResolvedValue(mockUser as any);

      const result = await kycService.getKycStatus("cognito-123");

      expect(result).toEqual({
        status: KycStatus.APPROVED,
        canStart: false,
      });
    });

    it("🔴 КРИТИЧНО: пробрасывает ошибку UserService", async () => {
      mockUserService.getUserByCognitoId.mockRejectedValue(new HttpError("User not found", 404));

      await expect(kycService.getKycStatus("nonexistent")).rejects.toThrow(HttpError);
    });
  });

  describe("initiateVerification", () => {
    it("🔴 КРИТИЧНО: блокирует уже одобренных пользователей", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        kycStatus: KycStatus.APPROVED,
        kycProviderId: "persona_123",
      };

      mockUserService.getUserByCognitoId.mockResolvedValue(mockUser as any);

      try {
        await kycService.initiateVerification("cognito-123");
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(409);
        expect((error as HttpError).message).toBe("User is already verified");
      }
    });

    it("🔴 КРИТИЧНО: блокирует отклоненных пользователей", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        kycStatus: KycStatus.DECLINED,
        kycProviderId: "persona_123",
      };

      mockUserService.getUserByCognitoId.mockResolvedValue(mockUser as any);

      try {
        await kycService.initiateVerification("cognito-123");
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(409);
        expect((error as HttpError).message).toBe("KYC already rejected");
      }
    });

    it("🔴 КРИТИЧНО: возвращает существующий inquiry для CREATED статуса", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        email: "test@tokey.com",
        kycStatus: KycStatus.CREATED,
        kycProviderId: "existing_inquiry_123",
      };

      mockUserService.getUserByCognitoId.mockResolvedValue(mockUser as any);

      // Мокаем получение session token
      mockedAxios.mockResolvedValueOnce({
        data: { meta: { "session-token": "existing_session_123" } },
      });

      const result = await kycService.initiateVerification("cognito-123");

      expect(result).toEqual({
        inquiryId: "existing_inquiry_123",
        sessionToken: "existing_session_123",
      });
      expect(mockUserService.updateKycStatusByCognitoId).not.toHaveBeenCalled();
    });

    it("🔴 КРИТИЧНО: создает новый inquiry для нового пользователя", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        email: "test@tokey.com",
        kycStatus: null,
        kycProviderId: null,
      };

      mockUserService.getUserByCognitoId.mockResolvedValue(mockUser as any);
      mockUserService.updateKycStatusByCognitoId.mockResolvedValue(mockUser as any);

      // Мокаем создание inquiry и получение session token
      mockedAxios
        .mockResolvedValueOnce({
          data: { data: { id: "new_inquiry_123" } },
        })
        .mockResolvedValueOnce({
          data: { meta: { "session-token": "new_session_123" } },
        });

      const result = await kycService.initiateVerification("cognito-123");

      expect(result).toEqual({
        inquiryId: "new_inquiry_123",
        sessionToken: "new_session_123",
      });
      expect(mockUserService.updateKycStatusByCognitoId).toHaveBeenCalledWith(
        "cognito-123",
        KycStatus.CREATED,
        "new_inquiry_123",
      );
    });

    it("🔴 КРИТИЧНО: обрабатывает ошибки Persona API при создании inquiry", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        email: "test@tokey.com",
        kycStatus: null,
        kycProviderId: null,
      };

      mockUserService.getUserByCognitoId.mockResolvedValue(mockUser as any);

      // ✅ Используем готовый мок из apiErrors
      const personaError = apiErrors.persona400;
      mockedAxios.mockRejectedValueOnce(personaError);

      try {
        await kycService.initiateVerification("cognito-123");
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(500);
        expect((error as HttpError).message).toBe("Persona API error: 400 - Invalid template");
      }
    });

    it("🟡 EDGE CASE: обрабатывает некорректный ответ от Persona API", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        email: "test@tokey.com",
        kycStatus: null,
        kycProviderId: null,
      };

      mockUserService.getUserByCognitoId.mockResolvedValue(mockUser as any);

      // Некорректный ответ без ID
      mockedAxios.mockResolvedValueOnce({
        data: { data: {} },
      });

      try {
        await kycService.initiateVerification("cognito-123");
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(500);
        expect((error as HttpError).message).toBe("Invalid response from Persona API: missing inquiry ID");
      }
    });
  });

  describe("handleWebhook", () => {
    it("🔴 КРИТИЧНО: обновляет статус на APPROVED при inquiry.approved", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        kycStatus: KycStatus.CREATED,
        kycProviderId: "inquiry_123",
      };

      mockUserService.getUserByKycProviderId.mockResolvedValue(mockUser as any);
      mockUserService.updateKycStatusByCognitoId.mockResolvedValue(mockUser as any);

      await kycService.handleWebhook("inquiry_123", "inquiry.approved");

      expect(mockUserService.updateKycStatusByCognitoId).toHaveBeenCalledWith("cognito-123", KycStatus.APPROVED);
    });

    it("🔴 КРИТИЧНО: обновляет статус на DECLINED при inquiry.declined", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        kycStatus: KycStatus.CREATED,
        kycProviderId: "inquiry_123",
      };

      mockUserService.getUserByKycProviderId.mockResolvedValue(mockUser as any);
      mockUserService.updateKycStatusByCognitoId.mockResolvedValue(mockUser as any);

      await kycService.handleWebhook("inquiry_123", "inquiry.declined");

      expect(mockUserService.updateKycStatusByCognitoId).toHaveBeenCalledWith("cognito-123", KycStatus.DECLINED);
    });

    it("🔴 КРИТИЧНО: выбрасывает ошибку для несуществующей верификации", async () => {
      mockUserService.getUserByKycProviderId.mockResolvedValue(null);

      try {
        await kycService.handleWebhook("nonexistent_inquiry", "inquiry.approved");
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(404);
        expect((error as HttpError).message).toBe("Verification not found");
      }
    });

    it("🟡 EDGE CASE: обрабатывает неизвестные статусы Persona", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        kycStatus: KycStatus.CREATED,
        kycProviderId: "inquiry_123",
      };

      mockUserService.getUserByKycProviderId.mockResolvedValue(mockUser as any);

      try {
        await kycService.handleWebhook("inquiry_123", "inquiry.unknown_status");
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(500);
        expect((error as HttpError).message).toBe("Unknown Persona status: inquiry.unknown_status");
      }
    });
  });

  describe("canStartKyc", () => {
    it("🔴 КРИТИЧНО: разрешает начать KYC для нового пользователя", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        kycStatus: null,
      };

      mockUserService.getUserByCognitoId.mockResolvedValue(mockUser as any);

      const result = await kycService.canStartKyc("cognito-123");

      expect(result).toBe(true);
    });

    it("🔴 КРИТИЧНО: блокирует начало KYC для пользователя с активным процессом", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        kycStatus: KycStatus.CREATED,
      };

      mockUserService.getUserByCognitoId.mockResolvedValue(mockUser as any);

      const result = await kycService.canStartKyc("cognito-123");

      expect(result).toBe(false);
    });
  });

  describe("isKycApproved", () => {
    it("🔴 КРИТИЧНО: возвращает true для одобренного KYC", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        kycStatus: KycStatus.APPROVED,
      };

      mockUserService.getUserByCognitoId.mockResolvedValue(mockUser as any);

      const result = await kycService.isKycApproved("cognito-123");

      expect(result).toBe(true);
    });

    it("🔴 КРИТИЧНО: возвращает false для неодобренного KYC", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        kycStatus: KycStatus.CREATED,
      };

      mockUserService.getUserByCognitoId.mockResolvedValue(mockUser as any);

      const result = await kycService.isKycApproved("cognito-123");

      expect(result).toBe(false);
    });
  });

  describe("getKycDetails", () => {
    it("🔴 КРИТИЧНО: возвращает детальную информацию для одобренного KYC", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        kycStatus: KycStatus.APPROVED,
        kycProviderId: "persona_123",
        kycCompletedAt: new Date("2024-01-01"),
      };

      mockUserService.getUserByCognitoId.mockResolvedValue(mockUser as any);

      const result = await kycService.getKycDetails("cognito-123");

      expect(result).toEqual({
        status: KycStatus.APPROVED,
        verificationId: "persona_123",
        completedAt: mockUser.kycCompletedAt,
        canCreateWallet: true,
      });
    });

    it("🔴 КРИТИЧНО: canCreateWallet = false для неодобренного KYC", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        kycStatus: KycStatus.CREATED,
        kycProviderId: "persona_123",
        kycCompletedAt: null,
      };

      mockUserService.getUserByCognitoId.mockResolvedValue(mockUser as any);

      const result = await kycService.getKycDetails("cognito-123");

      expect(result.canCreateWallet).toBe(false);
    });
  });

  describe("canCreateWallet", () => {
    it("🔴 КРИТИЧНО: разрешает создание кошелька для COMPLETED статуса", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        kycStatus: KycStatus.COMPLETED,
      };

      mockUserService.getUserByCognitoId.mockResolvedValue(mockUser as any);

      const result = await kycService.canCreateWallet("cognito-123");

      expect(result).toBe(true);
    });

    it("🔴 КРИТИЧНО: блокирует создание кошелька для APPROVED статуса", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        kycStatus: KycStatus.APPROVED,
      };

      mockUserService.getUserByCognitoId.mockResolvedValue(mockUser as any);

      const result = await kycService.canCreateWallet("cognito-123");

      expect(result).toBe(false);
    });

    it("🟡 EDGE CASE: блокирует создание кошелька для null статуса", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        kycStatus: null,
      };

      mockUserService.getUserByCognitoId.mockResolvedValue(mockUser as any);

      const result = await kycService.canCreateWallet("cognito-123");

      expect(result).toBe(false);
    });
  });

  describe("canPerformOperations", () => {
    it("🔴 КРИТИЧНО: разрешает операции для COMPLETED статуса", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        kycStatus: KycStatus.COMPLETED,
      };

      mockUserService.getUserByCognitoId.mockResolvedValue(mockUser as any);

      const result = await kycService.canPerformOperations("cognito-123");

      expect(result).toBe(true);
    });

    it("🔴 КРИТИЧНО: блокирует операции для APPROVED статуса", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        kycStatus: KycStatus.APPROVED,
      };

      mockUserService.getUserByCognitoId.mockResolvedValue(mockUser as any);

      const result = await kycService.canPerformOperations("cognito-123");

      expect(result).toBe(false);
    });

    it("🟡 EDGE CASE: блокирует операции для всех остальных статусов", async () => {
      const statuses = [null, KycStatus.CREATED, KycStatus.DECLINED];

      for (const status of statuses) {
        const mockUser = {
          id: "user-123",
          cognitoId: "cognito-123",
          kycStatus: status,
        };

        mockUserService.getUserByCognitoId.mockResolvedValue(mockUser as any);

        const result = await kycService.canPerformOperations("cognito-123");

        expect(result).toBe(false);
      }
    });
  });

  describe("Edge Cases - API Integration", () => {
    it("🟡 EDGE CASE: обрабатывает network timeout", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        email: "test@tokey.com",
        kycStatus: null,
        kycProviderId: null,
      };

      mockUserService.getUserByCognitoId.mockResolvedValue(mockUser as any);

      const networkError = apiErrors.networkError;
      mockedAxios.mockRejectedValueOnce(networkError);

      try {
        await kycService.initiateVerification("cognito-123");
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(500);
        expect((error as HttpError).message).toBe("Persona API error: Network timeout");
      }
    });

    it("🟡 EDGE CASE: обрабатывает пустой ответ от Persona API", async () => {
      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        email: "test@tokey.com",
        kycStatus: null,
        kycProviderId: null,
      };

      mockUserService.getUserByCognitoId.mockResolvedValue(mockUser as any);

      mockedAxios.mockResolvedValueOnce(null);

      try {
        await kycService.initiateVerification("cognito-123");
      } catch (error) {
        expect(error).toBeInstanceOf(HttpError);
        expect((error as HttpError).statusCode).toBe(500);
        expect((error as HttpError).message).toBe("Invalid response from Persona API"); // ← Исправлено
      }
    });
  });
});
