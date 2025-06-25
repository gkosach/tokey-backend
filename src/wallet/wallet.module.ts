import { ModuleConfig } from "../common/interfaces/module.interface";
import { WalletController } from "./wallet.controller";
import walletRouter from "./wallet.router";
import { WalletService } from "./wallet.service";

/**
 * Модуль для управления кошельками пользователей
 * Интегрируется с Tatum KMS, обрабатывает создание кошельков
 */
export const WalletModule: ModuleConfig = {
  routes: [walletRouter],
  services: [WalletService],
  controllers: [WalletController],
};
