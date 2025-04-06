import { authMiddleware } from "@/src/common/middleware/authMiddleware";
import { ManagerController } from "@/src/user/controllers/manager.controller";
import { Router } from "express";

export function createManagerRoutes(controller: ManagerController): Router {
  const router = Router();

  router.get("/:cognitoId", authMiddleware(["manager"]), (req, res) => {
    controller.getManager(req.user!.id, res);
  });

  router.get("/:cognitoId/properties", authMiddleware(["manager"]), (req, res) => {
    controller.getManagerProperties(req.user!.id, res);
  });

  router.put("/:cognitoId", authMiddleware(["manager"]), (req, res) => {
    controller.updateManager(req.user!.id, req.body, res);
  });

  return router;
}
