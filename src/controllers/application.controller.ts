import { createClassLogger } from "@/src/config/logger";
import { APPLICATION_STATUS } from "@/src/controllers/contract/constants/application-status";
import { ApplicationDTO } from "@/src/controllers/contract/dto/application.dto";
import { Application } from "@/src/db/entities";
import { ApplicationRepository } from "@/src/db/repository/application.repository";
import { Request, Response } from "express";

/**
 * Контроллер для управления заявками на аренду
 */
export class ApplicationController {
  private readonly applicationRepository: ApplicationRepository;
  private readonly logger;

  constructor(applicationRepository: ApplicationRepository) {
    this.logger = createClassLogger(this.constructor.name);

    this.applicationRepository = applicationRepository;
  }

  /**
   * Получает заявку по ID
   */
  async getApplication(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const application = await this.applicationRepository.findApplicationById(id);

      if (application) {
        res.json(application);
      } else {
        res.status(404).json({ message: "Application not found" });
      }
    } catch (error: any) {
      res.status(500).json({
        message: `Error retrieving application: ${error.message}`,
      });
    }
  }

  /**
   * Получает список всех заявок
   */
  async getApplications(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user as { cognitoId: string; role: string } | undefined;
      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const { cognitoId, role } = user;
      let applications;

      if (role === "manager") {
        applications = await this.applicationRepository.findApplicationsByManagerId(cognitoId);
      } else if (role === "tenant") {
        applications = await this.applicationRepository.findApplicationsByTenantId(cognitoId);
      } else {
        applications = await this.applicationRepository.findAllApplications();
      }

      res.json(applications);
    } catch (error: any) {
      res.status(500).json({
        message: `Error retrieving applications: ${error.message}`,
      });
    }
  }

  /**
   * Создаёт новую заявку на аренду
   */
  async createApplication(req: Request, res: Response): Promise<void> {
    try {
      const applicationData = req.body;
      const newApplication = await this.applicationRepository.createApplication(applicationData);
      res.status(201).json(newApplication);
    } catch (error: any) {
      res.status(500).json({
        message: `Error creating application: ${error.message}`,
      });
    }
  }

  /**
   * Обновляет статус заявки
   */
  async updateApplicationStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status, reason } = req.body;

      const application = await this.applicationRepository.findApplicationById(id);

      if (!application) {
        res.status(404).json({ message: "Application not found" });
        return;
      }

      const updateData = {
        status,
      } as Partial<Application>;

      if (status === APPLICATION_STATUS.REJECTED && reason) {
        updateData.message = `${application.message}\nRejection reason: ${reason}`;
      }

      await this.applicationRepository.updateApplication(id, updateData);

      res.status(200).json({
        message: `Application ${status.toLowerCase()} successfully`,
        application: ApplicationDTO.fromEntity(application),
      });
    } catch (error: any) {
      res.status(500).json({
        message: `Error updating application status: ${error.message}`,
      });
    }
  }
}
