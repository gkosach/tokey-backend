import { createClassLogger } from "@/src/common/config/logger.config";
import { Response } from "express";
import { In } from "typeorm";
import { LeaseRepository, PropertyRepository, UserRepository } from "../../database/repository";

/**
 * Контроллер для работы с инвесторами
 */
export class InvestorController {
  private readonly logger = createClassLogger(this.constructor.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly leaseRepository: LeaseRepository,
    private readonly propertyRepository: PropertyRepository,
  ) {}

  async createInvestor(userId: string, res: Response): Promise<void> {
    try {
      this.logger.debug(`Received request to create investor with ID: ${userId}`);

      const investor = await this.userRepository.save({ id: userId, role: "investor" });

      this.logger.debug(`Successfully created and saved investor: ${JSON.stringify(investor)}`);

      res.status(201).json({
        id: investor.id,
        name: investor.name,
        email: investor.email,
        role: investor.role,
      });
    } catch (error) {
      this.handleError(res, error, "createInvestor");
    }
  }

  /**
   * Получение данных инвестора
   */
  async getInvestor(userId: string, res: Response): Promise<void> {
    try {
      const investor = await this.userRepository.findOne({
        where: { id: userId },
        relations: [ "leases", "applications"],
      });

      if (!investor) {
        return this.sendError(res, 404, "Investor not found");
      }

      res.status(200).json({
        id: investor.id,
        name: investor.name,
        email: investor.email,
        role: investor.role,
        leaseIds: investor.leases.map((l) => {
          return l.id;
        }),
        applicationIds: investor.applications.map((a) => {
          return a.id;
        }),
      });
    } catch (error) {
      this.handleError(res, error, "getInvestor");
    }
  }

  /**
   * Получение объектов недвижимости инвестора
   */
  async getInvestorProperties(userId: string, res: Response): Promise<void> {
    try {
      const activeLeases = await this.leaseRepository.find({
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
        res.status(200).json([]);
        return;
      }

      const properties = await this.propertyRepository.find({
        where: { id: In(propertyIds) },
      });

      res.status(200).json(
        properties.map((property) => {
          return {
            id: property.id,
            name: property.name,
            description: property.description,
            pricePerMonth: property.pricePerMonth,
          };
        }),
      );
    } catch (error) {
      this.handleError(res, error, "getInvestorProperties");
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
