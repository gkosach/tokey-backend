import { createClassLogger } from "@/src/config/logger";
import { PropertyDTO } from "@/src/controllers/contract";
import { UserRole } from "@/src/db/contract/enum/user-roles.enum";
import { PropertyRepository, UserRepository } from "@/src/db/repository";
import { Request, Response } from "express";

/**
 * Контроллер для работы с инвесторами.
 */
export class ManagerController {
  private readonly usersRepository: UserRepository;
  private readonly propertyRepository: PropertyRepository;
  private readonly logger;

  constructor(usersRepository: UserRepository, propertyRepository: PropertyRepository) {
    this.logger = createClassLogger(this.constructor.name);
    this.usersRepository = usersRepository;
    this.propertyRepository = propertyRepository;
  }

  /**
   * Находит инвестора по его идентификатору в Cognito.
   *
   * @param req Запрос.
   * @param res Ответ.
   * @returns Промис, который разрешается после обработки запроса.
   */
  async getManager(req: Request, res: Response): Promise<void> {
    try {
      const { cognitoId } = req.params;
      const manager = await this.usersRepository.findUserByCognitoId(cognitoId);
      if (manager) {
        res.json(manager);
      } else {
        res.status(404).json({ message: "Manager not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: `Error retrieving manager: ${error.message}` });
    }
  }

  /**
   * Создаёт нового менеджера в базе данных.
   *
   * @param req Запрос.
   * @param res Ответ.
   * @returns Промис, который разрешается после обработки запроса.
   */
  async createmanager(req: Request, res: Response): Promise<void> {
    try {
      const { cognitoId, name, email, phoneNumber } = req.body;

      const manager = await this.usersRepository.createUser({
        cognitoId,
        name,
        email,
        phoneNumber,
        role: UserRole.MANAGER,
      });

      res.status(201).json(manager);
    } catch (error: any) {
      res.status(500).json({ message: `Error creating manager: ${error.message}` });
    }
  }

  /**
   * Обновляет менеджера в базе данных.
   *
   * @param req Запрос.
   * @param res Ответ.
   * @returns Промис, который разрешается после обработки запроса.
   */
  async updateManager(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, email, phoneNumber } = req.body;

      if (!id) {
        res.status(400).json({ message: "Missing required parameter: id" });
        return;
      }

      await this.usersRepository.updateUser(id, {
        name,
        email,
        phoneNumber,
      });

      res.status(200).json({ message: "Manager updated successfully" });
    } catch (error: any) {
      res.status(500).json({ message: `Error updating manager: ${error.message}` });
    }
  }

  /**
   * Получает объекты недвижимости, которыми управляет менеджер
   * @param req Запрос с ID менеджера
   * @param res Ответ со списком объектов недвижимости
   */
  async getManagerProperties(req: Request, res: Response): Promise<void> {
    try {
      const managerId = (req as any).user.id;
      if (!managerId) {
        res.status(400).json({ message: "Manager ID is required" });
        return;
      }

      const properties = await this.propertyRepository.findPropertiesByManagerId(managerId);
      const propertyDtos = properties.map((property) => {
        return PropertyDTO.fromEntity(property);
      });

      res.json(propertyDtos);
    } catch (error: any) {
      res.status(500).json({
        message: `Error retrieving manager properties: ${error.message}`,
      });
    }
  }
}
