import { ApplicationController } from "@/src/application/application.controller";
import { authMiddleware } from "@/src/common/middleware/authMiddleware";
import { ApplicationRepository } from "@/src/database/repository";
import { Router } from "express";

const createApplicationRoutes = (): Router => {
  const applicationRepo = new ApplicationRepository();
  const applicationController = new ApplicationController(applicationRepo);
  const router = Router();

  // Для investor: создание заявки
  router.post("/", authMiddleware(["investor"]), applicationController.createApplication.bind(applicationController));

  // Для manager: обновление статуса
  router.put(
    "/:id/status",
    authMiddleware(["manager"]),
    applicationController.updateApplicationStatus.bind(applicationController),
  );

  // Для manager и investor: список заявок
  router.get(
    "/",
    authMiddleware(["manager", "investor"]),
    applicationController.getApplications.bind(applicationController),
  );

  return router;
};

export default createApplicationRoutes;
