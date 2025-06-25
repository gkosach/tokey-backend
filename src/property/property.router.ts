import express from "express";
import "express-async-errors";
import { authMiddleware, getAllPropertyMiddleware } from "../common";
import { propertyController } from "./property.controller";

/**
 * Определяют URL paths и HTTP методы
 * Подключают middleware (auth, validation)
 * Делегируют обработку контроллерам
 */
const router = express.Router();

/** Получение всех объектов недвижимости */
router.get("/", getAllPropertyMiddleware(), propertyController.getAllProperties.bind(propertyController));

/** Получение доступных районов недвижимости */
router.get("/districts", propertyController.getAvailableDistricts.bind(propertyController));

/** Получение объекта по ID */
router.get("/:id", propertyController.getProperty.bind(propertyController));

/** Создание объекта */
router.post("/", authMiddleware(), propertyController.createProperty.bind(propertyController));

export default router;
