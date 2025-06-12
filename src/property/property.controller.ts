import { Request, Response } from "express";
import { PropertyService } from "./property.service";

export class PropertyController {
  constructor(private propertyService = new PropertyService()) {}

  /**
   * Создает недвижимость с файлами
   */
  async createProperty(req: Request, res: Response): Promise<void> {
    const property = await this.propertyService.createProperty(req.body);

    res.status(201).json({
      success: true,
      data: property,
    });
  }

  /**
   * Получает все объекты недвижимости с фильтрацией
   */
  async getAllProperties(req: Request, res: Response): Promise<void> {
    const { district, status, developerId, limit, offset } = req.query;

    const filters = {
      district: district as string,
      status: status as any,
      developerId: developerId as string,
      limit: limit ? parseInt(limit as string) : undefined,
      offset: offset ? parseInt(offset as string) : undefined,
    };

    const result = await this.propertyService.getAllProperties(filters);

    res.json({
      success: true,
      data: result,
    });
  }

  /**
   * Получает активные объекты для инвестирования
   */
  async getActiveProperties(req: Request, res: Response): Promise<void> {
    const result = await this.propertyService.getAllProperties({
      status: "ACTIVE" as any,
    });

    res.json({
      success: true,
      data: result,
    });
  }

  /**
   * Получает объект недвижимости по ID
   */
  async getProperty(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const property = await this.propertyService.getPropertyById(id);

    res.json({
      success: true,
      data: property,
    });
  }

  /**
   * Обновляет статус объекта недвижимости
   */
  async updatePropertyStatus(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { status } = req.body;

    const property = await this.propertyService.updatePropertyStatus(id, status);

    res.json({
      success: true,
      data: property,
    });
  }
}

export const propertyController = new PropertyController();
