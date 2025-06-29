import dotenv from "dotenv";

if (!process.env.DATABASE_URL) {
  const envFile = process.env.NODE_ENV === "production" ? ".env" : ".development.env";
  dotenv.config({ path: envFile });
}
export {};

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
}
