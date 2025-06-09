/** Конфигурация переменных окружения с валидацией */
export const envConfig = {
  /** Порт сервера */
  PORT: Number(process.env.PORT) || 3002,

  /** Режим окружения */
  NODE_ENV: process.env.NODE_ENV || "development",

  /** URL базы данных */
  DATABASE_URL: process.env.DATABASE_URL!,

  /** AWS настройки */
  AWS: {
    REGION: process.env.AWS_REGION!,
    USER_POOL_ID: process.env.COGNITO_USER_POOL_ID!, // Исправлено имя переменной
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID!,
    SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY!,
  },

  /** S3 настройки */
  S3: {
    BUCKET_NAME: process.env.S3_BUCKET_NAME!,
  },

  /** Persona KYC настройки */
  PERSONA: {
    API_KEY: process.env.PERSONA_API_KEY!,
    TEMPLATE_ID: process.env.PERSONA_TEMPLATE_ID!,
    SHA: process.env.NEXT_PERSONA_SHA!,
  },
};

/** Валидация обязательных переменных */
export function validateEnvConfig(): void {
  const requiredVars = [
    "DATABASE_URL",
    "AWS_REGION",
    "COGNITO_USER_POOL_ID",
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
    "S3_BUCKET_NAME",
    "PERSONA_API_KEY",
    "PERSONA_TEMPLATE_ID",
    "POSTGRES_DB",
    "POSTGRES_USER",
    "POSTGRES_PASSWORD",
  ];
  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`);
  }

  /** Дополнительные проверки */
  if (!process.env.DATABASE_URL?.startsWith("postgresql://")) {
    throw new Error("DATABASE_URL must be a valid PostgreSQL connection string");
  }

  if (!["development", "production", "test"].includes(process.env.NODE_ENV || "")) {
    console.warn("⚠️ NODE_ENV should be one of: development, production, test");
  }

  console.log("✅ All environment variables validated successfully");
}
