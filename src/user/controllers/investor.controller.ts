import { createClassLogger } from "@/src/common/config/logger.config";
import { Property } from "@/src/database/entities";
import { PropertyDto } from "@/src/property/contract/dto/property.dto";
import { UserDto } from "@/src/user";
import { Response } from "express";
import { In } from "typeorm";
import {
  LeaseRepository,
  PropertyRepository,
  UserFavoritesRepository,
  UserRepository,
} from "../../database/repository";

/**
 * Контроллер для работы с инвесторами
 */
export class InvestorController {
  private readonly logger = createClassLogger(this.constructor.name);

  constructor(
    private readonly userRepo: UserRepository,
    private readonly leaseRepo: LeaseRepository,
    private readonly propertyRepo: PropertyRepository,
    private readonly favoritesRepo: UserFavoritesRepository,
  ) {}

  /**
   * Получение данных инвестора
   */
  async getInvestor(userId: string, res: Response): Promise<void> {
    try {
      const investor = await this.userRepo.findOne({
        where: { id: userId },
        relations: ["favorites", "leases", "applications"],
      });

      if (!investor) {
        return this.sendError(res, 404, "Investor not found");
      }

      res.status(200).json(UserDto.fromEntity(investor));
    } catch (error) {
      this.handleError(res, error, "getInvestor");
    }
  }

  /**
   * Получение объектов недвижимости инвестора
   */
  async getInvestorProperties(userId: string, res: Response): Promise<void> {
    try {
      const activeLeases = await this.leaseRepo.find({
        where: { investor: { id: userId } },
        relations: ["property"],
      });

      const propertyIds = activeLeases
        .map((l) => {
          return l.property?.id;
        })
        .filter((id): id is string => {
          return !!id;
        });

      if (propertyIds.length === 0) {
        res.status(200).json([]); // Убрали return
        return; // Явное завершение функции
      }

      const properties = await this.propertyRepo.find({
        where: { id: In(propertyIds) },
      });

      res.status(200).json(properties.map(PropertyDto.fromEntity));
    } catch (error) {
      this.handleError(res, error, "getInvestorProperties");
    }
  }

  /**
   * Получение избранных объектов недвижимости
   */
  async getFavoriteProperties(userId: string, res: Response): Promise<void> {
    try {
      const favorites = await this.favoritesRepo.find({
        where: { userId },
        relations: ["property"],
        loadRelationIds: false,
      });

      const properties = favorites
        .map((f) => {
          return f.property;
        })
        .filter((p): p is Property => {
          return !!p;
        });

      res.status(200).json(properties.map(PropertyDto.fromEntity));
    } catch (error) {
      this.handleError(res, error, "getFavoriteProperties");
    }
  }

  /**
   * Обработка ошибок
   */
  private handleError(res: Response, error: unknown, context: string): void {
    const message = error instanceof Error ? error.message : "Unknown error";
    this.logger.error(`[${context}] Error: ${message}`, error);

    const statusCode = message.includes("not found") ? 404 : 500;
    const errorType = statusCode === 404 ? "Not Found" : "Internal Server Error";

    res.status(statusCode).json({
      error: errorType,
      details: message,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Отправка ошибки
   */
  private sendError(res: Response, code: number, message: string): void {
    res.status(code).json({ error: message });
  }
}
