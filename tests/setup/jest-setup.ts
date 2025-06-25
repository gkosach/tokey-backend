import "reflect-metadata";

/**
 * Test environment variables
 */
process.env.NODE_ENV = "test";
process.env.DATABASE_URL = "postgresql://test:test@localhost:5432/tokey_test";
process.env.PERSONA_API_KEY = "test-key";
process.env.PERSONA_TEMPLATE_ID = "test-template-id";
process.env.AWS_REGION = "us-east-1";
process.env.COGNITO_USER_POOL_ID = "test-pool";
process.env.AWS_ACCESS_KEY_ID = "test-access-key";
process.env.AWS_SECRET_ACCESS_KEY = "test-secret-key";
process.env.S3_BUCKET_NAME = "test-bucket";
process.env.POSTGRES_DB = "tokey_test";
process.env.POSTGRES_USER = "test";
process.env.POSTGRES_PASSWORD = "test";
process.env.TURNKEY_API_PUBLIC = "test-turnkey-public";
process.env.TURNKEY_SECRET = "test-turnkey-secret";
process.env.TURNKEY_ORGANIZATION_ID = "test-turnkey-org";
process.env.NEXT_PERSONA_SHA = "test-sha";

jest.setTimeout(60000);

/**
 * Увеличиваем таймауты для всех тестов
 */
jest.setTimeout(30000);

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
