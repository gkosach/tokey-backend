import "reflect-metadata";

/**
 * Настройки окружения для всех тестов
 */
process.env.NODE_ENV = "test";
process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/tokey_test";
process.env.PERSONA_API_KEY = "test-key";
process.env.AWS_REGION = "us-east-1";
process.env.COGNITO_USER_POOL_ID = "test-pool";

/**
 * Увеличиваем таймауты для всех тестов
 */
jest.setTimeout(60000); // Увеличено до 60 секунд

/**
 * Глобальные моки
 */
jest.mock("axios");
jest.mock("../../src/common", () => {
  const { createPrismaMock } = require("../mocks/prisma.mock");
  const actualCommon = jest.requireActual("../../src/common");
  return {
    ...actualCommon,
    prisma: createPrismaMock(),
  };
});
