import { NextFunction, Request, Response } from "express";
import { PropertyService } from "./property.service";

export class PropertyController {
  private propertyService = new PropertyService();

  async getProperty(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const property = await this.propertyService.getProperty(id);
      res.json(property);
    } catch (error) {
      next(error);
    }
  }

  async updateModerationStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.propertyService.updateModerationStatus(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async getProperties(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.propertyService.getPropertiesForModeration();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async createProperty(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.propertyService.createProperty(req.body, req.files as Express.Multer.File[]);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async listForModeration(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.propertyService.getPropertiesForModeration();
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}

export const propertyController = new PropertyController();
