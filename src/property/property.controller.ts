import { NextFunction, Request, Response } from "express";
import { PropertyService } from "./property.service";

export class PropertyController {
  private propertyService = new PropertyService();

  async getProperty(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = req.params.id;
      const property = await this.propertyService.getProperty(id);

      if (!property) {
        res.status(404).json({ error: "Property not found" });
        return;
      }

      res.json(property);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("Invalid ID")) {
          res.status(400).json({ error: "Invalid property ID format" });
        } else {
          next(error);
        }
      } else {
        res.status(500).json({ error: "Unexpected error occurred" });
      }
    }
  }

  async updateModerationStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await this.propertyService.updateModerationStatus(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      } else {
        res.status(500).json({ error: "Unexpected error occurred" });
      }
    }
  }

  async getAllProperties(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const includeStaking = req.query.include === "stakingRecords";
      const properties = await this.propertyService.getAllProperties(includeStaking);
      res.json(properties);
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
