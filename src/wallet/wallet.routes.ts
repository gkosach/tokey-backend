import express from "express";
import "express-async-errors";
import { authMiddleware } from "../middleware/auth.middleware";
import { walletController } from "./wallet.controller";

const router = express.Router();

/** Получение информации о кошельке */
router.get("/info", authMiddleware(), walletController.getWalletInfo.bind(walletController));

/** Проверка статуса кошелька */
router.get("/status", authMiddleware(), walletController.checkWalletStatus.bind(walletController));

/** Создание кошелька */
router.post("/create", authMiddleware(), walletController.createWallet.bind(walletController));

export default router;
