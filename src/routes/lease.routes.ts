import { LeaseController } from "@/src/controllers";
import { LeaseRepository } from "@/src/db/repository";
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const createLeaseRoutes = async () => {
  const leaseRepo = new LeaseRepository();
  await leaseRepo.initializeRepository();

  const leaseController = new LeaseController(leaseRepo);
  const router = Router();

  router.get("/", authMiddleware(["manager", "tenant"]), leaseController.getLeases.bind(leaseController));
  router.get("/:id", authMiddleware(["manager", "tenant"]), leaseController.getLease.bind(leaseController));
  router.get(
    "/:id/payments",
    authMiddleware(["manager", "tenant"]),
    leaseController.getLeasePayments.bind(leaseController),
  );

  return router;
};

export default createLeaseRoutes;
