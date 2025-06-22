import { Response } from "express";
import { AuthRequest } from "../common";
import { UserService } from "./user.service";

export class UserController {
  constructor(readonly userService: UserService = new UserService()) {}

  /**
   * Создает нового пользователя
   */
  async createUser(req: AuthRequest, res: Response): Promise<void> {
    const { cognitoId, email } = req.body;

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

    res.status(201).json({
      success: true,
      data: newUser,
    });
  }
  /**
   * Получает профиль текущего пользователя
   */
  async getProfile(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user) throw new Error("Unauthorized");

    const user = await this.userService.getUserByCognitoId(req.user.id);
    res.json({
      success: true,
      data: user,
    });
  }

  async getWalletAddress(req: AuthRequest, res: Response) {
    if (!req.user) throw new Error("Unauthorized");

    const user = await this.userService.getUserByCognitoId(req.user.id);

    res.json({
      success: true,
      data: {
        walletAddress: user.wallet?.walletAddress || null,
        kycStatus: user.kycStatus,
      },
    });
  }

  /**
   * Обновляет email пользователя
   * @returns Обновленный пользователь
   */
  async updateEmail(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user) throw new Error("Unauthorized");
    if (!req.body.email) {
      res.status(400).json({
        success: false,
        error: "Missing email",
      });
      return;
    }
    const updatedUser = await this.userService.updateUserEmail(req.user.id, req.body.email);
    res.json(updatedUser);
  }
}

export const userController = new UserController();
