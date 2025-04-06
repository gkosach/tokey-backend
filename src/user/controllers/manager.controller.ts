import { createClassLogger } from "@/src/common/config/logger.config";
import { User } from "@/src/database/entities";
import { PropertyRepository, UserRepository } from "@/src/database/repository";
import { PropertyDto } from "@/src/property/contract/dto/property.dto";
import { UserDto } from "@/src/user";
import { Response } from "express";

export class ManagerController {
  private readonly logger = createClassLogger(this.constructor.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly propertyRepository: PropertyRepository,
  ) {}

  async getManager(userId: string, res: Response): Promise<void> {
    try {
      const manager = await this.userRepository.findOne({
        where: { id: userId },
        relations: ["managedProperties"],
      });
      if (!manager) {
        this.logger.warn(`Manager not found: ${userId}`);
        res.status(404).json({ message: "Manager not found" });
        return;
      }
      manager.managedProperties = manager.managedProperties || [];
      res.status(200).json(UserDto.fromEntity(manager));
    } catch (error) {
      this.handleError(res, error, "getManager");
    }
  }

  async getManagerProperties(userId: string, res: Response): Promise<void> {
    try {
      const properties = await this.propertyRepository.findPropertiesByManagerId(userId);
      res.status(200).json(properties.map(PropertyDto.fromEntity));
    } catch (error) {
      this.handleError(res, error, "getManagerProperties");
    }
  }

  private handleError(res: Response, error: unknown, context: string): void {
    const message = error instanceof Error ? error.message : "Unknown error";
    this.logger.error(`[${context}] Error: ${message}`, error);

    const statusCode = message.includes("not found") ? 404 : 500;

    res.status(statusCode).json({
      error: message.includes("not found") ? "Not Found" : "Internal Server Error",
      details: message,
    });
  }

  async updateManager(userId: string, updateData: Partial<User>, res: Response): Promise<void> {
    try {
      this.logger.info(`Updating manager: ${userId}`);

      const manager = await this.userRepository.findOne({ where: { id: userId } });
      if (!manager) {
        this.logger.warn(`Manager not found: ${userId}`);
        res.status(404).json({ message: "Manager not found" }); // Убрали return
        return;
      }

      Object.assign(manager, updateData);
      const updatedManager = await this.userRepository.save(manager);

      res.status(200).json(UserDto.fromEntity(updatedManager));
    } catch (error) {
      this.handleError(res, error, "updateManager");
    }
  }
}
