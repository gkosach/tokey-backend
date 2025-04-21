import { NextFunction, Request, Response } from "express";
import { InvestorService } from "./investor.service";
import { InvestorErrorMessages, ErrorStatus } from "../common";
import { InvestorError } from "./index";

/**
 * Контроллер для обработки HTTP-запросов связанных с инвесторами
 */
export class InvestorController {
  private readonly investorService = new InvestorService();

  /**
   * Получение информации об инвесторе
   */
  getInvestor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const investor = await this.investorService.getInvestor(req.params.cognitoId);
      res.json(investor);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Создание нового инвестора
   */
  createInvestor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const investor = await this.investorService.createInvestor(req.body);
      res.status(201).json(investor);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Обновление данных инвестора
   */
  updateInvestor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const investor = await this.investorService.updateInvestor(req.params.cognitoId, req.body);
      res.json(investor);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Получение текущих объектов недвижимости инвестора
   */
  getCurrentResidences = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const properties = await this.investorService.getCurrentResidences(req.params.cognitoId);
      res.json(properties);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Добавление объекта в избранное
   */
  addFavoriteProperty = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const propertyId = Number(req.params.propertyId);
      if (isNaN(propertyId)) {
        throw InvestorError.invalidPropertyId();
      }
      const result = await this.investorService.addFavoriteProperty(req.params.cognitoId, propertyId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Удаление объекта из избранного
   */
  removeFavoriteProperty = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const propertyId = Number(req.params.propertyId);
      if (isNaN(propertyId)) {
        throw InvestorError.invalidPropertyId();
      }
      const result = await this.investorService.removeFavoriteProperty(req.params.cognitoId, propertyId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };
}

export const investorController = new InvestorController();
