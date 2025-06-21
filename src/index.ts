import { Router } from "express";
import { BlockchainModule } from "./blockchain/blockchain.module";
import { FileModule } from "./file/file.module";
import { KycModule } from "./kyc/kyc.module";
import { PropertyModule } from "./property/property.module";
import { TokenModule } from "./token/token.module";
import { UserModule } from "./user/user.module";
import { WalletModule } from "./wallet/wallet.module";

export const APP_MODULES = [
  UserModule,
  WalletModule,
  PropertyModule,
  KycModule,
  TokenModule,
  FileModule,
  BlockchainModule,
];

/**
 * Экспорт всех routes для app.ts
 */
export const APP_ROUTES: Router[] = APP_MODULES.flatMap((module) => module.routes || []);
