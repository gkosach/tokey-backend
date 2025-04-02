import { createClassLogger } from "@/src/config/logger";
import { LeaseRepository } from "@/src/db/repository";
import { Request, Response } from "express";

/**
 * Контроллер для управления договорами аренды
 */
export class LeaseController {
  private readonly leaseRepository: LeaseRepository;
  private readonly logger;

  constructor(leaseRepository: LeaseRepository) {
    this.logger = createClassLogger(this.constructor.name);

    this.leaseRepository = leaseRepository;
  }

  /**
   * Создаёт новый договор аренды
   */
  async createLease(req: Request, res: Response): Promise<void> {
    try {
      const leaseData = req.body;
      const newLease = await this.leaseRepository.createLease(leaseData);
      res.status(201).json(newLease);
    } catch (error: any) {
      res.status(500).json({
        message: `Error creating lease: ${error.message}`,
      });
    }
  }
  /**
   * Получает договор аренды по ID
   */
  async getLease(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const lease = await this.leaseRepository.findLeaseById(id);

      if (lease) {
        res.json(lease);
      } else {
        res.status(404).json({ message: "Lease not found" });
      }
    } catch (error: any) {
      res.status(500).json({
        message: `Error retrieving lease: ${error.message}`,
      });
    }
  }

  /**
   * Получает список всех договоров аренды
   */
  async getLeases(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as { id: string; role: string } | undefined;
      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const { id, role } = user;
      let leases;

      if (role === "manager") {
        leases = await this.leaseRepository.findLeasesByManagerId(id);
      } else if (role === "tenant") {
        leases = await this.leaseRepository.findLeasesByTenantId(id);
      } else {
        leases = await this.leaseRepository.findAllLeases();
      }

      res.json(leases);
    } catch (error: any) {
      res.status(500).json({
        message: `Error retrieving leases: ${error.message}`,
      });
    }
  }

  /**
   * Получает платежи по конкретному договору аренды
   */
  async getLeasePayments(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const payments = await this.leaseRepository.findPaymentsByLeaseId(id);

      if (payments.length > 0) {
        res.json(payments);
      } else {
        res.status(404).json({ message: "No payments found for this lease" });
      }
    } catch (error: any) {
      res.status(500).json({
        message: `Error retrieving lease payments: ${error.message}`,
      });
    }
  }

  /**
   * Обновляет параметры договора
   */
  async updateLease(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;

      if (!id) {
        res.status(400).json({ message: "Missing lease ID" });
        return;
      }

      await this.leaseRepository.updateLease(id, updateData);
      res.status(200).json({ message: "Lease updated successfully" });
    } catch (error: any) {
      res.status(500).json({
        message: `Error updating lease: ${error.message}`,
      });
    }
  }

  /**
   * Удаляет договор аренды
   */
  async deleteLease(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: "Missing lease ID" });
        return;
      }

      await this.leaseRepository.deleteLease(id);
      res.status(200).json({ message: "Lease deleted successfully" });
    } catch (error: any) {
      res.status(500).json({
        message: `Error deleting lease: ${error.message}`,
      });
    }
  }
}
