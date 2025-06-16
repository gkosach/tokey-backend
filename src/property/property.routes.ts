import express from "express";
import "express-async-errors";
import { authMiddleware } from "../middleware/auth.middleware";
import { propertyController } from "./property.controller";

/**
 * Определяют URL paths и HTTP методы
 * Подключают middleware (auth, validation)
 * Делегируют обработку контроллерам
 */
const router = express.Router();

/** Получение всех объектов недвижимости */
router.get("/", propertyController.getAllProperties.bind(propertyController));

/** Получение активных объектов */
router.get("/active", propertyController.getActiveProperties.bind(propertyController));

/** Получение объекта по ID */
router.get("/:id", propertyController.getProperty.bind(propertyController));

/** Создание объекта */
router.post("/", authMiddleware(), propertyController.createProperty.bind(propertyController));

/** Обновление статуса */
router.patch("/:id/status", authMiddleware(), propertyController.updatePropertyStatus.bind(propertyController));

export default router;
