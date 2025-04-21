import { prisma } from "../common";
import { Prisma } from "@prisma/client";
import { ManagerError } from "./contract/error/manager.error";

/**
 * Сервис для работы с менеджерами
 */
export class ManagerService {
  /**
   * Получение менеджера по Cognito ID
   * @param cognitoId - Уникальный идентификатор менеджера в Cognito
   * @returns Объект менеджера с привязанными объектами недвижимости
   * @throws {ManagerError} MANAGER_NOT_FOUND - Если менеджер не найден
   * @throws {ManagerError} DATABASE_ERROR - При ошибках базы данных
   */
  async getManager(cognitoId: string) {
    try {
      return await prisma.manager.findUnique({
        where: { cognitoId },
        include: { properties: true },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw ManagerError.databaseError();
      }
      throw error;
    }
  }

  /**
   * Создание нового менеджера
   * @param data - Данные для создания менеджера
   * @returns Созданный объект менеджера
   * @throws {ManagerError} INVALID_DATA - При некорректных входных данных
   * @throws {ManagerError} DATABASE_ERROR - При ошибках базы данных
   */
  async createManager(data: { cognitoId: string; name: string; email: string; phoneNumber: string }) {
    try {
      return await prisma.manager.create({ data });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw ManagerError.invalidData();
        }
        throw ManagerError.databaseError();
      }
      throw error;
    }
  }

  /**
   * Обновление данных менеджера
   * @param cognitoId - Идентификатор менеджера
   * @param data - Обновляемые данные
   * @returns Обновленный объект менеджера
   * @throws {ManagerError} NOT_FOUND - Если менеджер не найден
   * @throws {ManagerError} DATABASE_ERROR - При ошибках базы данных
   */
  async updateManager(cognitoId: string, data: { name?: string; email?: string; phoneNumber?: string }) {
    try {
      return await prisma.manager.update({
        where: { cognitoId },
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw ManagerError.notFound();
        }
        throw ManagerError.databaseError();
      }
      throw error;
    }
  }

  /**
   * Получение списка объектов недвижимости менеджера
   * @param cognitoId - Идентификатор менеджера
   * @returns Массив объектов недвижимости с координатами
   * @throws {ManagerError} DATABASE_ERROR - При ошибках базы данных
   */
  async getManagerProperties(cognitoId: string) {
    try {
      return await prisma.property.findMany({
        where: { manager: { cognitoId } },
        include: { location: true },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw ManagerError.databaseError();
      }
      throw error;
    }
  }
}
