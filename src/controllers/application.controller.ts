  import { APPLICATION_STATUS } from "@/src/controllers/contract/constants/application-status";
  import { Application } from "@/src/db/entities";
  import { ApplicationRepository } from "@/src/db/repository/application.repository";
  import { Request, Response } from "express";

  /**
   * Контроллер для управления заявками на аренду
   */
  export class ApplicationController {
    private readonly applicationRepository: ApplicationRepository;

    constructor(applicationRepository: ApplicationRepository) {
      this.applicationRepository = applicationRepository;
    }

    /**
     * Получает заявку по ID
     */
    async getApplication(req: Request, res: Response): Promise<void> {
      try {
        const { id } = req.params;
        const application = await this.applicationRepository.findApplicationById(Number(id));

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
        const user = req.user as { id: string; role: string } | undefined;
        if (!user) {
          res.status(401).json({ message: "Unauthorized" });
          return;
        }
        const { id, role } = user;
        let applications;

        if (role === "manager") {
          applications = await this.applicationRepository.findApplicationsByManagerId(Number(id));
        } else if (role === "tenant") {
          applications = await this.applicationRepository.findApplicationsByTenantId(Number(id));
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

        if (!id) {
          res.status(400).json({ message: "Missing application ID" });
          return;
        }

        if (!status) {
          res.status(400).json({ message: "Missing status in request body" });
          return;
        }

        const application = await this.applicationRepository.findApplicationById(Number(id));

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

        await this.applicationRepository.updateApplication(Number(id), updateData);

        if (status === APPLICATION_STATUS.APPROVED) {
          res.status(200).json({ message: "Application approved successfully" });
        } else if (status === APPLICATION_STATUS.REJECTED) {
          res.status(200).json({ message: "Application rejected successfully" });
        } else {
          res.status(200).json({ message: "Application status updated successfully" });
        }
      } catch (error: any) {
        res.status(500).json({
          message: `Error updating application status: ${error.message}`,
        });
      }
    }

    /**
     * Удаляет заявку
     */
    async deleteApplication(req: Request, res: Response): Promise<void> {
      try {
        const { id } = req.params;

        if (!id) {
          res.status(400).json({ message: "Missing application ID" });
          return;
        }

        await this.applicationRepository.deleteApplication(Number(id));
        res.status(200).json({ message: "Application deleted successfully" });
      } catch (error: any) {
        res.status(500).json({
          message: `Error deleting application: ${error.message}`,
        });
      }
    }
  }
