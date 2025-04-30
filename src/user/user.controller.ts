import { NextFunction, Response } from "express";
import { AuthRequest } from "../common/types/auth-request.types";
import { UserService } from "./user.service";

export class UserController {
  constructor(readonly userService: UserService = new UserService()) {}

  /**
   * Получает профиль пользователя по Cognito ID
   * @returns Пользователя с привязанными кошельками и записями стейкинга
   * @throws {Error} Если пользователь не авторизован
   */
  async getProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new Error("Unauthorized");

      const user = await this.userService.getUserByCognitoId(req.user.id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async getCurrentUser(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new Error("Unauthorized");
      const user = await this.userService.getUserByCognitoId(req.user.id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { cognitoId, email, phoneNumber } = req.body;

      if (!cognitoId || !email || !phoneNumber) {
        res.status(400).json({ error: "Missing required fields" });
        return;
      }

      const newUser = await this.userService.createUser({
        cognitoId,
        email,
        phoneNumber,
      });

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Обновляет настройки пользователя
   * @returns Обновленного пользователя
   */
  async updateUserSettings(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new Error("Unauthorized");

      const updatedUser = await this.userService.updateUserSettings(req.user.id, req.body);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Инициирует процесс KYC-верификации
   * @returns Статус 202 Accepted при успешном запуске
   * @throws {Error} Если пользователь не авторизован
   */
  async initiateKyc(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new Error("Unauthorized");

      const result = await this.userService.initiateKycVerification(req.user.id, req.body.documents);
      res.status(202).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Привязывает Solana-кошелек к пользователю
   * @returns Созданный кошелек со статусом 201 Created
   * @throws {Error} При ошибках валидации или конфликтах
   */
  async linkWallet(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new Error("Unauthorized");

      const wallet = await this.userService.linkSolanaWallet(req.user.id, req.body.address, req.body.signature);
      res.status(201).json(wallet);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Получает записи стейкинга пользователя
   * @returns Массив записей стейкинга с информацией о недвижимости
   * @throws {Error} Если пользователь не авторизован
   */
  async getStakingRecords(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new Error("Unauthorized");

      const records = await this.userService.getStakingRecords(req.user.id);
      res.json(records);
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
