import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { kycGuard } from "../middleware/kyc.middleware";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/", express.json(), (req, res, next) => {
  return userController.createUser(req, res, next);
});

router.get("/me", authMiddleware(), (req, res, next) => {
  return userController.getCurrentUser(req, res, next);
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
router.get("/staking", authMiddleware(), kycGuard(), (req, res, next) => {
  return userController.getStakingRecords(req, res, next);
});

export default router;
