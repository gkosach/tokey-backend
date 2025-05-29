import express, { RequestHandler } from "express";
import { uploadMiddleware } from "../middleware/uploade.middleware";
import { propertyController } from "./property.controller";

export const asyncHandler = (fn: RequestHandler): RequestHandler => {
  return (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };
};

const router = express.Router();

router.get(
  "/",
  asyncHandler((req, res, next) => {
    return propertyController.getAllProperties(req, res, next);
  }),
);

router.get(
  "/:id",
  asyncHandler((req, res, next) => {
    return propertyController.getProperty(req, res, next);
  }),
);

router.post("/", uploadMiddleware, asyncHandler(propertyController.createProperty));
router.get("/moderation", asyncHandler(propertyController.listForModeration));
router.patch("/:id/moderation", asyncHandler(propertyController.updateModerationStatus));

export default router;
