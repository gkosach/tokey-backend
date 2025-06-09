import express, { RequestHandler } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { uploadMiddleware } from "../middleware/uploade.middleware";
import { propertyController } from "./property.controller";

export const asyncHandler = (fn: RequestHandler): RequestHandler => {
  return (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
};

const router = express.Router();

/** Получение всех объектов недвижимости с фильтрацией */
router.get(
  "/",
  asyncHandler((req, res, next) => {
    return propertyController.getAllProperties(req, res, next);
  }),
);

/** Получение активных объектов для инвестирования */
router.get(
  "/active",
  asyncHandler((req, res, next) => {
    return propertyController.getActiveProperties(req, res, next);
  }),
);

/** Получение объекта недвижимости по ID */
router.get(
  "/:id",
  asyncHandler((req, res, next) => {
    return propertyController.getProperty(req, res, next);
  }),
);

/** Получение объекта с транзакциями */
router.get(
  "/:id/transactions",
  asyncHandler((req, res, next) => {
    return propertyController.getPropertyWithTransactions(req, res, next);
  }),
);

/** Получение статистики по объекту */
router.get(
  "/:id/stats",
  asyncHandler((req, res, next) => {
    return propertyController.getPropertyStats(req, res, next);
  }),
);

/** Создание нового объекта недвижимости */
router.post("/", uploadMiddleware, asyncHandler(propertyController.createProperty));

/** Обновление статуса объекта (требует авторизации) */
router.patch(
  "/:id/status",
  authMiddleware(),
  asyncHandler((req, res, next) => {
    return propertyController.updatePropertyStatus(req, res, next);
  }),
);

/** Обновление количества доступных токенов (требует авторизации) */
router.patch(
  "/:id/available-tokens",
  authMiddleware(),
  asyncHandler((req, res, next) => {
    return propertyController.updateAvailableTokens(req, res, next);
  }),
);

export default router;
