import { NextFunction, Request, Response } from "express";
import { PropertyError } from "./index";
import { PropertyService } from "./property.service";
import { UpdateModerationStatusDto } from "./contract/dto/property-moderation.dto";

export class PropertyController {
  private propertyService = new PropertyService();
  /**
   * Получение объекта недвижимости по ID
   */
  getProperty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const propertyId = Number(req.params.id);
      if (isNaN(propertyId) || propertyId <= 0) {
        throw PropertyError.invalidId();
      }
      const property = await this.propertyService.getProperty(propertyId.toString());

      if (!property) {
        throw PropertyError.notFound();
      }

      res.json(property);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Получение списка объектов с фильтрацией
   */
  getProperties = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.propertyService.getProperties({
        page: Number(req.query.page || 1),
        type: req.query.type as any,
      });
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Создание нового объекта недвижимости
   */
  createProperty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.propertyService.createProperty(req.body, req.files as Express.Multer.File[]);
      res.status(201).json({
        ...result,
        location: {
          lat: result.location.latitude,
          lng: result.location.longitude,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Получение объектов для модерации
   */
  listForModeration = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.propertyService.getPropertiesForModeration();
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Обновление статуса модерации
   */
  updateModerationStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const dto: UpdateModerationStatusDto = req.body;
      const result = await this.propertyService.updateModerationStatus(Number(req.params.id), dto);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}

export const propertyController = new PropertyController();
