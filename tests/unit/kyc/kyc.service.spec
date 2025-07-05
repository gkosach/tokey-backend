import { KycStatus } from "@prisma/client";
import { PersonaProvider } from "../../../src/common";
import { KycService } from "../../../src/kyc/kyc.service";
import { UserService } from "../../../src/user/user.service";

describe("KycService - Critical Tests", () => {
  let kycService: KycService;
  let userServiceMock: jest.Mocked<UserService>;
  let personaProviderMock: jest.Mocked<PersonaProvider>;

  beforeEach(() => {
    jest.clearAllMocks();

    userServiceMock = {
      getUserByCognitoId: jest.fn(),
      getUserByKycProviderId: jest.fn(),
      updateKycStatus: jest.fn(),
    } as any;

    personaProviderMock = {
      handleWebhook: jest.fn(),
      initiateVerification: jest.fn(),
    } as any;

    kycService = new KycService(userServiceMock, personaProviderMock);
  });

  describe("getKycStatus", () => {
    it("🟢 возвращает статус и флаг canStart", async () => {
      const cognitoId = "cognito-123";
      const mockUser = {
        id: "user-123",
        cognitoId,
        kycStatus: KycStatus.CREATED,
      };

      userServiceMock.getUserByCognitoId.mockResolvedValue(mockUser as any);

      const result = await kycService.getKycStatus(cognitoId);

      expect(result.status).toBe(KycStatus.CREATED);
      expect(result.canStart).toBe(true);
    });
  });

  describe("initiateVerification", () => {
    it("🟢 инициирует верификацию и обновляет статус", async () => {
      const cognitoId = "cognito-123";
      const mockUser = {
        id: "user-123",
        email: "test@tokey.com",
        kycStatus: null,
      };

      const mockVerification = {
        inquiryId: "inquiry_123",
        sessionToken: "session_token_456",
      };

      userServiceMock.getUserByCognitoId.mockResolvedValue(mockUser as any);
      personaProviderMock.initiateVerification.mockResolvedValue(mockVerification);

      const result = await kycService.initiateVerification(cognitoId);

      expect(result).toEqual(mockVerification);
      expect(userServiceMock.updateKycStatus).toHaveBeenCalledWith(cognitoId, KycStatus.CREATED, "inquiry_123");
    });
  });

  describe("handleWebhook", () => {
    it("🟢 обрабатывает APPROVED и обновляет статус", async () => {
      const payload = {
        data: {
          attributes: { status: "approved" },
          relationships: {
            inquiry: {
              data: { id: "inquiry_123" },
            },
          },
        },
      };

      const mockUser = {
        id: "user-123",
        cognitoId: "cognito-123",
        kycProviderId: "inquiry_123",
      };

      personaProviderMock.handleWebhook.mockResolvedValue(KycStatus.APPROVED);
      userServiceMock.getUserByKycProviderId.mockResolvedValue(mockUser as any);

      await kycService.handleWebhook(payload);

      expect(userServiceMock.updateKycStatus).toHaveBeenCalledWith("cognito-123", KycStatus.APPROVED, "inquiry_123");
    });
  });

  describe("getKycDetails", () => {
    it("🟢 возвращает детали KYC", async () => {
      const cognitoId = "cognito-123";
      const mockUser = {
        kycStatus: KycStatus.APPROVED,
        kycProviderId: "inquiry_123",
        kycCompletedAt: new Date(),
      };

      userServiceMock.getUserByCognitoId.mockResolvedValue(mockUser as any);

      const result = await kycService.getKycDetails(cognitoId);

      expect(result).toEqual({
        status: KycStatus.APPROVED,
        verificationId: "inquiry_123",
        completedAt: mockUser.kycCompletedAt,
      });
    });
  });
});
