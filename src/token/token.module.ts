import { ModuleConfig } from "../common/interfaces/module.interface";
import { TokenController } from "./token.controller";
import tokenRouter from "./token.router";
import { TokenService } from "./token.service";

export const TokenModule: ModuleConfig = {
  routes: [tokenRouter],
  services: [TokenService],
  controllers: [TokenController],
};
