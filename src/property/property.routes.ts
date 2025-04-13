import express from "express";
import multer from "multer";
import { authMiddleware } from "../middleware/authMiddleware";
import { propertyController } from "./property.controller";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

// Исправленные методы
router.get("/", (req, res) => {
  propertyController.getProperties(req, res);
});

router.get("/:id", (req, res) => {
  propertyController.getProperty(req, res);
});

router.post("/", authMiddleware(["manager"]), upload.array("photos"), (req, res) => {
  propertyController.createProperty(req, res);
});

export default router;
