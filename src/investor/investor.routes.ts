import express from "express";
import { investorController } from "./investor.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { kycGuard } from "../middleware/kyc.middleware";

const router = express.Router();

router.get("/:cognitoId", (req, res) => investorController.getInvestor(req, res));

router.post("/", (req, res) => investorController.createInvestor(req, res));

router.put("/:cognitoId", authMiddleware(["investor"]), (req, res) => investorController.updateInvestor(req, res));

router.get("/:cognitoId/residences", authMiddleware(["investor"]), (req, res) =>
  investorController.getCurrentResidences(req, res),
);

router.post(
  "/:cognitoId/favorites/:propertyId",
  authMiddleware(["investor"]),
  kycGuard("investor"), // Добавляем KYC проверку
  (req, res) => investorController.addFavoriteProperty(req, res),
);

router.delete("/:cognitoId/favorites/:propertyId", authMiddleware(["investor"]), (req, res) =>
  investorController.removeFavoriteProperty(req, res),
);

export default router;
