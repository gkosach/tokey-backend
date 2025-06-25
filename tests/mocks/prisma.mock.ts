import { KycStatus } from "@prisma/client";

type PartialMockData = {
  user?: Partial<MockTransactionClient["user"]>;
  property?: Partial<MockTransactionClient["property"]>;
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

// Fixed Prisma mock structure
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
  wallet: {
    // Added wallet model
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  tokenTransaction: {
    // Renamed from 'transaction'
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
    wallet: {
      walletAddress: "0x123...",
      status: "active",
    },
  },
};

export const prismaMock = createPrismaMock();
