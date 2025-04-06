import { createClassLogger } from "@/src/common/config/logger.config";
import { Lease } from "@/src/database/entities";
import { LeaseRepository } from "@/src/database/repository";
import { Request, Response } from "express";

/**
 * Контроллер для управления договорами аренды
 */
export class LeaseController {
  private readonly leaseRepository: LeaseRepository;
  private readonly logger;

  constructor(leaseRepository: LeaseRepository) {
    this.leaseRepository = leaseRepository;
    this.logger = createClassLogger(this.constructor.name);
  }

  /**
   * Получает список договоров аренды
   */
  async getLeases(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user;
      if (!user) throw new Error("User not authenticated");

      let leases: Lease[];
      if (user.role === "manager") {
        leases = await this.leaseRepository.findLeasesByManagerId(user.id);
      } else {
        leases = await this.leaseRepository.find({
          where: { investor: { id: user.id } },
          relations: ["property"],
        });
      }

      res.status(200).json(leases);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      this.logger.error(`Get leases error: ${message}`);
      res.status(500).json({ error: "Failed to get leases", details: message });
    }
  }

  /**
   * Получает договор аренды по ID
   */
  async getLease(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const lease = await this.leaseRepository.findLeaseById(id);

      if (!lease) {
        res.status(404).json({ message: "Lease not found" });
        return;
      }

      res.status(200).json(lease);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      this.logger.error(`Get lease error: ${message}`);
      res.status(500).json({ error: "Failed to get lease", details: message });
    }
  }

  /**
   * Получает платежи по договору аренды
   */
  async getLeasePayments(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const lease = await this.leaseRepository.findLeaseById(id);

      if (!lease?.payments) {
        res.status(404).json({ message: "No payments found" });
        return;
      }

      res.status(200).json(lease.payments);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      this.logger.error(`Get lease payments error: ${message}`);
      res.status(500).json({ error: "Failed to get payments", details: message });
    }
  }

  /**
   * Создаёт новый договор аренды
   */
  async createLease(req: Request, res: Response): Promise<void> {
    try {
      const leaseData = req.body;
      const newLease = await this.leaseRepository.save(leaseData);
      res.status(201).json(newLease);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      this.logger.error(`Create lease error: ${message}`);
      res.status(500).json({ error: "Failed to create lease", details: message });
    }
  }

  /**
   * Обновляет договор аренды
   */
  async updateLease(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;

      await this.leaseRepository.update(id, updateData);
      res.status(200).json({ message: "Lease updated successfully" });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      this.logger.error(`Update lease error: ${message}`);
      res.status(500).json({ error: "Failed to update lease", details: message });
    }
  }

  /**
   * Удаляет договор аренды
   */
  async deleteLease(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.leaseRepository.delete(id);
      res.status(200).json({ message: "Lease deleted successfully" });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      this.logger.error(`Delete lease error: ${message}`);
      res.status(500).json({ error: "Failed to delete lease", details: message });
    }
  }
}
