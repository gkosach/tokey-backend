import { config } from "dotenv";
import * as path from "node:path";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { Application, Lease, Payment, Property, User } from "../../database/entities";

const envPath = path.resolve(
  __dirname,
  process.env.NODE_ENV === "development" ? "../../../env/.development.env" : "../../../env/.production.env",
);

config({ path: envPath });

// Логирование конфигурации БД
console.log("Database Config:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD?.slice(0, 2) + "***",
  database: process.env.DB_NAME,
  NODE_ENV: process.env.NODE_ENV,
});

/**
 * Конструктор для инициализации провайдера базы данных.
 */
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Application, Lease, Payment, Property],
  namingStrategy: new SnakeNamingStrategy(),
  migrations: ["src/database/migrations/*.ts"],
  synchronize: false,
  logging: true,
  ssl: process.env.POSTGRES_SSL === "true" ? { rejectUnauthorized: false } : false,
});
