import express from "express";
import "express-async-errors";
import multer from "multer";
import { authMiddleware, getAllPropertyMiddleware, PROPERTY_FILE_LIMITS } from "../common";
import { propertyController } from "./property.controller";

const upload = multer();
/**
 * Определяют URL paths и HTTP методы
 * Подключают middleware (auth, validation)
 * Делегируют обработку контроллерам
 */
const router = express.Router();

/** Получение всех объектов недвижимости */
router.get("/", getAllPropertyMiddleware(), propertyController.getAllProperties.bind(propertyController));

/** Получение объекта по ID */
router.get("/:id", propertyController.getProperty.bind(propertyController));

/** Создание объекта */
router.post(
  "/",
  authMiddleware(),
  upload.fields([
    { name: "images", maxCount: PROPERTY_FILE_LIMITS.image },
    { name: "videos", maxCount: PROPERTY_FILE_LIMITS.video },
    { name: "documents", maxCount: PROPERTY_FILE_LIMITS["application/pdf"] },
  ]),
  propertyController.createProperty.bind(propertyController),
);

export default router;
