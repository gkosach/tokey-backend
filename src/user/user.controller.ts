import { NextFunction, Response } from "express";
import { AuthRequest } from "../common/types/auth-request.types";
import { UserService } from "./user.service";

export class UserController {
  constructor(private readonly userService: UserService = new UserService()) {}

  async getProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new Error("Unauthorized");

      const user = await this.userService.getUserByCognitoId(req.user.id);
      res.json({
        ...user,
        kycStatus: user.kycStatus,
        wallets: user.wallets.map((w) => ({
          address: w.address,
          whitelisted: w.whitelisted,
        })),
      });
    } catch (error) {
      next(error);
    }
  }

  async initiateKyc(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new Error("Unauthorized");

      const result = await this.userService.initiateKycVerification(req.user.id, req.body.documents);
      res.status(202).json(result);
    } catch (error) {
      next(error);
    }
  }

  async linkWallet(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new Error("Unauthorized");

      const wallet = await this.userService.linkSolanaWallet(req.user.id, req.body.address, req.body.signature);
      res.status(201).json(wallet);
    } catch (error) {
      next(error);
    }
  }

  async getStakingRecords(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new Error("Unauthorized");

      const records = await this.userService.getStakingRecords(req.user.id);
      res.json(records);
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
