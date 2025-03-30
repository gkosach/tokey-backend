import "reflect-metadata";
/**
 * Package imports
 */
import { authMiddleware } from "@/src/middleware/authMiddleware";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
/**
 * Provider imports
 */
import { DatabasePostgresProvider } from "@/src/db/database.postgres.provider";
import applicationRoutes from "@/src/routes/application.routes";
import investorRoutes from "@/src/routes/investor.routes";
import leaseRoutes from "@/src/routes/lease.routes";
import managerRoutes from "@/src/routes/manager.routes";
import propertyRoutes from "@/src/routes/property.routes";
/**
 * Route imports
 */

/**
 * Configuration
 */
const envFile = process.env.NODE_ENV === "development" ? "./env/.development.env" : "./env/.production.env";
dotenv.config({ path: envFile });
const app = express();
const dbProvider = new DatabasePostgresProvider();

/**
 * Основная функция для инициализации и запуска сервера
 * Устанавливает соединение с базой данных, настраивает middleware и маршруты
 */
async function main() {
  try {
    await dbProvider.initialize();
    app.use(express.json());
    app.use(helmet());
    app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
    app.use(morgan("common"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());

    app.get("/", (req, res) => {
      res.send("This is home route");
    });

    /**
     *  Маршруты для заявок на аренду
     */
    app.use("/applications", applicationRoutes);
    // Маршруты для объектов недвижимости
    app.use("/properties", propertyRoutes);
    // Маршруты для договоров аренды
    app.use("/leases", leaseRoutes);
    // Маршруты для инвесторов (требуется авторизация)
    app.use("/investors", authMiddleware(["investor"]), investorRoutes);
    // Маршруты для менеджеров (требуется авторизация)
    app.use("/managers", authMiddleware(["manager"]), managerRoutes);

    /**
     * Server
     */
    const port = Number(process.env.PORT) || 3002;
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

main();
