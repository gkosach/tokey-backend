import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";

/**
 * Обработчик ошибок Prisma для централизованной обработки
 */
export function handlePrismaError(error: any) {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return {
          status: 409,
          message: "Unique constraint violation",
          field: error.meta?.target,
        };
      case "P2025":
        return {
          status: 404,
          message: "Record not found",
        };
      default:
        return {
          status: 400,
          message: "Database operation failed",
          code: error.code,
        };
    }
  }

  // Обработка ошибок валидации
  if (error instanceof PrismaClientValidationError) {
    return {
      status: 400,
      message: "Invalid data provided",
      details: error.message,
    };
  }

  // Общая обработка других ошибок
  return {
    status: 500,
    message: "Internal server error",
  };
}
