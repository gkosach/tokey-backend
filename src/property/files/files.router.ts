import express from "express";
import "express-async-errors";
import multer from "multer";
import { PROPERTY_FILE_LIMITS } from "../../common";
import { filesController } from "./files.controller";

const upload = multer();
const router = express.Router();

/** Загрузка файла */
router.post("/:id/files/upload-file", upload.single("file"), filesController.uploadFile.bind(filesController));

/** Загрузка файлов */
router.post(
  "/:id/files/upload-files",
  upload.fields([
    { name: "images", maxCount: PROPERTY_FILE_LIMITS.image },
    { name: "videos", maxCount: PROPERTY_FILE_LIMITS.video },
    { name: "application/pdf", maxCount: PROPERTY_FILE_LIMITS["application/pdf"] },
  ]),
  filesController.uploadFiles.bind(filesController),
);

/** Получение файла */
router.get("/:id/files/get", filesController.getFile.bind(filesController));

/** Получение списка файлов с путями */
router.get("/:id/files/get-paths", filesController.getFilePaths.bind(filesController));

export default router;
