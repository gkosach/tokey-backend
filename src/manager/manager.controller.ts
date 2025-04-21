import { Request, Response, NextFunction } from "express";
import { ManagerService } from "./manager.service";
import { CreateManagerDto, UpdateManagerDto, ManagerError } from "./index";

/**
 * Контроллер для обработки запросов связанных с менеджерами
 */
export class ManagerController {
  private readonly managerService = new ManagerService();

  /**
   * Получение информации о менеджере
   * @route GET /managers/{cognitoId}
   * @returns Объект менеджера
   */
  getManager = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { cognitoId } = req.params;
      if (!cognitoId) {
        throw ManagerError.invalidId();
      }

      const manager = await this.managerService.getManager(cognitoId);
      if (!manager) {
        throw ManagerError.notFound();
      }

      res.json(manager);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Создание нового менеджера
   * @route POST /managers
   */
  createManager = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto: CreateManagerDto = req.body;

      if (!dto.cognitoId || !dto.email) {
        throw ManagerError.invalidData();
      }

      const manager = await this.managerService.createManager(dto);
      res.status(201).json(manager);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Обновление данных менеджера
   * @route PUT /managers/{cognitoId}
   */
  updateManager = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { cognitoId } = req.params;
      const dto: UpdateManagerDto = req.body;

      if (!cognitoId) {
        throw ManagerError.invalidId();
      }

      const manager = await this.managerService.updateManager(cognitoId, dto);
      res.json(manager);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Получение объектов недвижимости менеджера
   * @route GET /managers/{cognitoId}/properties
   */
  getManagerProperties = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { cognitoId } = req.params;
      if (!cognitoId) {
        throw ManagerError.invalidId();
      }

      const properties = await this.managerService.getManagerProperties(cognitoId);
      res.json(
        properties.map((p) => ({
          ...p,
          location: p.location
            ? {
                ...p.location,
                coordinates: [p.location.longitude, p.location.latitude],
              }
            : null,
        })),
      );
    } catch (error) {
      next(error);
    }
  };
}

export const managerController = new ManagerController();
