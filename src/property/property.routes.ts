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

router.post("/", authMiddleware(), uploadMiddleware, asyncHandler(propertyController.createProperty));
router.get("/moderation", authMiddleware(), asyncHandler(propertyController.listForModeration));
router.patch("/:id/moderation", authMiddleware(), asyncHandler(propertyController.updateModerationStatus));

export default router;
