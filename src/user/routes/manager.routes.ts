import { authMiddleware } from "@/src/common/middleware/authMiddleware";
import { ManagerController } from "@/src/user/controllers/manager.controller";
import express, { Router } from "express";

export function createManagerRoutes(controller: ManagerController): Router {
  const router = Router();

  router.post("/", express.json(), (req, res) => {
    const { userId, name, email } = req.body;

    if (!userId || !name || !email) {
      res.status(400).json({
        error: "Missing required fields: userId, name, email",
      });
      return;
    }

    controller.createManager(userId, name, email, res);
  });

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
