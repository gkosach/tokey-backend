import { ModuleConfig } from "../common/interfaces/module.interface";
import { StorageService } from "./storage.service";

/**
 * Модуль для управления файловой системой
 */
export const StorageModule: ModuleConfig = {
  services: [StorageService],
  routes: [],
  controllers: [],
};
