import { Application, Lease, Payment, Property, User, UserFavorites } from "@/src/db/entities";
import { config } from "dotenv";
import * as path from "node:path";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const envPath = path.resolve(
  __dirname,
  process.env.NODE_ENV === "development" ? "../../../../env/.development.env" : "../../../../env/.production.env",
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
  entities: [User, UserFavorites, Application, Lease, Payment, Property],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: true,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
});
