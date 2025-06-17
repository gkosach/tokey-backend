import { KycStatus } from "@prisma/client";
import { PersonaInquiryEvent } from "../../../src/kyc/contract/enum/persona-inquiry-event.enum";
import { KycService } from "../../../src/kyc/kyc.service";
import { createAxiosMock } from "../../mocks/axios.mock";
import { createTransactionMock, mockUsers } from "../../mocks/prisma.mock";

const { prisma } = require("../../../src/common");

describe("KycService - Critical Tests", () => {
  let kycService: KycService;
  let mockedAxios: any;
  let apiErrors: any;

  beforeEach(() => {
    kycService = new KycService();
    jest.clearAllMocks();

    const axiosMock = createAxiosMock();
    mockedAxios = axiosMock.mockedAxios;
    apiErrors = axiosMock.apiErrors;

    process.env.PERSONA_API_KEY = "test_api_key";
    process.env.PERSONA_TEMPLATE_ID = "test_template_id";
  });

  describe("initiateVerification", () => {
    it("🔴 КРИТИЧНО: правильно обрабатывает ошибки Persona API при создании нового inquiry", async () => {
      const mockUser = {
        ...mockUsers.kycPending,
        kycStatus: KycStatus.PENDING,
        kycProviderId: null,
      };

      prisma.$transaction.mockImplementation(
        createTransactionMock({
          user: {
            findUniqueOrThrow: jest.fn().mockResolvedValue(mockUser),
            update: jest.fn().mockResolvedValue(mockUser),
          },
        }),
      );

      // 🔧 ИСПРАВЛЕНО: мокаем axios() вместо axios.post()
      const personaError = new Error("Request failed with status code 400");
      (personaError as any).isAxiosError = true;
      (personaError as any).response = {
        status: 400,
        statusText: "Bad Request",
        data: { message: "Invalid template" },
      };

      // Мокаем axios функцию напрямую
      mockedAxios.mockRejectedValueOnce(personaError);

      await expect(kycService.initiateVerification("cognito-123")).rejects.toThrow(
        "KYC provider error: Persona API error: 400 - Invalid template",
      );
    });

    it("🟡 СРЕДНЕ-КРИТИЧНО: успешно создает новый inquiry для пользователя без kycProviderId", async () => {
      const mockUser = {
        ...mockUsers.kycPending,
        kycStatus: KycStatus.PENDING,
        kycProviderId: null,
      };

      prisma.$transaction.mockImplementation(
        createTransactionMock({
          user: {
            findUniqueOrThrow: jest.fn().mockResolvedValue(mockUser),
            update: jest.fn().mockResolvedValue({
              ...mockUser,
              kycStatus: KycStatus.PENDING,
              kycProviderId: "new_inquiry_123",
            }),
          },
        }),
      );
      mockedAxios
        .mockResolvedValueOnce({
          data: { data: { id: "new_inquiry_123" } },
        })
        .mockResolvedValueOnce({
          data: { meta: { "session-token": "session_token_123" } },
        });

      const result = await kycService.initiateVerification("cognito-123");

      expect(result).toEqual({
        inquiryId: "new_inquiry_123",
        sessionToken: "session_token_123",
      });
    });
  });

  describe("getKycStatus", () => {
    it("🔴 КРИТИЧНО: возвращает правильный KYC статус", async () => {
      prisma.user.findUniqueOrThrow.mockResolvedValue({
        kycStatus: KycStatus.COMPLETED,
      });

      const result = await kycService.getKycStatus("cognito-123");

      expect(result).toBe(KycStatus.COMPLETED);
      expect(prisma.user.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { cognitoId: "cognito-123" },
        select: { kycStatus: true },
      });
    });

    it("🔴 КРИТИЧНО: обрабатывает отсутствующих пользователей", async () => {
      const prismaError = new Error("User not found");
      prisma.user.findUniqueOrThrow.mockRejectedValue(prismaError);

      await expect(kycService.getKycStatus("nonexistent")).rejects.toThrow("User not found");
    });
  });

  describe("canCreateWallet", () => {
    it("🆕 КРИТИЧНО: разрешает создание кошелька для COMPLETED KYC", async () => {
      prisma.user.findUnique.mockResolvedValue({
        kycStatus: KycStatus.COMPLETED,
      });

      const result = await kycService.canCreateWallet("cognito-123");

      expect(result).toBe(true);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { cognitoId: "cognito-123" },
        select: { kycStatus: true },
      });
    });

    it("🆕 КРИТИЧНО: блокирует создание кошелька для PENDING KYC", async () => {
      prisma.user.findUnique.mockResolvedValue({
        kycStatus: KycStatus.PENDING,
      });

      const result = await kycService.canCreateWallet("cognito-123");

      expect(result).toBe(false);
    });

    it("🆕 КРИТИЧНО: блокирует создание кошелька для APPROVED KYC", async () => {
      prisma.user.findUnique.mockResolvedValue({
        kycStatus: KycStatus.APPROVED,
      });

      const result = await kycService.canCreateWallet("cognito-123");

      expect(result).toBe(false);
    });

    it("🆕 КРИТИЧНО: возвращает false для несуществующего пользователя", async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const result = await kycService.canCreateWallet("nonexistent");

      expect(result).toBe(false);
    });
  });

  describe("canPerformOperations", () => {
    it("🟡 СРЕДНЕ-КРИТИЧНО: разрешает операции для завершенного KYC (COMPLETED)", async () => {
      // 🔧 ИСПРАВЛЕНО: используем правильный mock для findUniqueOrThrow
      prisma.user.findUniqueOrThrow.mockResolvedValue({
        kycStatus: KycStatus.COMPLETED,
      });

      const result = await kycService.canPerformOperations("cognito-123");

      expect(result).toBe(true);
      expect(prisma.user.findUniqueOrThrow).toHaveBeenCalledWith({
        where: { cognitoId: "cognito-123" },
        select: { kycStatus: true },
      });
    });

    it("🟡 СРЕДНЕ-КРИТИЧНО: блокирует операции для незавершенного KYC", async () => {
      // 🔧 ИСПРАВЛЕНО: используем правильный mock для findUniqueOrThrow
      prisma.user.findUniqueOrThrow.mockResolvedValue({
        kycStatus: KycStatus.PENDING,
      });

      const result = await kycService.canPerformOperations("cognito-123");

      expect(result).toBe(false);
    });

    it("🟡 СРЕДНЕ-КРИТИЧНО: блокирует операции для APPROVED KYC", async () => {
      prisma.user.findUniqueOrThrow.mockResolvedValue({
        kycStatus: KycStatus.APPROVED,
      });

      const result = await kycService.canPerformOperations("cognito-123");

      expect(result).toBe(false);
    });
  });

  describe("handleWebhook", () => {
    it("🆕 КРИТИЧНО: обновляет статус на COMPLETED при approved", async () => {
      const mockUser = {
        cognitoId: "cognito-123",
        kycStatus: KycStatus.PENDING,
      };

      prisma.user.findFirst.mockResolvedValue(mockUser);
      prisma.user.update.mockResolvedValue({
        ...mockUser,
        kycStatus: KycStatus.COMPLETED,
        kycCompletedAt: new Date(),
      });

      await kycService.handleWebhook("verification_123", PersonaInquiryEvent.APPROVED);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { cognitoId: "cognito-123" },
        data: {
          kycStatus: KycStatus.COMPLETED,
          kycCompletedAt: expect.any(Date),
        },
      });
    });

    it("🆕 КРИТИЧНО: обновляет статус на REJECTED при declined", async () => {
      const mockUser = {
        cognitoId: "cognito-123",
        kycStatus: KycStatus.PENDING,
      };

      prisma.user.findFirst.mockResolvedValue(mockUser);
      prisma.user.update.mockResolvedValue({
        ...mockUser,
        kycStatus: KycStatus.REJECTED,
      });

      await kycService.handleWebhook("verification_123", PersonaInquiryEvent.DECLINED);

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { cognitoId: "cognito-123" },
        data: {
          kycStatus: KycStatus.REJECTED,
          kycCompletedAt: null,
        },
      });
    });

    it("🆕 КРИТИЧНО: выбрасывает ошибку для несуществующей верификации", async () => {
      prisma.user.findFirst.mockResolvedValue(null);

      await expect(kycService.handleWebhook("nonexistent_verification", PersonaInquiryEvent.APPROVED)).rejects.toThrow(
        "Verification not found",
      );
    });
  });

  describe("getKycDetails", () => {
    it("🆕 КРИТИЧНО: возвращает детальную информацию о KYC", async () => {
      const mockUser = {
        kycStatus: KycStatus.COMPLETED,
        kycProviderId: "verification_123",
        kycCompletedAt: new Date("2024-01-01"),
      };

      prisma.user.findUniqueOrThrow.mockResolvedValue(mockUser);

      const result = await kycService.getKycDetails("cognito-123");

      expect(result).toEqual({
        status: KycStatus.COMPLETED,
        verificationId: "verification_123",
        completedAt: mockUser.kycCompletedAt,
        walletEnabled: true,
      });
    });

    it("🆕 КРИТИЧНО: walletEnabled = false для незавершенного KYC", async () => {
      const mockUser = {
        kycStatus: KycStatus.PENDING,
        kycProviderId: "verification_123",
        kycCompletedAt: null,
      };

      prisma.user.findUniqueOrThrow.mockResolvedValue(mockUser);

      const result = await kycService.getKycDetails("cognito-123");

      expect(result.walletEnabled).toBe(false);
    });

    it("🆕 КРИТИЧНО: walletEnabled = false для APPROVED KYC", async () => {
      const mockUser = {
        kycStatus: KycStatus.APPROVED,
        kycProviderId: "verification_123",
        kycCompletedAt: new Date("2024-01-01"),
      };

      prisma.user.findUniqueOrThrow.mockResolvedValue(mockUser);

      const result = await kycService.getKycDetails("cognito-123");

      expect(result.walletEnabled).toBe(false);
    });
  });
});
