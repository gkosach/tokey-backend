import express from "express";
import { kycGuard } from "../middleware/kyc.middleware";
import { walletController } from "./wallet.controller";

const router = express.Router();

router.post("/", kycGuard(), (req, res, next) => {
  return walletController.linkWallet(req, res, next);
});

router.get("/", (req, res, next) => {
  return walletController.getUserWallets(req, res, next);
});

export default router;
