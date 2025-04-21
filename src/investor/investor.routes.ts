import express from "express";
import { investorController } from "./investor.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { kycGuard } from "../middleware/kyc.middleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Investors
 *   description: Управление инвесторами и их избранным
 */

/**
 * Получение информации об инвесторе по Cognito ID
 * @route GET /investors/{cognitoId}
 * @param {string} cognitoId.path.required - Идентификатор инвестора в Cognito
 * @returns {Investor} 200 - Объект инвестора
 * @returns {Error} 404 - Инвестор не найден
 */
router.get("/:cognitoId", (req, res, next) => investorController.getInvestor(req, res, next));

/**
 * Создание нового инвестора
 * @route POST /investors
 * @param {CreateInvestorDto} request.body.required - Данные для создания инвестора
 * @returns {Investor} 201 - Созданный объект инвестора
 * @returns {Error} 400 - Некорректные входные данные
 */
router.post("/", (req, res, next) => investorController.createInvestor(req, res, next));

/**
 * Обновление данных инвестора
 * @route PUT /investors/{cognitoId}
 * @param {string} cognitoId.path.required - Идентификатор инвестора
 * @param {UpdateInvestorDto} request.body.required - Обновляемые данные
 * @returns {Investor} 200 - Обновленный объект инвестора
 * @returns {Error} 403 - Доступ запрещен
 * @returns {Error} 404 - Инвестор не найден
 * @security BearerAuth
 */
router.put(
  "/:cognitoId",
  authMiddleware(["investor"]),
  kycGuard("investor"), // Добавляем KYC проверку
  (req, res, next) => investorController.updateInvestor(req, res, next),
);

/**
 * Получение текущих объектов недвижимости инвестора
 * @route GET /investors/{cognitoId}/residences
 * @param {string} cognitoId.path.required - Идентификатор инвестора
 * @returns {Property[]} 200 - Список объектов недвижимости
 * @returns {Error} 403 - Доступ запрещен
 * @security BearerAuth
 */
router.get("/:cognitoId/residences", authMiddleware(["investor"]), (req, res, next) =>
  investorController.getCurrentResidences(req, res, next),
);

/**
 * Добавление объекта в избранное
 * @route POST /investors/{cognitoId}/favorites/{propertyId}
 * @param {string} cognitoId.path.required - Идентификатор инвестора
 * @param {integer} propertyId.path.required - ID объекта недвижимости
 * @returns {Investor} 200 - Обновленный объект инвестора
 * @returns {Error} 400 - Некорректный ID объекта
 * @returns {Error} 403 - KYC не пройден
 * @security BearerAuth
 */
router.post("/:cognitoId/favorites/:propertyId", authMiddleware(["investor"]), kycGuard("investor"), (req, res, next) =>
  investorController.addFavoriteProperty(req, res, next),
);

/**
 * Удаление объекта из избранного
 * @route DELETE /investors/{cognitoId}/favorites/{propertyId}
 * @param {string} cognitoId.path.required - Идентификатор инвестора
 * @param {integer} propertyId.path.required - ID объекта недвижимости
 * @returns {Investor} 200 - Обновленный объект инвестора
 * @returns {Error} 400 - Некорректный ID объекта
 * @security BearerAuth
 */
router.delete("/:cognitoId/favorites/:propertyId", authMiddleware(["investor"]), (req, res, next) =>
  investorController.removeFavoriteProperty(req, res, next),
);

export default router;
