import { ModuleConfig } from "../common/interfaces/module.interface";
import { TokenController } from "./token.controller";
import tokenRoutes from "./token.routes";
import { TokenService } from "./token.service";

export const TokenModule: ModuleConfig = {
  routes: [tokenRoutes],
  services: [TokenService],
  controllers: [TokenController],
};
