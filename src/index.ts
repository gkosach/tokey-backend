// prettier-ignore
import "reflect-metadata";

import { addAliases } from "module-alias";
import "module-alias/register";

/**
 * Package imports
 */
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
import { authMiddleware } from "@/src/middleware/authMiddleware";
import createApplicationRoutes from "@/src/routes/application.routes";
import createInvestorRoutes from "@/src/routes/investor.routes";
import createLeaseRoutes from "@/src/routes/lease.routes";
import createManagerRoutes from "@/src/routes/manager.routes";
import createPropertyRoutes from "@/src/routes/property.routes";
/**
 * Route imports
 */

addAliases({
  "@src": __dirname + "/src",
  "@db": __dirname + "/src/db",
});

/**
 * Configuration
 */
const envFile = process.env.NODE_ENV === "development" ? "./env/.development.env" : "./env/.production.env";
dotenv.config({ path: envFile });
const app = express();

/**
 * Основная функция для инициализации и запуска сервера
 * Устанавливает соединение с базой данных, настраивает middleware и маршруты
 */
async function main() {
  try {
    await DatabasePostgresProvider.initialize();

    app.use(express.json());
    app.use(helmet());
    app.use(morgan("common"));
    app.use(bodyParser.json());
    app.use(cors());

    // Initialize routes properly
    const applicationRoutes = await createApplicationRoutes();
    const propertyRoutes = await createPropertyRoutes();
    const leaseRoutes = await createLeaseRoutes();
    const investorRoutes = await createInvestorRoutes();
    const managerRoutes = await createManagerRoutes();

    app.use("/applications", applicationRoutes);
    app.use("/properties", propertyRoutes);
    app.use("/leases", leaseRoutes);
    app.use("/investors", authMiddleware(["investor"]), investorRoutes);
    app.use("/managers", authMiddleware(["manager"]), managerRoutes);

    const port = Number(process.env.PORT) || 3002;
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

main();
