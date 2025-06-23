import { ModuleConfig } from "../common/interfaces/module.interface";
import { KycController } from "./kyc/kyc.controller";
import kycRouter from "./kyc/kyc.router";
import { KycService } from "./kyc/kyc.service";
import { UserController } from "./user.controller";
import userRouter from "./user.router";
import { UserService } from "./user.service";

export const UserModule: ModuleConfig = {
  routes: [userRouter, kycRouter],
  services: [UserService, KycService],
  controllers: [UserController, KycController],
};
