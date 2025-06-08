import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { kycGuard } from "../common/utils/guards/kyc.guard";
import { walletController } from "./wallet.controller";

const router = express.Router();

/** Получение информации о кошельке */
router.get("/info", authMiddleware(), walletController.getWalletInfo.bind(walletController));

/** Получение балансов токенов */
router.get("/balances", authMiddleware(), walletController.getTokenBalances.bind(walletController));

/** Покупка токенов (требует KYC) */
router.post("/purchase", authMiddleware(), kycGuard(), walletController.purchaseTokens.bind(walletController));

/** История транзакций */
router.get("/transactions", authMiddleware(), walletController.getTransactionHistory.bind(walletController));

/** Статистика кошелька */
router.get("/stats", authMiddleware(), walletController.getWalletStats.bind(walletController));

/** Проверка статуса кошелька */
router.get("/status", authMiddleware(), walletController.checkWalletStatus.bind(walletController));

export default router;
