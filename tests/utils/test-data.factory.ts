import { KycStatus } from "@prisma/client";

export class TestDataFactory {
  static createUser(overrides = {}) {
    return {
      id: "user-123",
      cognitoId: "cognito-123",
      email: "test@tokey.com",
      walletAddress: "0x1234567890123456789012345678901234567890",
      kycStatus: KycStatus.PENDING,
      kycProviderId: null,
      kycCompletedAt: null,
      createdAt: new Date("2024-01-01"),
      transactions: [],
      ...overrides,
    };
  }

  static createProperty(overrides = {}) {
    return {
      id: "property-123",
      contractAddress: "0x9876543210987654321098765432109876543210",
      developerId: "dev-pik",
      title: "ЖК Тестовый",
      district: "ЦАО",
      totalTokens: 1000000,
      availableTokens: 750000,
      status: "ACTIVE",
      description: "Тестовый объект недвижимости",
      price: 250000,
      createdAt: new Date("2024-01-01"),
      ...overrides,
    };
  }

  static createTransaction(overrides = {}) {
    return {
      id: "tx-123",
      userId: "user-123",
      propertyId: "property-123",
      tokensAmount: 1000,
      txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
      createdAt: new Date("2024-01-01"),
      ...overrides,
    };
  }
}
