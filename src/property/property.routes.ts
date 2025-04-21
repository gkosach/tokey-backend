import express from "express";
import multer from "multer";
import { authMiddleware } from "../middleware/auth.middleware";
import { propertyController } from "./property.controller";
import { RequestHandler } from "express";

export const asyncHandler =
  (fn: RequestHandler): RequestHandler =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
}).array("photos", 5); // Максимум 5 файлов

// 2. Обработчик асинхронных ошибок
const uploadMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: "File upload failed" });
    }
    next();
  });
};

const router = express.Router();

// 3. Все эндпоинты с обработкой асинхронных ошибок
router.get("/", asyncHandler(propertyController.getProperties.bind(propertyController)));
router.get("/:id", asyncHandler(propertyController.getProperty));

router.post("/", authMiddleware(["manager"]), uploadMiddleware, asyncHandler(propertyController.createProperty));

router.get("/moderation", authMiddleware(["moderator"]), asyncHandler(propertyController.listForModeration));

router.patch("/:id/moderation", authMiddleware(["moderator"]), asyncHandler(propertyController.updateModerationStatus));

export default router;
