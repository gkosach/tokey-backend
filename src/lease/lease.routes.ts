import { authMiddleware } from "@/src/common/middleware/authMiddleware";
import { LeaseRepository } from "@/src/database/repository";
import { LeaseController } from "@/src/lease/lease.controller";
import { Router } from "express";

const createLeaseRoutes = (): Router => {
  const leaseRepo = new LeaseRepository();
  const leaseController = new LeaseController(leaseRepo);
  const router = Router();

  router.get("/", authMiddleware(["manager", "investor"]), leaseController.getLeases.bind(leaseController));

  router.get(
    "/:id/payments",
    authMiddleware(["manager", "investor"]),
    leaseController.getLeasePayments.bind(leaseController),
  );

  return router;
};

export default createLeaseRoutes;
