import { MAXIMUM_MB_TO_UPLOAD, MAXIMUM_PHOTOS_PER_PROPERTY } from "../common/constants";
import multer from "multer";
import express from "express";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAXIMUM_MB_TO_UPLOAD },
}).array("photos", MAXIMUM_PHOTOS_PER_PROPERTY);

export const uploadMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: "File upload failed" });
    }
    next();
  });
};
