import { KycStatus } from "@prisma/client";
import { PersonaProvider } from "../../../src/common";
import { KycService } from "../../../src/user/kyc/kyc.service";
import { UserService } from "../../../src/user/user.service";
import { WalletService } from "../../../src/wallet/wallet.service";

describe("KycService - Critical Test", () => {
  let kycService: KycService;
  let userServiceMock: jest.Mocked<UserService>;
  let personaProviderMock: jest.Mocked<PersonaProvider>;
  let walletServiceMock: jest.Mocked<WalletService>;

  beforeEach(() => {
    jest.clearAllMocks();

    // Создаем моки
    userServiceMock = {
      getUserByKycProviderId: jest.fn(),
      updateKycStatus: jest.fn(),
      getUserByCognitoId: jest.fn(), // Обязательно добавить этот метод
    } as any;

    personaProviderMock = {
      handleWebhook: jest.fn(),
      initiateVerification: jest.fn(),
    } as any;

    walletServiceMock = {
      getWalletByUserId: jest.fn(),
      createWalletForUser: jest.fn(),
    } as any;

    // Создаем экземпляр сервиса с моками
    kycService = new KycService(userServiceMock, personaProviderMock, walletServiceMock);
  });

  it("🔴 КРИТИЧНО: обновляет статус на APPROVED и создает кошелек", async () => {
    // 1. Подготовка данных
    const mockUser = {
      id: "user-123",
      cognitoId: "cognito-123",
      kycStatus: KycStatus.CREATED,
      kycProviderId: "inquiry_123",
    };

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

    // 2. Настройка моков
    userServiceMock.getUserByKycProviderId.mockResolvedValue(mockUser as any);
    userServiceMock.getUserByCognitoId.mockResolvedValue(mockUser as any); // Критично важный мок!
    personaProviderMock.handleWebhook.mockResolvedValue(KycStatus.APPROVED);
    walletServiceMock.getWalletByUserId.mockResolvedValue(null);

    // 3. Вызов тестируемого метода
    await kycService.handleWebhook(payload);

    // 4. Проверки
    // Проверяем вызов обновления статуса
    expect(userServiceMock.updateKycStatus).toHaveBeenCalledWith("cognito-123", KycStatus.APPROVED, "inquiry_123");

    // Проверяем создание кошелька
    expect(walletServiceMock.createWalletForUser).toHaveBeenCalledWith("user-123");
  });
});
