import express from "express";
import "express-async-errors";
import { authMiddleware } from "../middleware/auth.middleware";
import { userController } from "./user.controller";

const router = express.Router();

/** Создание нового пользователя */
router.post("/", express.json(), userController.createUser.bind(userController));

/** Получение профиля пользователя */
router.get("/profile", authMiddleware(), userController.getProfile.bind(userController));

/** Обновление email пользователя */
router.put("/email", authMiddleware(), userController.updateEmail.bind(userController));

export default router;
