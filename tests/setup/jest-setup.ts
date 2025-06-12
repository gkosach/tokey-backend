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
 * Увеличиваем таймауты для блокчейн операций
 */
jest.setTimeout(30000);

/**
 * Глобальные моки
 */
jest.mock("axios");

/**
 * Мокаем Prisma через централизованный мок
 * Используем относительный путь к общему модулю
 */
jest.mock("../../src/common", () => {
  const { createPrismaMock } = require("../mocks/prisma.mock");

  const actualCommon = jest.requireActual("../../src/common");

  return {
    ...actualCommon,
    prisma: createPrismaMock(),
  };
});

/**
 * Подавляем логи во время тестов (опционально)
 */
// console.log = jest.fn();
// console.warn = jest.fn();
// console.error = jest.fn();
