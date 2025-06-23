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
   * Получает все доступные районы недвижимости
   */
  async getAvailableDistricts(req: Request, res: Response): Promise<void> {
    const result = await this.propertyService.getAvailableDistricts();

    res.json({
      success: true,
      data: result,
    });
  }

  /**
   * Получает все объекты недвижимости с фильтрацией
   */
  async getAllProperties(req: Request, res: Response): Promise<void> {
    const { districts, status, roi, minPrice, maxPrice, limit, offset } = req.query;

    const preparedDistricts = typeof districts === "string" ? districts.split("|") : undefined;

    const filters = {
      districts: preparedDistricts,
      status: status as any,
      roi: parseInt(roi as string),
      minPrice: parseInt(minPrice as string),
      maxPrice: parseInt(maxPrice as string),
      // developerId: developerId as string,
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
}

export const propertyController = new PropertyController();
