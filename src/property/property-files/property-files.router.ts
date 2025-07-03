import express from "express";
import "express-async-errors";
import multer from "multer";
import { PROPERTY_FILE_LIMITS } from "../../common";
import { filesController } from "./property-files.controller";

const upload = multer();
const router = express.Router();

/** Загрузка файлов */
router.post(
  "/:id/files",
  upload.fields([
    { name: "images", maxCount: PROPERTY_FILE_LIMITS.image },
    { name: "videos", maxCount: PROPERTY_FILE_LIMITS.video },
    { name: "documents", maxCount: PROPERTY_FILE_LIMITS["application/pdf"] },
  ]),
  filesController.uploadFiles.bind(filesController),
);

/** Получение пути файла */
router.get("/:id/files/:fileId", filesController.getFilePath.bind(filesController));

/** Получение списка файлов с путями */
router.get("/:id/files", filesController.listFilesPaths.bind(filesController));

export default router;
