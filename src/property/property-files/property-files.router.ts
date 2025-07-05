import express from "express";
import "express-async-errors";
import multer from "multer";
import { PROPERTY_FILE_LIMITS } from "../../common";
import { propertyFilesController } from "./property-files.controller";

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
  propertyFilesController.uploadFiles.bind(propertyFilesController),
);

/** Получение пути файла */
router.get("/:id/files/:fileId", propertyFilesController.getFilePath.bind(propertyFilesController));

/** Получение списка файлов с путями */
router.get("/:id/files", propertyFilesController.listFilesPaths.bind(propertyFilesController));

export default router;
