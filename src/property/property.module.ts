import { ModuleConfig } from "../common/interfaces/module.interface";
import { PropertyFilesController } from "./property-files/property-files.controller";
import filesRouter from "./property-files/property-files.router";
import { PropertyFilesService } from "./property-files/property-files.service";
import { PropertyController } from "./property.controller";
import propertyRouter from "./property.router";
import { PropertyService } from "./property.service";

/**
 * Модуль для управления объектами недвижимости
 */
export const PropertyModule: ModuleConfig = {
  routes: [propertyRouter, filesRouter],
  services: [PropertyService, PropertyFilesService],
  controllers: [PropertyController, PropertyFilesController],
};
