import { Response } from "express";
import { AuthRequest } from "../common";
import { UserService } from "./user.service";

export class UserController {
  constructor(readonly userService: UserService = new UserService()) {}

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
   * Обновляет email пользователя
   */
  async updateEmail(req: AuthRequest, res: Response): Promise<void> {
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
  }
}
export const userController = new UserController();
