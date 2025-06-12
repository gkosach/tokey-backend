import { ModuleConfig } from "../common/interface/module.interface";
import { UserController } from "./user.controller";
import userRoutes from "./user.routes";
import { UserService } from "./user.service";

export const UserModule: ModuleConfig = {
  routes: [userRoutes],
  services: [UserService],
  controllers: [UserController],
};
