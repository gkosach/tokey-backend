import { ModuleConfig } from "../common/interfaces/module.interface";
import { KycController } from "./kyc.controller";
import kycRouter from "./kyc.router";
import { KycService } from "./kyc.service";

/**
 * Модуль для управления объектами недвижимости
 * ТОЛЬКО недвижимость - файлы обрабатываются в FileModule
 */
export const KycModule: ModuleConfig = {
  routes: [kycRouter],
  services: [KycService],
  controllers: [KycController],
};
