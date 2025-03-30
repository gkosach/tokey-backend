import { PropertyDTO } from "@/src/controllers/contract";
import { LeaseRepository, PropertyRepository, UsersRepository } from "@/src/db/repository";
import { Request, Response } from "express";

/**
 * Контроллер для работы с инвесторами.
 */
export class InvestorController {
  private readonly usersRepository: UsersRepository;
  private readonly propertyRepository: PropertyRepository;
  private readonly leaseRepository: LeaseRepository;

  constructor(
    usersRepository: UsersRepository,
    propertyRepository: PropertyRepository,
    leaseRepository: LeaseRepository,
  ) {
    this.usersRepository = usersRepository;
    this.propertyRepository = propertyRepository;
    this.leaseRepository = leaseRepository;
  }

  /**
   * Находит инвестора по его идентификатору в Cognito.
   *
   * @param req Запрос.
   * @param res Ответ.
   * @returns Промис, который разрешается после обработки запроса.
   */
  async getInvestor(req: Request, res: Response): Promise<void> {
    try {
      const { cognitoId } = req.params;
      const investor = await this.usersRepository.findUserByCognitoId(cognitoId);
      if (investor) {
        res.json(investor);
      } else {
        res.status(404).json({ message: "Tenant not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: `Error retrieving investor: ${error.message}` });
    }
  }

  /**
   * Создаёт нового инвестора в базе данных.
   *
   * @param req Запрос.
   * @param res Ответ.
   * @returns Промис, который разрешается после обработки запроса.
   */
  async createInvestor(req: Request, res: Response): Promise<void> {
    try {
      const { cognitoId, name, email, phoneNumber } = req.body;

      const investor = await this.usersRepository.createUser({
        cognitoId,
        name,
        email,
        phoneNumber,
        role: "investor",
      });

      res.status(201).json(investor);
    } catch (error: any) {
      res.status(500).json({ message: `Error creating investor: ${error.message}` });
    }
  }

  /**
   * Обновляет инвестора в базе данных.
   *
   * @param req Запрос.
   * @param res Ответ.
   * @returns Промис, который разрешается после обработки запроса.
   */
  async updateInvestor(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, email, phoneNumber } = req.body;

      if (!id) {
        res.status(400).json({ message: "Missing required parameter: id" });
        return;
      }

      await this.usersRepository.updateUser(Number(id), {
        name,
        email,
        phoneNumber,
      });

      res.status(200).json({ message: "Investor updated successfully" });
    } catch (error: any) {
      res.status(500).json({ message: `Error updating investor: ${error.message}` });
    }
  }

  /**
   * Получает объекты недвижимости, которые арендует инвестор
   * @param req Запрос с ID инвестора
   * @param res Ответ со списком объектов недвижимости
   */
  async getInvestorProperties(req: Request, res: Response): Promise<void> {
    try {
      const investorId = (req as any).user.id;
      if (!investorId) {
        res.status(400).json({ message: "Investor ID is required" });
        return;
      }

      const leases = await this.leaseRepository.findActiveLeasesByInvestorId(investorId);
      const propertyIds = leases.map((lease) => {
        return lease.property.id;
      });
      const properties = await this.propertyRepository.findPropertiesByIds(propertyIds);
      const propertyDtos = properties.map((property) => {
        return PropertyDTO.fromEntity(property);
      });

      res.json(propertyDtos);
    } catch (error: any) {
      res.status(500).json({
        message: `Error retrieving investor properties: ${error.message}`,
      });
    }
  }

  /**
   * Получает избранные объекты недвижимости инвестора
   * @param req Запрос
   * @param res Ответ со списком избранных объектов недвижимости
   */
  async getFavoriteProperties(req: Request, res: Response): Promise<void> {
    try {
      const investorId = (req as any).user.id;
      if (!investorId) {
        res.status(400).json({ message: "Investor ID is required" });
        return;
      }

      const properties = await this.propertyRepository.findFavoritePropertiesByUserId(investorId);
      const propertyDtos = properties.map((property) => {
        return PropertyDTO.fromEntity(property);
      });

      res.json(propertyDtos);
    } catch (error: any) {
      res.status(500).json({
        message: `Error retrieving favorite properties: ${error.message}`,
      });
    }
  }

  /**
   * Добавляет объект недвижимости в избранное инвестора
   * @param req Запрос с ID объекта недвижимости
   * @param res Ответ с подтверждением
   */
  async addPropertyToFavorites(req: Request, res: Response): Promise<void> {
    try {
      const investorId = (req as any).user.id;
      const { propertyId } = req.params;

      if (!investorId) {
        res.status(400).json({ message: "Investor ID is required" });
        return;
      }

      if (!propertyId || isNaN(Number(propertyId))) {
        res.status(400).json({ message: "Valid property ID is required" });
        return;
      }

      await this.propertyRepository.addPropertyToFavorites(investorId, Number(propertyId));

      res.status(200).json({ message: "Property added to favorites successfully" });
    } catch (error: any) {
      res.status(500).json({
        message: `Error adding property to favorites: ${error.message}`,
      });
    }
  }

  /**
   * Удаляет объект недвижимости из избранного инвестора
   * @param req Запрос с ID объекта недвижимости
   * @param res Ответ с подтверждением
   */
  async removePropertyFromFavorites(req: Request, res: Response): Promise<void> {
    try {
      const investorId = (req as any).user.id;
      const { propertyId } = req.params;

      if (!investorId) {
        res.status(400).json({ message: "Investor ID is required" });
        return;
      }

      if (!propertyId || isNaN(Number(propertyId))) {
        res.status(400).json({ message: "Valid property ID is required" });
        return;
      }

      await this.propertyRepository.removePropertyFromFavorites(investorId, Number(propertyId));

      res.status(200).json({ message: "Property removed from favorites successfully" });
    } catch (error: any) {
      res.status(500).json({
        message: `Error removing property from favorites: ${error.message}`,
      });
    }
  }
}
