import { ApplicationController } from "@/src/controllers";
import { DatabasePostgresProvider } from "@/src/db/database.postgres.provider";
import { ApplicationRepository } from "@/src/db/repository/application.repository";
import { authMiddleware } from "@/src/middleware/authMiddleware";
import { Router } from "express";

const router = Router();
const dbProvider = new DatabasePostgresProvider();
const applicationRepo = new ApplicationRepository(dbProvider);
const applicationController = new ApplicationController(applicationRepo);

/** Создать новую заявку */
router.post("/", authMiddleware(["tenant"]), applicationController.createApplication.bind(applicationController));

/** Обновить статус заявки */
router.put(
  "/:id/status",
  authMiddleware(["manager"]),
  applicationController.updateApplicationStatus.bind(applicationController),
);

/** Получить список заявок */
router.get(
  "/",
  authMiddleware(["manager", "tenant"]),
  applicationController.getApplications.bind(applicationController),
);

export default router;
