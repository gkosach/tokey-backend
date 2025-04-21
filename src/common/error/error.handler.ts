import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { BaseError } from "./base.error";
import { ErrorStatus } from "../enum";
import loggerConfig from "../config/logger.config";

export class ErrorHandler {
  /**
   * Глобальный обработчик ошибок для Express
   */
  static handle(error: Error, req: Request, res: Response, next: NextFunction): void {
    try {
      console.error(`[${new Date().toISOString()}] Error:`, {
        message: error.message,
        stack: error.stack,
        path: req.path,
        method: req.method,
      });

      if (error instanceof BaseError) {
        return ErrorHandler.sendError(res, error.statusCode, error.message);
      }

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        loggerConfig.error("Database error - Known Request:", error);
        return ErrorHandler.sendError(res, ErrorStatus.InternalError, "Database operation failed");
      }
      if (error instanceof Prisma.PrismaClientValidationError) {
        loggerConfig.error("Database error - Validation:", error);
        return ErrorHandler.sendError(res, ErrorStatus.BadRequest, "Invalid query parameters");
      }

      ErrorHandler.sendError(res, ErrorStatus.InternalError, "Internal server error");
    } catch (handlerError) {
      console.error("Error handler crashed:", handlerError);
      res.status(500).json({
        error: "Critical server failure",
      });
    }
  }

  /**
   * Универсальный метод отправки ошибок
   */
  private static sendError(res: Response, code: ErrorStatus, message: string): void {
    if (res.headersSent) return;

    res.status(code).json({
      error: {
        code,
        message,
        timestamp: new Date().toISOString(),
      },
    });
  }
}
