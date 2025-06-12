import { KycStatus } from "@prisma/client";
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
    it("🔴 КРИТИЧНО: правильно обрабатывает ошибки Persona API", async () => {
      const mockUser = mockUsers.kycPending;

      prisma.$transaction.mockImplementation(
        createTransactionMock({
          user: {
            findUniqueOrThrow: jest.fn().mockResolvedValue(mockUser),
          },
        }),
      );

      mockedAxios.post.mockRejectedValue(apiErrors.persona400);

      await expect(kycService.initiateVerification("cognito-123")).rejects.toThrow(
        "KYC provider error: Persona API error: 400 - Invalid template",
      );
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

  describe("canPerformOperations", () => {
    it("🟡 СРЕДНЕ-КРИТИЧНО: разрешает операции для завершенного KYC", async () => {
      jest.spyOn(kycService, "getKycStatus").mockResolvedValue(KycStatus.COMPLETED);

      const result = await kycService.canPerformOperations("cognito-123");

      expect(result).toBe(true);
    });

    it("🟡 СРЕДНЕ-КРИТИЧНО: блокирует операции для незавершенного KYC", async () => {
      jest.spyOn(kycService, "getKycStatus").mockResolvedValue(KycStatus.PENDING);

      const result = await kycService.canPerformOperations("cognito-123");

      expect(result).toBe(false);
    });
  });
});
