import logger from "@/src/config/logger";
import { Repository } from "typeorm";
import { DatabasePostgresProvider } from "../database.postgres.provider";
import { Application } from "../entities";

export class ApplicationRepository {
  private readonly dbProvider: DatabasePostgresProvider;

  constructor(dbProvider: DatabasePostgresProvider) {
    this.dbProvider = dbProvider;
  }

  private applicationRepository(): Repository<Application> {
    return this.dbProvider.getRepository(Application);
  }

  /**
   * Находит заявку по ее идентификатору.
   *
   * @param id Идентификатор заявки.
   * @returns Промис, который разрешается с найденной заявкой или null, если не найдена.
   */
  async findApplicationById(id: number): Promise<Application | null> {
    logger.info(`ApplicationRepository: Finding application by ID ${id}`);
    return await this.applicationRepository().findOne({ where: { id } });
  }

  /**
   * Создаёт новую заявку в базе данных.
   *
   * @param applicationData Объект с данными для создания заявки.
   * @returns Промис, который разрешается с созданной заявкой.
   */
  async createApplication(applicationData: Partial<Application>): Promise<Application> {
    logger.info(`Creating application: ${JSON.stringify(applicationData)}`);
    return await this.applicationRepository().save(applicationData);
  }

  /**
   * Удаляет заявку из базы данных.
   *
   * @param id Идентификатор заявки, которую нужно удалить.
   * @returns Промис, который разрешается после удаления.
   */
  async deleteApplication(id: number): Promise<void> {
    logger.info(`Deleting application with ID ${id}`);
    await this.applicationRepository().delete({ id });
  }

  /**
   * Находит все заявки, связанные с менеджером.
   * @param managerId ID менеджера
   * @returns Промис с массивом заявок
   */
  async findApplicationsByManagerId(managerId: number): Promise<Application[]> {
    logger.info(`Finding applications by manager ID: ${managerId}`);
    return this.applicationRepository().find({
      where: { property: { manager: { id: managerId } } },
      relations: ["property", "applicant"],
    });
  }

  /**
   * Находит все заявки, поданные конкретным арендатором.
   * @param tenantId ID арендатора
   * @returns Промис с массивом заявок
   */
  async findApplicationsByTenantId(tenantId: number): Promise<Application[]> {
    logger.info(`Finding applications by tenant ID: ${tenantId}`);
    return this.applicationRepository().find({
      where: { applicant: { id: tenantId } },
      relations: ["property"],
    });
  }

  /**
   * Находит все заявки в системе.
   * @returns Промис с массивом всех заявок
   */
  async findAllApplications(): Promise<Application[]> {
    logger.info("Finding all applications");
    return this.applicationRepository().find({
      relations: ["property", "applicant"],
    });
  }

  /**
   * Обновляет заявку в базе данных.
   *
   * @param id Идентификатор заявки, которую нужно обновить.
   * @param applicationData Объект с обновленными данными для заявки.
   * @returns Промис, который разрешается после обновления.
   */
  async updateApplication(id: number, applicationData: Partial<Application>): Promise<void> {
    logger.info(`Updating application with ID ${id}: ${JSON.stringify(applicationData)}`);
    await this.applicationRepository().update({ id }, applicationData);
  }
}
