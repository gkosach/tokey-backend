import "reflect-metadata";

/**
 * Настройки для всех тестов
 */
process.env.NODE_ENV = "test";
process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/tokey_test";
process.env.PERSONA_API_KEY = "test-key";
process.env.AWS_REGION = "us-east-1";
process.env.COGNITO_USER_POOL_ID = "test-pool";

/**
 * Увеличиваем таймауты
 */
jest.setTimeout(30000);

/**
 * Подавляем логи во время тестов
 */
console.log = jest.fn();
console.warn = jest.fn();
console.error = jest.fn();

/**
 * Мокаем Prisma для всех тестов
 */
jest.mock("@/common", () => ({
  prisma: {
    user: {
      findUniqueOrThrow: jest.fn(),
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
  },
}));
