import express from "express";
import { managerController } from "./manager.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/:cognitoId", (req, res) => managerController.getManager(req, res));
router.post("/", (req, res) => managerController.createManager(req, res));
router.put("/:cognitoId", authMiddleware(["manager"]), (req, res) => managerController.updateManager(req, res));
router.get("/:cognitoId/properties", authMiddleware(["manager"]), (req, res) =>
  managerController.getManagerProperties(req, res),
);

export default router;
