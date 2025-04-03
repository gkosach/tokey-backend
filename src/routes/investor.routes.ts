import { InvestorController } from "@/src/controllers/investor.controller";
import { LeaseRepository, PropertyRepository, UserRepository } from "@/src/db/repository";
import { authMiddleware } from "@/src/middleware/authMiddleware";
import { Router } from "express";

const createInvestorRoutes = async () => {
  const usersRepository = new UserRepository();
  const propertyRepository = new PropertyRepository();
  const leaseRepository = new LeaseRepository();

  await Promise.all([
    usersRepository.initializeRepository(),
    propertyRepository.initRepositories(),
    leaseRepository.initializeRepository(),
  ]);

  const investorController = new InvestorController(usersRepository, propertyRepository, leaseRepository);
  const router = Router();

  router.get("/:cognitoId", investorController.getInvestor.bind(investorController));
  router.put("/:cognitoId", investorController.updateInvestor.bind(investorController));
  router.post("/", investorController.createInvestor.bind(investorController));
  router.get(
    "/properties",
    authMiddleware(["investor"]),
    investorController.getInvestorProperties.bind(investorController),
  );
  router.post("/:cognitoId/favourites/:propertyId", investorController.addPropertyToFavorites.bind(investorController));
  router.delete(
    "/:cognitoId/favourites/:propertyId",
    investorController.removePropertyFromFavorites.bind(investorController),
  );

  return router;
};

export default createInvestorRoutes;
