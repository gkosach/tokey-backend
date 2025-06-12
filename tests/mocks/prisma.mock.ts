import { KycStatus } from "@prisma/client";

type PartialMockData = {
  user?: Partial<MockTransactionClient["user"]>;
  property?: Partial<MockTransactionClient["property"]>;
};

/**
 * Интерфейс для транзакции с нужными методами
 */
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
    };

    return await callback(mockTx);
  };
};
/**
 * Базовые моки для Prisma
 */
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
  transaction: {
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    groupBy: jest.fn(),
  },
  $transaction: jest.fn(),
  $connect: jest.fn(),
  $disconnect: jest.fn(),
});

/**
 * Готовые данные для тестов
 */
export const mockUsers = {
  kycPending: {
    id: "user-123",
    cognitoId: "cognito-123",
    email: "test@tokey.com",
    kycStatus: KycStatus.PENDING,
    kycProviderId: null,
    walletAddress: null,
    createdAt: new Date(),
  },
  kycCompleted: {
    id: "user-456",
    cognitoId: "cognito-456",
    email: "verified@tokey.com",
    kycStatus: KycStatus.COMPLETED,
    kycProviderId: "persona_123",
    wallet: {
      polygonAddress: "0x123...",
      tatumWalletId: "tatum_123",
      status: "active",
    },
  },
};
