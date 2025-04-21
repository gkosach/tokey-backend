import express from "express";
import { kycController } from "./kyc.controller";

/**
 * @swagger
 * tags:
 *   name: KYC
 *   description: Процесс верификации пользователей
 */
const router = express.Router();

/**
 * @swagger
 * /kyc/init:
 *   post:
 *     summary: Инициализация KYC-сессии
 *     tags: [KYC]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateKycSessionDto'
 *     responses:
 *       200:
 *         description: Ссылка на верификацию
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 verificationUrl:
 *                   type: string
 *       500:
 *         description: Ошибка создания сессии
 */
router.post("/init", kycController.createSession);

/**
 * @swagger
 * /kyc/webhook:
 *   post:
 *     summary: Обработка вебхука от Persona
 *     tags: [KYC]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Ошибка обработки вебхука
 */
router.post("/webhook", kycController.handleWebhook);

export default router;
