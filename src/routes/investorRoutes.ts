import {
  addFavoriteProperty,
  createInvestor,
  getCurrentResidences,
  getInvestor,
  removeFavoriteProperty,
  updateInvestor,
} from "../controllers/investorControllers";
import express from "express";

const router = express.Router();

router.get("/:cognitoId", getInvestor);
router.put("/:cognitoId", updateInvestor);
router.post("/", createInvestor);
router.get("/:cognitoId/current-residences", getCurrentResidences);
router.post("/:cognitoId/favorites/:propertyId", addFavoriteProperty);
router.delete("/:cognitoId/favorites/:propertyId", removeFavoriteProperty);

export default router;
