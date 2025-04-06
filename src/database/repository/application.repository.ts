import { BaseRepository } from "@/src/database/repository/base.repository";
import { FindOneOptions } from "typeorm";
import { Application } from "../entities";

/**
 * Репозиторий для работы с заявками на аренду
 */
/**
 * Репозиторий для работы с заявками
 */
export class ApplicationRepository extends BaseRepository<Application> {
  constructor() {
    super(Application);
  }

  async findByApplicantId(applicantId: string): Promise<Application[]> {
    return this.repository.find({
      where: { applicant: { id: applicantId } },
      relations: ["applicant", "property"],
    });
  }

  async findByManagerId(managerId: string): Promise<Application[]> {
    return this.repository.find({
      where: { property: { manager: { id: managerId } } },
      relations: ["applicant", "property"],
    });
  }
  async findApplicationById(id: string): Promise<Application | null> {
    return this.repository.findOne({
      where: { id },
      relations: ["applicant", "property"],
    } as FindOneOptions<Application>);
  }

  async updateApplication(id: string, updateData: Partial<Application>): Promise<void> {
    await this.repository.update(id, updateData);
  }
}
