import express from "express";
import "express-async-errors";
import { authMiddleware } from "../common";
import { tokenController } from "./token.controller";

const router = express.Router();

/** Получение балансов токенов */
router.get("/balances", authMiddleware(), tokenController.getTokenBalances.bind(tokenController));

/** Покупка токенов */
router.post("/purchase", authMiddleware(), tokenController.purchaseTokens.bind(tokenController));

/** История транзакций */
router.get("/history", authMiddleware(), tokenController.getTransactionHistory.bind(tokenController));

export default router;
