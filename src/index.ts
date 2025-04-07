import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import "reflect-metadata";

import createApplicationRoutes from "@/src/application/application.routes";
import { DatabasePostgresProvider } from "@/src/database/database.postgres.provider";
import { LeaseRepository, PropertyRepository, UserRepository } from "@/src/database/repository";
import createLeaseRoutes from "@/src/lease/lease.routes";
import createPropertyRoutes from "@/src/property/property.routes";
import { InvestorController } from "@/src/user/controllers/investor.controller";
import { ManagerController } from "@/src/user/controllers/manager.controller";
import { createInvestorRoutes } from "@/src/user/routes/investor.routes";
import { createManagerRoutes } from "@/src/user/routes/manager.routes";

dotenv.config();

const app = express();

async function main() {
  try {
    /* CONFIGURATIONS */
    app.use(express.json());
    app.use(helmet());
    app.use(morgan("common"));
    app.use(cors());

    /* DATABASE INITIALIZATION */
    await DatabasePostgresProvider.initialize(); // Первая операция

    /* REPOSITORIES INITIALIZATION */
    const userRepo = new UserRepository();
    const propertyRepo = new PropertyRepository();
    const leaseRepo = new LeaseRepository();

    /* CONTROLLERS INITIALIZATION */
    const managerController = new ManagerController(userRepo, propertyRepo);
    const investorController = new InvestorController(userRepo, leaseRepo, propertyRepo);

    /* ROUTES INITIALIZATION */
    const investorRoutes = createInvestorRoutes(investorController);
    const managerRoutes = createManagerRoutes(managerController);
    const applicationRoutes = createApplicationRoutes();
    const propertyRoutes = createPropertyRoutes();
    const leaseRoutes = createLeaseRoutes();

    /* MIDDLEWARE */
    app.use((req, res, next) => {
      console.log(`[DEBUG] Incoming request:
Method: ${req.method}
Endpoint: ${req.originalUrl}
Body: ${JSON.stringify(req.body, null, 2)}`);
      next();
    });

    /* ROUTES */
    app.use("/api/investors", investorRoutes);
    app.use("/api/managers", managerRoutes);
    app.use("/api/applications", applicationRoutes);
    app.use("/api/properties", propertyRoutes);
    app.use("/api/leases", leaseRoutes);

    /* SERVER */
    const port = process.env.PORT || 3002;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

main();
