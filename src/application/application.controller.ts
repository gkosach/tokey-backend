import { Request, Response } from "express";
import { ApplicationService } from "./application.service";
import { Prisma } from "@prisma/client";
import { ApplicationError } from "./contract/error/application.error";
import { CreateApplicationDto, UpdateApplicationStatusDto } from "./contract/dto/application.dto";
import { ErrorStatus } from "../common/enum/error/error-status.enum";
import { ApplicationErrorMessages } from "../common/enum/error/apllication-error.enum";

export class ApplicationController {
  private readonly applicationService = new ApplicationService();

  private handleError(error: unknown, res: Response): void {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      this.sendErrorResponse(
        res,
        ErrorStatus.InternalError,
        ApplicationErrorMessages.APPLICATION_ERROR_DATABASE_FAILED,
      );
      return;
    }

    if (error instanceof ApplicationError) {
      this.sendErrorResponse(res, error.statusCode, error.message);
      return;
    }

    this.sendErrorResponse(res, ErrorStatus.InternalError, ApplicationErrorMessages.APPLICATION_ERROR_DATABASE_FAILED);
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

  async listApplications(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.applicationService.listApplications({
        userId: req.query.userId as string,
        userType: req.query.userType as "investor" | "manager",
      });
      res.json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async createApplication(req: Request, res: Response): Promise<void> {
    try {
      const dto: CreateApplicationDto = req.body;
      const result = await this.applicationService.createApplication(dto);
      res.status(201).json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async updateApplicationStatus(req: Request, res: Response): Promise<void> {
    try {
      const dto: UpdateApplicationStatusDto = req.body;
      const result = await this.applicationService.updateApplicationStatus(Number(req.params.id), dto);
      res.json(result);
    } catch (error) {
      this.handleError(error, res);
    }
  }
}

export const applicationController = new ApplicationController();
