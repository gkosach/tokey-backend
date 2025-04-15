import { Request, Response } from "express";
import { InvestorService } from "./investor.service";
import { Prisma } from "@prisma/client";
import { InvestorErrorMessages } from "../common/enum/error/investor-error.enum";
import { InvestorError } from "./contract/error/investor.error";
import { ErrorStatus } from "../common/enum/error/error-status.enum";

export class InvestorController {
  private readonly investorService = new InvestorService();

  private handleError(error: unknown, res: Response): void {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      this.sendErrorResponse(res, ErrorStatus.InternalError, InvestorErrorMessages.INVESTOR_ERROR_DATABASE_FAILED);
      return;
    }

    if (error instanceof InvestorError) {
      this.sendErrorResponse(res, error.statusCode, error.message);
      return;
    }

    this.sendErrorResponse(res, ErrorStatus.InternalError, InvestorErrorMessages.INVESTOR_ERROR_UNKNOWN);
  }

  private sendErrorResponse(res: Response, code: ErrorStatus, message: string): void {
    res.status(code).json({
      error: {
        code,
        message,
        timestamp: new Date().toISOString(),
      },
    });
  }

  async getInvestor(req: Request, res: Response): Promise<void> {
    try {
      const investor = await this.investorService.getInvestor(req.params.cognitoId);
      if (!investor) {
        throw new InvestorError(ErrorStatus.NotFound, InvestorErrorMessages.INVESTOR_NOT_FOUND);
      }
      res.json(investor);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async createInvestor(req: Request, res: Response): Promise<void> {
    try {
      const investor = await this.investorService.createInvestor(req.body);
      res.status(201).json(investor);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async updateInvestor(req: Request, res: Response): Promise<void> {
    try {
      const investor = await this.investorService.updateInvestor(req.params.cognitoId, req.body);
      res.json(investor);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getCurrentResidences(req: Request, res: Response): Promise<void> {
    try {
      const properties = await this.investorService.getCurrentResidences(req.params.cognitoId);
      res.json(properties);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async addFavoriteProperty(req: Request, res: Response): Promise<void> {
    try {
      const propertyId = Number(req.params.propertyId);
      if (isNaN(propertyId)) {
        throw new InvestorError(ErrorStatus.BadRequest, InvestorErrorMessages.INVALID_PROPERTY_ID);
      }

      const result = await this.investorService.addFavoriteProperty(req.params.cognitoId, propertyId);
      res.json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async removeFavoriteProperty(req: Request, res: Response): Promise<void> {
    try {
      const propertyId = Number(req.params.propertyId);
      if (isNaN(propertyId)) {
        throw new InvestorError(ErrorStatus.BadRequest, InvestorErrorMessages.INVALID_PROPERTY_ID);
      }

      const result = await this.investorService.removeFavoriteProperty(req.params.cognitoId, propertyId);
      res.json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  }
}

export const investorController = new InvestorController();
