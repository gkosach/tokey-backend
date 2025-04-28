import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { personaWebhookMiddleware } from "../middleware/persona-webhook.middleware";
import { kycController } from "./kyc.controller";

const router = express.Router();

router.get("/status", authMiddleware(), (req, res, next) => {
  return kycController.getKycStatus(req, res, next);
});

router.post("/start", authMiddleware(), (req, res) => {
  return kycController.startVerification(req, res);
});

router.post("/webhook", personaWebhookMiddleware, (req, res, next) => {
  return kycController.handleWebhook(req, res, next);
});

export default router;
