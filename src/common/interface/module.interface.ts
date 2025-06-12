import { Router } from "express";

export interface ModuleConfig {
  /** Express Router объекты с маршрутами */
  routes: Router[];

  /** Бизнес-логика сервисы */
  services: any[];

  /** HTTP контроллеры */
  controllers: any[];
}
