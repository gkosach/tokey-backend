import { LeaseController } from "@/src/controllers";
import { DatabasePostgresProvider } from "@/src/db/database.postgres.provider";
import { LeaseRepository } from "@/src/db/repository";
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
const dbProvider = new DatabasePostgresProvider();
const leaseRepo = new LeaseRepository(dbProvider);
const leaseController = new LeaseController(leaseRepo);

/** Получить список договоров аренды */
router.get("/", authMiddleware(["manager", "tenant"]), leaseController.getLeases.bind(leaseController));

/** Получить конкретный договор аренды по ID */
router.get("/:id", authMiddleware(["manager", "tenant"]), leaseController.getLease.bind(leaseController));

/** Получить платежи по конкретному договору аренды */
router.get(
  "/:id/payments",
  authMiddleware(["manager", "tenant"]),
  leaseController.getLeasePayments.bind(leaseController),
);

export default router;
