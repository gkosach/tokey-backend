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

/** Обновление email пользователя */
router.put("/email", authMiddleware(), (req, res, next) => {
  return userController.updateEmail(req, res, next);
});

/** Обновление email пользователя */
router.put("/email", authMiddleware(), (req, res, next) => {
  return userController.updateEmail(req, res, next);
});

router.post("/wallets", authMiddleware(), kycGuard(), (req, res, next) => {
  return userController.linkWallet(req, res, next);
});

router.get("/staking", authMiddleware(), kycGuard(), (req, res, next) => {
  return userController.getStakingRecords(req, res, next);
});

export default router;
