import express from "express";
import multer from "multer";
import { authMiddleware } from "../middleware/auth.middleware";
import { propertyController } from "./property.controller";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", (req, res) => {
  propertyController.getProperties(req, res);
});

router.get("/:id", (req, res) => {
  propertyController.getProperty(req, res);
});

router.post("/", authMiddleware(["manager"]), upload.array("photos"), (req, res) =>
  propertyController.createProperty(req, res),
);

router.get("/moderation", authMiddleware(["manager"]), (req, res) => propertyController.listForModeration(req, res));

router.patch("/:id/moderation", authMiddleware(["manager"]), (req, res) =>
  propertyController.updateModerationStatus(req, res),
);

export default router;
