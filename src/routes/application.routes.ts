import { ApplicationController } from "@/src/controllers";
import { ApplicationRepository } from "@/src/db/repository/application.repository";
import { authMiddleware } from "@/src/middleware/authMiddleware";
import { Router } from "express";

const createApplicationRoutes = async () => {
  const applicationRepo = new ApplicationRepository();
  await applicationRepo.initializeRepository();

  const applicationController = new ApplicationController(applicationRepo);
  const router = Router();

  router.post("/", authMiddleware(["manager"]), applicationController.createApplication.bind(applicationController));
  router.put(
    "/:id/status",
    authMiddleware(["manager"]),
    applicationController.updateApplicationStatus.bind(applicationController),
  );
  router.get("/", authMiddleware(["manager"]), applicationController.getApplications.bind(applicationController));

  return router;
};

export default createApplicationRoutes;
