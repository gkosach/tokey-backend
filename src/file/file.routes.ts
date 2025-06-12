import express from "express";
import "express-async-errors";
import { authMiddleware } from "../middleware/auth.middleware";
import { fileController } from "./file.controller";

const router = express.Router();

/** Получение signed URL для загрузки */
router.post("/upload-url", authMiddleware(), fileController.getUploadUrl.bind(fileController));

/** Подтверждение загрузки файла */
router.post("/confirm", authMiddleware(), fileController.confirmUpload.bind(fileController));

export default router;
