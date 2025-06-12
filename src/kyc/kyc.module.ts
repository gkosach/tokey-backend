import { ModuleConfig } from "../common/interface/module.interface";
import { KycController } from "./kyc.controller";
import kycRoutes from "./kyc.routes";
import { KycService } from "./kyc.service";

/**
 * Модуль для KYC (Know Your Customer) верификации
 * Обрабатывает webhooks от KYC провайдеров, управляет статусами верификации
 */
export const KycModule: ModuleConfig = {
  routes: [kycRoutes],
  services: [KycService],
  controllers: [KycController],
};
