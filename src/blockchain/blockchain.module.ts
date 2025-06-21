import { ModuleConfig } from "../common/interfaces/module.interface";
import { BlockchainService } from "./blockchain.service";

export const BlockchainModule: ModuleConfig = {
  routes: [],
  services: [BlockchainService],
  controllers: [],
};
