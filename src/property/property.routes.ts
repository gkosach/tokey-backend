import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { propertyController } from "./property.controller";
import { RequestHandler } from "express";
import { uploadMiddleware } from "../middleware/uploade.middleware";
import { cacheMiddleware } from "../middleware/cache.middleware";

export const asyncHandler =
  (fn: RequestHandler): RequestHandler =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

const router = express.Router();

router.get("/", cacheMiddleware(60), asyncHandler(propertyController.getProperties));
router.get("/:id", asyncHandler(propertyController.getProperty));
router.post("/", authMiddleware(["manager"]), uploadMiddleware, asyncHandler(propertyController.createProperty));
router.get("/moderation", authMiddleware(["moderator"]), asyncHandler(propertyController.listForModeration));
router.patch("/:id/moderation", authMiddleware(["moderator"]), asyncHandler(propertyController.updateModerationStatus));

export default router;
