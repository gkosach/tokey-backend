import express from "express";
import { managerController } from "./manager.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Managers
 *   description: Управление менеджерами и их объектами недвижимости
 */

/**
 * @swagger
 * /managers/{cognitoId}:
 *   get:
 *     summary: Получение информации о менеджере
 *     tags: [Managers]
 *     parameters:
 *       - in: path
 *         name: cognitoId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cognito ID менеджера
 *     responses:
 *       200:
 *         description: Объект менеджера
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Manager'
 *       400:
 *         $ref: '#/components/responses/InvalidIdError'
 *       404:
 *         $ref: '#/components/responses/ManagerNotFoundError'
 */
router.get("/:cognitoId", (req, res, next) => managerController.getManager(req, res, next));

/**
 * @swagger
 * /managers:
 *   post:
 *     summary: Создание нового менеджера
 *     tags: [Managers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateManagerDto'
 *     responses:
 *       201:
 *         description: Созданный менеджер
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Manager'
 *       400:
 *         $ref: '#/components/responses/InvalidDataError'
 */
router.post("/", (req, res, next) => managerController.createManager(req, res, next));

/**
 * @swagger
 * /managers/{cognitoId}:
 *   put:
 *     summary: Обновление данных менеджера
 *     tags: [Managers]
 *     security:
 *       - BearerAuth: [manager]
 *     parameters:
 *       - in: path
 *         name: cognitoId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cognito ID менеджера
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateManagerDto'
 *     responses:
 *       200:
 *         description: Обновленный объект менеджера
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Manager'
 *       400:
 *         $ref: '#/components/responses/InvalidIdError'
 *       403:
 *         $ref: '#/components/responses/AccessDeniedError'
 *       404:
 *         $ref: '#/components/responses/ManagerNotFoundError'
 */
router.put("/:cognitoId", authMiddleware(["manager"]), (req, res, next) =>
  managerController.updateManager(req, res, next),
);

/**
 * @swagger
 * /managers/{cognitoId}/properties:
 *   get:
 *     summary: Получение объектов недвижимости менеджера
 *     tags: [Managers]
 *     security:
 *       - BearerAuth: [manager]
 *     parameters:
 *       - in: path
 *         name: cognitoId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cognito ID менеджера
 *     responses:
 *       200:
 *         description: Список объектов с координатами
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PropertyWithCoordinates'
 *       400:
 *         $ref: '#/components/responses/InvalidIdError'
 *       403:
 *         $ref: '#/components/responses/AccessDeniedError'
 */
router.get("/:cognitoId/properties", authMiddleware(["manager"]), (req, res, next) =>
  managerController.getManagerProperties(req, res, next),
);

export default router;
