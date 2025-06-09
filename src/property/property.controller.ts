import { PropertyStatus } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { PropertyService } from "./property.service";

export class PropertyController {
  private propertyService = new PropertyService();

  /**
   * Получает объект недвижимости по ID
   */
  async getProperty(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const property = await this.propertyService.getProperty(id);

      res.json({
        success: true,
        data: property,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Получает объект недвижимости с транзакциями
   */
  async getPropertyWithTransactions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const property = await this.propertyService.getPropertyWithTransactions(id);

      res.json({
        success: true,
        data: property,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Получает все объекты недвижимости с фильтрацией
   */
  async getAllProperties(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { district, status, developerId, limit, offset } = req.query;

      const filters = {
        district: district as string,
        status: status as PropertyStatus,
        developerId: developerId as string,
        limit: limit ? parseInt(limit as string) : undefined,
        offset: offset ? parseInt(offset as string) : undefined,
      };

      const result = await this.propertyService.getAllProperties(filters);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Получает активные объекты для инвестирования
   */
  async getActiveProperties(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const properties = await this.propertyService.getActiveProperties();

      res.json({
        success: true,
        data: properties,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Создает новый объект недвижимости
   */
  async createProperty(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const files = (req as any).files as Express.Multer.File[];
      const property = await this.propertyService.createProperty(req.body, files || []);

      res.status(201).json({
        success: true,
        data: property,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Обновляет статус объекта недвижимости
   */
  async updatePropertyStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!Object.values(PropertyStatus).includes(status)) {
        res.status(400).json({
          success: false,
          error: "Invalid status. Must be one of: COMING_SOON, ACTIVE, SOLD_OUT, COMPLETED",
        });
        return;
      }

      const property = await this.propertyService.updatePropertyStatus(id, status);

      res.json({
        success: true,
        data: property,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Получает статистику по объекту
   */
  async getPropertyStats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const stats = await this.propertyService.getPropertyStats(id);

      res.json({
        success: true,
        data: stats,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Обновляет количество доступных токенов
   */
  async updateAvailableTokens(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { purchasedTokens } = req.body;

      if (!purchasedTokens || purchasedTokens <= 0) {
        res.status(400).json({
          success: false,
          error: "purchasedTokens must be a positive number",
        });
        return;
      }

      const property = await this.propertyService.updateAvailableTokens(id, purchasedTokens);

      res.json({
        success: true,
        data: property,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const propertyController = new PropertyController();
