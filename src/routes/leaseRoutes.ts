import express from "express";

import { getLeasePayments, getLeases } from "../controllers/leaseControllers";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware(["manager", "investor"]), getLeases);
router.get("/:id/payments", authMiddleware(["manager", "investor"]), getLeasePayments);

export default router;
