import { ModuleConfig } from "../common/interfaces/module.interface";
import { PropertyController } from "./property.controller";
import propertyRouter from "./property.router";
import { PropertyService } from "./property.service";

/**
 * Модуль для управления объектами недвижимости
 * ТОЛЬКО недвижимость - файлы обрабатываются в FileModule
 */
export const PropertyModule: ModuleConfig = {
  routes: [propertyRouter],
  services: [PropertyService],
  controllers: [PropertyController],
};
