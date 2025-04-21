import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { propertyController } from "./property.controller";
import { RequestHandler } from "express";
import { uploadMiddleware } from "../middleware/uploade.middleware";

export const asyncHandler =
  (fn: RequestHandler): RequestHandler =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: Управление объектами недвижимости
 */

/**
 * @swagger
 * /properties:
 *   get:
 *     summary: Получение списка объектов недвижимости
 *     tags: [Properties]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Номер страницы
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Тип недвижимости (Apartment, Villa, Townhouse, Rooms)
 *     responses:
 *       200:
 *         description: Список объектов недвижимости
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Property'
 */
router.get("/", asyncHandler(propertyController.getProperties));

/**
 * @swagger
 * /properties/{id}:
 *   get:
 *     summary: Получение объекта недвижимости по ID
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID объекта недвижимости
 *     responses:
 *       200:
 *         description: Объект недвижимости
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       404:
 *         description: Объект не найден
 */
router.get("/:id", asyncHandler(propertyController.getProperty));

/**
 * @swagger
 * /properties:
 *   post:
 *     summary: Создание нового объекта недвижимости
 *     tags: [Properties]
 *     security:
 *       - BearerAuth: [manager]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CreatePropertyDto'
 *     responses:
 *       201:
 *         description: Объект недвижимости создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       400:
 *         description: Ошибка загрузки файлов или валидации
 *       403:
 *         description: Нет прав доступа
 */
router.post("/", authMiddleware(["manager"]), uploadMiddleware, asyncHandler(propertyController.createProperty));

/**
 * @swagger
 * /properties/moderation:
 *   get:
 *     summary: Получение объектов для модерации
 *     tags: [Properties]
 *     security:
 *       - BearerAuth: [moderator]
 *     responses:
 *       200:
 *         description: Список объектов для модерации
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Property'
 *       403:
 *         description: Нет прав доступа
 */
router.get("/moderation", authMiddleware(["moderator"]), asyncHandler(propertyController.listForModeration));

/**
 * @swagger
 * /properties/{id}/moderation:
 *   patch:
 *     summary: Обновление статуса модерации объекта
 *     tags: [Properties]
 *     security:
 *       - BearerAuth: [moderator]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID объекта недвижимости
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateModerationStatusDto'
 *     responses:
 *       200:
 *         description: Обновленный объект недвижимости
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       403:
 *         description: Нет прав доступа
 *       404:
 *         description: Объект не найден
 */
router.patch("/:id/moderation", authMiddleware(["moderator"]), asyncHandler(propertyController.updateModerationStatus));

export default router;
