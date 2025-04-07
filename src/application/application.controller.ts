import { APPLICATION_STATUS } from "@/src/application/contract/constants/application-status";
import { ApplicationDto } from "@/src/application/contract/dto/application.dto";
import { createClassLogger } from "@/src/common/config/logger.config";
import { ApplicationRepository } from "@/src/database/repository";
import { Request, Response } from "express";
import { Application } from "../database/entities";

/**
 * Контроллер для управления заявками на аренду
 */
export class ApplicationController {
  private readonly applicationRepository: ApplicationRepository;
  private readonly logger;

  constructor(applicationRepository: ApplicationRepository) {
    this.applicationRepository = applicationRepository;
    this.logger = createClassLogger(this.constructor.name);
  }

  async getApplication(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const application = await this.applicationRepository.findApplicationById(id);

      if (application) {
        res.json(this.mapToDto(application));
      } else {
        res.status(404).json({ message: "Application not found" });
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ error: "Failed to get application", details: message });
    }
  }

  async getApplications(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const { id, role } = req.user;
      let applications: Application[];

      if (role === "manager") {
        applications = await this.applicationRepository.findByManagerId(id);
      } else if (role === "investor") {
        applications = await this.applicationRepository.findByApplicantId(id);
      } else {
        res.status(403).json({ message: "Forbidden" });
        return;
      }

      res.json(applications.map((app) => this.mapToDto(app)));
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ error: "Failed to get applications", details: message });
    }
  }

  async createApplication(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user || req.user.role !== "investor") {
        res.status(403).json({ message: "Access denied" });
        return;
      }

      const applicationData = {
        ...req.body,
        applicantId: req.user.id,
      };

      const newApplication = await this.applicationRepository.save(applicationData);
      res.status(201).json(this.mapToDto(newApplication));
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({ error: "Failed to create application", details: message });
    }
  }

  async updateApplicationStatus(req: Request, res: Response): Promise<void> {
    try {
      if (req.user?.role !== "manager") {
        res.status(403).json({ message: "Access denied" });
        return;
      }

      const { id } = req.params;
      const { status, reason } = req.body;

      if (!Object.values(APPLICATION_STATUS).includes(status)) {
        res.status(400).json({ message: "Invalid status" });
        return;
      }

      const application = await this.applicationRepository.findApplicationById(id);
      if (!application) {
        res.status(404).json({ message: "Application not found" });
        return;
      }

      const updateData: Partial<Application> = { status };
      if (status === APPLICATION_STATUS.REJECTED && reason) {
        updateData.message = `${application.message}\nRejection reason: ${reason}`;
      }

      await this.applicationRepository.updateApplication(id, updateData);

      res.status(200).json({
        message: `Application ${status.toLowerCase()} successfully`,
        application: this.mapToDto(application),
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      this.logger.error(`Update application error: ${message}`);
      res.status(500).json({
        error: "Failed to update application",
        details: message,
      });
    }
  }

  private mapToDto(application: Application): ApplicationDto {
    return {
      id: application.id,
      applicationDate: application.applicationDate.toISOString(),
      status: application.status as ApplicationDto["status"],
      message: application.message,
      propertyId: application.property.id,
      applicantId: application.applicant.id,
    };
  }
}
