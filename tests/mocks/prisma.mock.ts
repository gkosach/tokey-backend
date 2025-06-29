import { KycStatus, PropertyTierType } from "@prisma/client";

// Удалены все упоминания Wallet
type PartialMockData = {
  user?: Partial<MockTransactionClient["user"]>;
  property?: Partial<MockTransactionClient["property"]>;
  propertyTier?: Partial<MockTransactionClient["propertyTier"]>;
  tokenTransaction?: Partial<MockTransactionClient["tokenTransaction"]>;
};

export interface MockTransactionClient {
  user: {
    findUniqueOrThrow: jest.MockedFunction<any>;
    findFirst: jest.MockedFunction<any>;
    update: jest.MockedFunction<any>;
    create: jest.MockedFunction<any>;
  };
  property: {
    findUnique: jest.MockedFunction<any>;
    findMany: jest.MockedFunction<any>;
    create: jest.MockedFunction<any>;
    update: jest.MockedFunction<any>;
    count: jest.MockedFunction<any>;
  };
  propertyTier: {
    findUnique: jest.MockedFunction<any>;
    create: jest.MockedFunction<any>;
    update: jest.MockedFunction<any>;
  };
  tokenTransaction: {
    findMany: jest.MockedFunction<any>;
    create: jest.MockedFunction<any>;
    update: jest.MockedFunction<any>;
    aggregate: jest.MockedFunction<any>;
  };
}

export const createTransactionMock = (mockData: PartialMockData = {}) => {
  return async (callback: (tx: MockTransactionClient) => Promise<any>) => {
    const mockTx: MockTransactionClient = {
      user: {
        findUniqueOrThrow: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn(),
        create: jest.fn(),
        ...(mockData.user || {}),
      },
      property: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        count: jest.fn(),
        ...(mockData.property || {}),
      },
      propertyTier: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        ...(mockData.propertyTier || {}),
      },
      tokenTransaction: {
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        aggregate: jest.fn(),
        ...(mockData.tokenTransaction || {}),
      },
    };

    return await callback(mockTx);
  };
};

// Обновленная структура Prisma mock без Wallet
export const createPrismaMock = () => ({
  user: {
    findUniqueOrThrow: jest.fn(),
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    upsert: jest.fn(),
    delete: jest.fn(),
  },
  property: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    count: jest.fn(),
  },
  propertyTier: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  tokenTransaction: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    groupBy: jest.fn(),
    aggregate: jest.fn(),
  },
  $transaction: jest.fn(),
  $connect: jest.fn(),
  $disconnect: jest.fn(),
});

// Обновленные моки пользователей без кошельков
export const mockUsers = {
  kycPending: {
    id: "user-123",
    cognitoId: "cognito-123",
    email: "test@tokey.com",
    kycStatus: KycStatus.CREATED,
    kycProviderId: null,
    createdAt: new Date(),
  },
  kycCompleted: {
    id: "user-456",
    cognitoId: "cognito-456",
    email: "verified@tokey.com",
    kycStatus: KycStatus.COMPLETED,
    kycProviderId: "persona_123",
    // Wallet удален
  },
  kycApproved: {
    id: "user-789",
    cognitoId: "cognito-789",
    email: "approved@tokey.com",
    kycStatus: KycStatus.APPROVED,
    kycProviderId: "persona_456",
    // Wallet удален
  },
};

// Пример мока для propertyTier
export const mockPropertyTiers = {
  platinumTier: {
    id: "tier-1",
    propertyId: "property-1",
    type: PropertyTierType.PLATINUM,
    price: 1000,
    totalSupply: 10000,
    benefits: { annualReturn: 7.5 },
  },
};

// Пример мока для tokenTransaction
export const mockTransactions = {
  purchase: {
    id: "tx-1",
    userId: "user-123",
    tierId: "tier-1",
    tokensAmount: 100,
    userAddress: "0x123...",
    contractAddress: "0x456...",
    txHash: "0xabc...",
    paymentAmount: 100000,
    createdAt: new Date(),
  },
};

export const prismaMock = createPrismaMock();
