import express from "express";
import "express-async-errors";
import { authMiddleware } from "../middleware/auth.middleware";
import { personaWebhookMiddleware } from "../middleware/persona-webhook.middleware";
import { kycController } from "./kyc.controller";

/**
 * Определяют URL paths и HTTP методы
 * Подключают middleware (auth, validation)
 * Делегируют обработку контроллерам
 */
const router = express.Router();

router.get("/status", authMiddleware(), kycController.getKycStatus.bind(kycController));

router.post("/verificate", authMiddleware(), kycController.startVerification.bind(kycController));

router.post("/webhook", personaWebhookMiddleware, kycController.handleWebhook.bind(kycController));

router.get("/details", authMiddleware(), kycController.getKycDetails.bind(kycController));

export default router;
