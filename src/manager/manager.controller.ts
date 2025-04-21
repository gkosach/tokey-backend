import { Request, Response } from "express";
import { ManagerService } from "./manager.service";
import { Prisma } from "@prisma/client";
import { ManagerErrorMessages, ErrorStatus } from "../common";
import { ManagerError } from "./index";
import { CreateManagerDto, UpdateManagerDto } from "./contract/dto/manager.dto";

export class ManagerController {
  private readonly managerService = new ManagerService();

  private handleError(error: unknown, res: Response): void {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      this.sendErrorResponse(res, ErrorStatus.InternalError, ManagerErrorMessages.MANAGER_ERROR_DATABASE_FAILED);
      return;
    }

    this.sendErrorResponse(res, ErrorStatus.InternalError, ManagerErrorMessages.MANAGER_ERROR_UNKNOWN);
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

  async getManager(req: Request, res: Response): Promise<void> {
    try {
      const manager = await this.managerService.getManager(req.params.cognitoId);
      if (!manager) {
        throw new ManagerError(ErrorStatus.NotFound, ManagerErrorMessages.MANAGER_NOT_FOUND);
      }
      res.json(manager);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async createManager(req: Request, res: Response): Promise<void> {
    try {
      const dto: CreateManagerDto = req.body;
      const manager = await this.managerService.createManager(dto);
      res.status(201).json(manager);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async updateManager(req: Request, res: Response): Promise<void> {
    try {
      const dto: UpdateManagerDto = req.body;
      const manager = await this.managerService.updateManager(req.params.cognitoId, dto);
      res.json(manager);
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async getManagerProperties(req: Request, res: Response): Promise<void> {
    try {
      const properties = await this.managerService.getManagerProperties(req.params.cognitoId);
      res.json(
        properties.map((p) => ({
          ...p,
          location: p.location
            ? {
                ...p.location,
                coordinates: [p.location.longitude, p.location.latitude],
              }
            : null,
        })),
      );
    } catch (error) {
      this.handleError(error, res);
    }
  }
}

export const managerController = new ManagerController();
