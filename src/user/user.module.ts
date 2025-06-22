import { ModuleConfig } from "../common/interfaces/module.interface";
import { KycController } from "./kyc/kyc.controller";
import kycRoutes from "./kyc/kyc.routes";
import { KycService } from "./kyc/kyc.service";
import { UserController } from "./user.controller";
import userRoutes from "./user.routes";
import { UserService } from "./user.service";

export const UserModule: ModuleConfig = {
  routes: [userRoutes, kycRoutes],
  services: [UserService, KycService],
  controllers: [UserController, KycController],
};
