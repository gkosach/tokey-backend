import { ModuleConfig } from "../common/interface/module.interface";
import { TokenController } from "./token.controller";
import tokenRoutes from "./token.routes";
import { TokenService } from "./token.service";

export const TokenModule: ModuleConfig = {
  routes: [tokenRoutes],
  services: [TokenService],
  controllers: [TokenController],
};
