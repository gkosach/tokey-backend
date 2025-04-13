import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

import { ErrorStatus } from "../common/enum/error/error-status.enum";
import { PropertyErrorMessages } from "../common/enum/error/property-error.enum";
import { PropertyError } from "../controllers/contract/error/property.error";
import { PropertyService } from "../property/prtoperty.service";
import { S3Client } from "@aws-sdk/client-s3";

export class PropertyController {
  private readonly propertyService: PropertyService;

  constructor() {
    this.propertyService = new PropertyService(new PrismaClient(), new S3Client({}));
  }
  /**
   * Обработчик ошибок для свойств
   */
  private handlePropertyError(error: unknown, res: Response): void {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(ErrorStatus.InternalError).json({
        message: PropertyErrorMessages.PROPERTY_ERROR_DATABASE_FAILED,
      });
      return;
    }

    if (error instanceof PropertyError) {
      res.status(error.statusCode).json({ message: error.message });
      return;
    }

    res.status(ErrorStatus.InternalError).json({ message: PropertyErrorMessages.PROPERTY_ERROR_INVALID_RESPONSE });
  }

  /**
   * Получает свойство по ID
   */
  async getProperty(req: Request, res: Response): Promise<void> {
    try {
      const property = await this.propertyService.getProperty(req.params.id);
      res.json(property);
    } catch (error) {
      this.handlePropertyError(error, res);
    }
  }

  /**
   * Получает список свойств с фильтрацией
   */
  async getProperties(req: Request, res: Response): Promise<void> {
    try {
      const properties = await this.propertyService.getProperties(req.query);
      res.json(properties);
    } catch (error) {
      this.handlePropertyError(error, res);
    }
  }

  /**
   * Создает новое свойство с прикрепленными фото
   */
  async createProperty(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.propertyService.createProperty(req.body, req.files as Express.Multer.File[]);
      res.status(201).json(result);
    } catch (error) {
      this.handlePropertyError(error, res);
    }
  }
}

export const propertyController = new PropertyController();
