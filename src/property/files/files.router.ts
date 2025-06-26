import express from "express";
import "express-async-errors";
import multer from "multer";
import { filesController } from "./files.controller";

const upload = multer();
const router = express.Router();

/** Загрузка файлов */
router.post("/:id/files/upload", upload.single("file"), filesController.uploadFile.bind(filesController));

/** Получение файла */
router.get("/:id/files/get", filesController.getFile.bind(filesController));

/** Получение списка файлов с путями */
router.get("/:id/files/get-paths", filesController.getFilePaths.bind(filesController));

export default router;
