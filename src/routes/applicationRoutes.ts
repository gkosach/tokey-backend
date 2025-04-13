import express from "express";

import { createApplication, listApplications, updateApplicationStatus } from "../application/applicationControllers";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware(["investor"]), createApplication);
router.put("/:id/status", authMiddleware(["manager"]), updateApplicationStatus);
router.get("/", authMiddleware(["manager", "investor"]), listApplications);

export default router;
