import { createClassLogger } from "@/src/config/logger";
import { DeepPartial, Repository } from "typeorm";
import { DatabasePostgresProvider } from "../database.postgres.provider";
import { Application } from "../entities";

/**
 * Репозиторий для работы с сущностью "Заявка".
 */
export class ApplicationRepository {
  private readonly logger = createClassLogger(ApplicationRepository.name);
  private repository: Repository<Application>;

  constructor() {
    this.initializeRepository();
  }

  async initializeRepository() {
    this.repository = await DatabasePostgresProvider.getRepository(Application);
  }
  /**
   * Находит заявку по её идентификатору.
   * @param id Идентификатор заявки.
   * @returns Промис, который разрешается найденной заявкой или null, если не найдена.
   */
  async findApplicationById(id: string): Promise<Application | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        property: { manager: true },
        applicant: true,
      },
    });
  }

  /**
   * Создаёт новую заявку в базе данных.
   * @param applicationData Данные для создания заявки.
   * @returns Промис с созданной заявкой.
   */
  async createApplication(applicationData: DeepPartial<Application>): Promise<Application> {
    this.logger.info(`Создаём заявку: ${JSON.stringify(applicationData)}`);
    return this.repository.save(applicationData);
  }

  /**
   * Удаляет заявку из базы данных.
   * @param id Идентификатор заявки для удаления.
   * @returns Промис, который разрешается true, если заявка удалена, или false, если не найдена.
   */
  async deleteApplication(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  /**
   * Находит все заявки, связанные с менеджером.
   * @param managerId Идентификатор менеджера.
   * @returns Промис с массивом заявок.
   */
  async findApplicationsByManagerId(managerId: string): Promise<Application[]> {
    return this.repository.find({
      where: { property: { manager: { cognitoId: managerId } } }, // Используем cognitoId
      relations: {
        property: { manager: true },
        applicant: true,
      },
      order: { applicationDate: "DESC" },
    });
  }

  /**
   * Находит все заявки, поданные конкретным арендатором.
   * @param tenantId Идентификатор арендатора.
   * @returns Промис с массивом заявок.
   */
  async findApplicationsByTenantId(tenantId: string): Promise<Application[]> {
    return this.repository.find({
      where: { applicant: { cognitoId: tenantId } }, // Используем cognitoId
      relations: {
        property: { manager: true },
      },
      order: { applicationDate: "DESC" },
    });
  }

  /**
   * Находит все заявки в системе.
   * @returns Промис с массивом всех заявок.
   */
  async findAllApplications(): Promise<Application[]> {
    this.logger.info("Ищем все заявки");
    return this.repository.find({
      relations: {
        property: { manager: true },
        applicant: true,
      },
      order: { applicationDate: "DESC" },
    });
  }

  /**
   * Обновляет данные существующей заявки.
   * @param id Идентификатор заявки для обновления.
   * @param applicationData Новые данные для обновления заявки.
   * @returns Промис с обновлённой заявкой или null, если заявка не найдена.
   */
  async updateApplication(
    id: string,
    applicationData: DeepPartial<Application>,
  ): Promise<Application | null> {
    const result = await this.repository.update(id, applicationData);
    if (result.affected === 0) return null;
    return this.findApplicationById(id);
  }
}
