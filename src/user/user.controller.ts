import { NextFunction, Response } from "express";
import { AuthRequest } from "../common/types/auth-request.types";
import { UserService } from "./user.service";

export class UserController {
  constructor(readonly userService: UserService = new UserService()) {}

  /**
   * Получает профиль текущего пользователя
   * @returns Пользователь с транзакциями и балансами токенов
   * @throws {Error} Если пользователь не авторизован
   */
  async getProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new Error("Unauthorized");

      const user = await this.userService.getUserByCognitoId(req.user.id);
      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Создает нового пользователя с автоматическим HSM кошельком
   * @returns Созданный пользователь со статусом 201 Created
   */
  async createUser(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { cognitoId, email } = req.body;
      console.log("Creating user with Cognito ID:", cognitoId);

      if (!cognitoId || !email) {
        res.status(400).json({
          success: false,
          error: "Missing required fields: cognitoId, email",
        });
        return;
      }

      const newUser = await this.userService.createUser({
        cognitoId,
        email,
      });

      console.log("New user created with HSM wallet:", newUser.walletAddress);

      res.status(201).json({
        success: true,
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Обновляет email пользователя
   * @returns Обновленный пользователь
   */
  async updateEmail(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new Error("Unauthorized");

      const { email } = req.body;

      if (!email) {
        res.status(400).json({
          success: false,
          error: "Missing email",
        });
        return;
      }

      const updatedUser = await this.userService.updateUserEmail(req.user.id, email);

      res.json({
        success: true,
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Получает балансы токенов пользователя по объектам недвижимости
   * @returns Балансы токенов с информацией о недвижимости
   * @throws {Error} Если пользователь не авторизован
   */
  async getTokenBalances(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new Error("Unauthorized");

      const balances = await this.userService.getUserTokenBalances(req.user.id);

      res.json({
        success: true,
        data: balances,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Получает адрес HSM кошелька пользователя
   * @returns Адрес кошелька пользователя
   */
  async getWalletAddress(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new Error("Unauthorized");

      const user = await this.userService.getUserByCognitoId(req.user.id);

      res.json({
        success: true,
        data: {
          walletAddress: user.walletAddress,
          kycStatus: user.kycStatus,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();
