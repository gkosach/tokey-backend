import { ModuleConfig } from "../common/interface/module.interface";
import { PropertyController } from "./property.controller";
import propertyRoutes from "./property.routes";
import { PropertyService } from "./property.service";

/**
 * Модуль для управления объектами недвижимости
 * ТОЛЬКО недвижимость - файлы обрабатываются в FileModule
 */
export const PropertyModule: ModuleConfig = {
  routes: [propertyRoutes],
  services: [PropertyService],
  controllers: [PropertyController],
};
