import express from "express";
import multer, { FileFilterCallback } from "multer";
import { MAXIMUM_MB_TO_UPLOAD, MAXIMUM_PHOTOS_PER_PROPERTY } from "../common/constants";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAXIMUM_MB_TO_UPLOAD * 1024 * 1024 },
  fileFilter: (_, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
}).array("photos", MAXIMUM_PHOTOS_PER_PROPERTY);

export const uploadMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
  upload(req, res, (err: unknown) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: "File upload failed" });
    }
    next();
  });
};
