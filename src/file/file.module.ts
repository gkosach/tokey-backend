import { ModuleConfig } from "../common/interface/module.interface";
import { FileController } from "./file.controller";
import fileRoutes from "./file.routes";
import { FileService } from "./file.service";

/**
 * Модуль для управления файлами
 * Обрабатывает загрузку файлов в S3, генерирует signed URLs
 */
export const FileModule: ModuleConfig = {
  routes: [fileRoutes],
  services: [FileService],
  controllers: [FileController],
};
