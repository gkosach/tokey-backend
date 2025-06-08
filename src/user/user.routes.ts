import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { userController } from "./user.controller";

const router = express.Router();

/** Создание нового пользователя с автоматическим HSM кошельком */
router.post("/", express.json(), (req, res, next) => {
  return userController.createUser(req, res, next);
});

/** Получение профиля пользователя */
router.get("/profile", authMiddleware(), (req, res, next) => {
  return userController.getProfile(req, res, next);
});

/** Инициация KYC верификации */
router.post("/kyc", authMiddleware(), (req, res, next) => {
  return userController.initiateKyc(req, res, next);
});

/** Обновление email пользователя */
router.put("/email", authMiddleware(), (req, res, next) => {
  return userController.updateEmail(req, res, next);
});

/** Получение балансов токенов пользователя */
router.get("/balances", authMiddleware(), (req, res, next) => {
  return userController.getTokenBalances(req, res, next);
});

/** Получение адреса HSM кошелька */
router.get("/wallet", authMiddleware(), (req, res, next) => {
  return userController.getWalletAddress(req, res, next);
});

export default router;
