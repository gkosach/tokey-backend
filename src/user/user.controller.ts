import { Response } from "express";
import { AuthRequest } from "../common";
import { UserService } from "./user.service";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */
export class UserController {
  constructor(readonly userService: UserService = new UserService()) {}

  /**
   * @swagger
   * /api/users:
   *   post:
   *     summary: Create a new user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - cognitoId
   *               - email
   *             properties:
   *               cognitoId:
   *                 type: string
   *                 example: "us-east-1_123456"
   *               email:
   *                 type: string
   *                 example: "user@example.com"
   *     responses:
   *       201:
   *         description: User created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 data:
   *                   $ref: '#/components/schemas/User'
   *       400:
   *         description: Missing required fields
   *       409:
   *         description: User already exists
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
   * @swagger
   * /api/users/profile:
   *   get:
   *     summary: Get user profile
   *     tags: [Users]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: User profile data
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       401:
   *         description: Unauthorized
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
   * @swagger
   * /api/users/email:
   *   put:
   *     summary: Update user email
   *     tags: [Users]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *             properties:
   *               email:
   *                 type: string
   *     responses:
   *       200:
   *         description: Updated user
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         description: Missing email
   *       401:
   *         description: Unauthorized
   *       409:
   *         description: Email already exists
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
    res.json({
      success: true,
      data: updatedUser,
    });
  }
}

export const userController = new UserController();
