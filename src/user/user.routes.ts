import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { kycGuard } from "../middleware/kyc.middleware";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/:cognitoId", authMiddleware(), async (req, res, next) => {
  try {
    const user = await userController.userService.getUserByCognitoId(req.params.cognitoId);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.patch("/settings", authMiddleware(), async (req, res, next) => {
  try {
    if (!req.user) throw new Error("Unauthorized");

    const updatedUser = await userController.updateUserSettings(req.user.id, req.body);

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.get("/profile", authMiddleware(), (req, res, next) => {
  return userController.getProfile(req, res, next);
});
router.post("/kyc", authMiddleware(), (req, res, next) => {
  return userController.initiateKyc(req, res, next);
});
router.post("/wallets", authMiddleware(), kycGuard(), (req, res, next) => {
  return userController.linkWallet(req, res, next);
});
router.get("/staking", authMiddleware(), (req, res, next) => {
  return userController.getStakingRecords(req, res, next);
});

export default router;
