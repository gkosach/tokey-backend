import express from "express";
import "express-async-errors";
import { authMiddleware } from "../common";
import { walletController } from "./wallet.controller";

const router = express.Router();

/** Получение баланса кошелька */
router.get("/balance", authMiddleware(), walletController.getWalletBalance.bind(walletController));

export default router;
