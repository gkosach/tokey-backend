import express from "express";
import "express-async-errors";
import { authMiddleware } from "../middleware/auth.middleware";
import { kycVerifiedMiddleware } from "../middleware/kyc.middleware";
import { walletController } from "./wallet.controller";

const router = express.Router();

/** Получение полного профиля пользователя */
router.get("/profile", authMiddleware(), walletController.getUserProfile.bind(walletController));

/** Получение информации только о кошельке */
router.get("/info", authMiddleware(), walletController.getWalletInfo.bind(walletController));

/** Создание кошелька (с проверкой KYC в middleware) */
router.post("/create", authMiddleware(), kycVerifiedMiddleware(), walletController.createWallet.bind(walletController));

/** Получение баланса кошелька (с проверкой KYC) */
router.get(
  "/balance",
  authMiddleware(),
  kycVerifiedMiddleware(),
  walletController.getWalletBalance.bind(walletController),
);

export default router;
