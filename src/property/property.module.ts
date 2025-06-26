import { ModuleConfig } from "../common/interfaces/module.interface";
import { FilesController } from "./files/files.controller";
import filesRouter from "./files/files.router";
import { FilesService } from "./files/files.service";
import { PropertyController } from "./property.controller";
import propertyRouter from "./property.router";
import { PropertyService } from "./property.service";

/**
 * Модуль для управления объектами недвижимости
 * ТОЛЬКО недвижимость - файлы обрабатываются в FileModule
 */
export const PropertyModule: ModuleConfig = {
  routes: [propertyRouter, filesRouter],
  services: [PropertyService, FilesService],
  controllers: [PropertyController, FilesController],
};
