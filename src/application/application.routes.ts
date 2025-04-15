import express from "express";
import { applicationController } from "./application.controller";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware(["admin", "manager", "investor"]), (req, res) =>
  applicationController.listApplications(req, res),
);

router.post("/", authMiddleware(["investor"]), (req, res) => applicationController.createApplication(req, res));

router.put("/:id/status", authMiddleware(["manager"]), (req, res) =>
  applicationController.updateApplicationStatus(req, res),
);

export default router;
