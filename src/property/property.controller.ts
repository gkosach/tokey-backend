import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { ErrorStatus } from "../common/enum/error/error-status.enum";
import { PropertyErrorMessages } from "../common/enum/error/property-error.enum";
import { PropertyError } from "./contract/error/property.error";
import { PropertyService } from "./property.service";
import { UpdateModerationStatusDto } from "./contract/dto/property-moderation.dto";

export class PropertyController {
  private propertyService = new PropertyService();

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

    console.error("Critical error:", error);
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
      const propertyId = Number(req.params.id);
      if (isNaN(propertyId)) {
        throw new PropertyError(ErrorStatus.BadRequest, PropertyErrorMessages.PROPERTY_ERROR_INVALID_ID);
      }

      const property = await this.propertyService.getProperty(propertyId.toString());
      if (!property) {
        throw new PropertyError(ErrorStatus.NotFound, PropertyErrorMessages.PROPERTY_ERROR_INVALID_RESPONSE);
      }

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
  async getProperties(req: Request, res: Response) {
    try {
      const result = await this.propertyService.getProperties({
        page: Number(req.query.page),
        type: req.query.type as any,
      });
      res.json(result);
    } catch (error) {
      this.handleError(error, res);
      return res;
    }
  }

  /**
   * Создает новый объект недвижимости с прикрепленными фотографиями
   * @param req Запрос с данными объекта и файлами
   * @param res Ответ с созданным объектом или ошибкой
   */
  async createProperty(req: Request, res: Response) {
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
      this.handleError(error, res);
    }
  }

  async listForModeration(req: Request, res: Response) {
    try {
      const result = await this.propertyService.getPropertiesForModeration();
      res.json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async updateModerationStatus(req: Request, res: Response) {
    try {
      const dto: UpdateModerationStatusDto = req.body;
      const result = await this.propertyService.updateModerationStatus(Number(req.params.id), dto);
      res.json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  }
}

export const propertyController = new PropertyController();
