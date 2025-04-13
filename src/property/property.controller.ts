import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { ErrorStatus } from "../common/enum/error/error-status.enum";
import { PropertyErrorMessages } from "../common/enum/error/property-error.enum";
import { PropertyError } from "../controllers/contract/error/property.error";
import { PropertyService } from "./prtoperty.service";
import { S3Client } from "@aws-sdk/client-s3";
import { CreatePropertyDto } from "./contract/dto/property.dto";

export class PropertyController {
  private readonly propertyService: PropertyService;

  constructor() {
    this.propertyService = new PropertyService(new PrismaClient(), new S3Client({}));
  }

  /**
   * Универсальный обработчик ошибок для операций с недвижимостью
   * @param error Объект ошибки
   * @param res Объект ответа Express
   */
  private handleError(error: unknown, res: Response): void {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return this.sendErrorResponse(
        res,
        ErrorStatus.InternalError,
        PropertyErrorMessages.PROPERTY_ERROR_DATABASE_FAILED,
      );
    }

    if (error instanceof PropertyError) {
      return this.sendErrorResponse(res, error.statusCode, error.message as PropertyErrorMessages);
    }
    console.error("Критическая ошибка:", error);
    this.sendErrorResponse(res, ErrorStatus.InternalError, PropertyErrorMessages.PROPERTY_ERROR_INVALID_RESPONSE);
  }

  /**
   * Формирует унифицированный ответ об ошибке
   * @param res Объект ответа Express
   * @param code HTTP-статус код ошибки
   * @param message Текст ошибки
   */

  private sendErrorResponse(res: Response, code: ErrorStatus, message: PropertyErrorMessages): void {
    res.status(code).json({
      error: {
        code,
        message,
        timestamp: new Date().toISOString(),
      },
    });
  }

  /**
   * Получает объект недвижимости по ID
   * @param req Запрос с параметром ID в URL
   * @param res Ответ с данными объекта или ошибкой
   */
  async getProperty(req: Request, res: Response): Promise<Response> {
    try {
      const property = await this.propertyService.getProperty(req.params.id);
      return res.json(property);
    } catch (error) {
      this.handleError(error, res);
      return res;
    }
  }

  /**
   * Возвращает список объектов недвижимости с фильтрацией
   * @param req Запрос с параметрами фильтрации
   * @param res Ответ с отфильтрованным списком или ошибкой
   */
  async getProperties(req: Request, res: Response): Promise<void> {
    try {
      const properties = await this.propertyService.getProperties(req.query);
      res.json(properties);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  /**
   * Создает новый объект недвижимости с прикрепленными фотографиями
   * @param req Запрос с данными объекта и файлами
   * @param res Ответ с созданным объектом или ошибкой
   */
  async createProperty(req: Request, res: Response): Promise<Response> {
    try {
      const dto = this.prepareDto(req);
      const result = await this.propertyService.createProperty(dto, req.files as Express.Multer.File[]);
      return res.status(201).json(result);
    } catch (error) {
      this.handleError(error, res);
      return res;
    }
  }

  /**
   * Подготавливает DTO из данных запроса
   * @param req Объект запроса Express
   * @returns Валидный DTO объект
   */
  private prepareDto(req: Request): CreatePropertyDto {
    return {
      ...req.body,
      photoUrls: req.body.photoUrls || [],
      isPetsAllowed: Boolean(req.body.isPetsAllowed),
      isParkingIncluded: Boolean(req.body.isParkingIncluded),
    };
  }
}

export const propertyController = new PropertyController();
