import { authMiddleware } from "@/src/common/middleware/authMiddleware";
import { InvestorController } from "@/src/user/controllers/investor.controller";
import { Router } from "express";

export function createInvestorRoutes(controller: InvestorController): Router {
  const router = Router();

  router.post("/", (req, res) => {
    controller.createInvestor(req.body.userId, res);
  });

  router.get("/:cognitoId", authMiddleware(["investor"]), (req, res) => {
    controller.getInvestor(req.user!.id, res);
  });

  router.get("/:cognitoId/properties", authMiddleware(["investor"]), (req, res) => {
    controller.getInvestorProperties(req.user!.id, res);
  });

  return router;
}
