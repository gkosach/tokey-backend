import logger from "@/src/config/logger";
import { DatabasePostgresProvider } from "@/src/db/database.postgres.provider";
import { LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { Lease, Payment } from "../entities";

export class LeaseRepository {
  private readonly dbProvider: DatabasePostgresProvider;

  constructor(dbProvider: DatabasePostgresProvider) {
    this.dbProvider = dbProvider;
  }

  private leaseRepository(): Repository<Lease> {
    return this.dbProvider.getRepository(Lease);
  }

  /**
   * Находит договор аренды по его идентификатору.
   *
   * @param id Идентификатор договора аренды.
   * @returns Промис, который разрешается с найденным договором или null, если не найден.
   */
  async findLeaseById(id: number): Promise<Lease | null> {
    logger.info(`LeaseRepository: Finding lease by ID ${id}`);
    return await this.leaseRepository().findOne({ where: { id } });
  }

  /**
   * Создаёт новый договор аренды в базе данных.
   *
   * @param leaseData Объект с данными для создания договора.
   * @returns Промис, который разрешается с созданным договором.
   */
  async createLease(leaseData: Partial<Lease>): Promise<Lease> {
    logger.info(`Creating lease: ${JSON.stringify(leaseData)}`);
    return await this.leaseRepository().save(leaseData);
  }

  /**
   * Находит активные договоры аренды по ID инвестора.
   * @param investorId ID инвестора
   * @returns Промис с массивом активных договоров аренды
   */
  async findActiveLeasesByInvestorId(investorId: number): Promise<Lease[]> {
    logger.info(`Finding active leases for investor ID: ${investorId}`);

    const currentDate = new Date();

    return this.leaseRepository().find({
      where: {
        investor: { id: investorId },
        startDate: LessThanOrEqual(currentDate),
        endDate: MoreThanOrEqual(currentDate),
      },
      relations: ["property", "property.manager"],
    });
  }

  /**
   * Находит все договоры аренды, связанные с менеджером.
   * @param managerId ID менеджера
   * @returns Промис с массивом договоров аренды
   */
  async findLeasesByManagerId(managerId: number): Promise<Lease[]> {
    logger.info(`Finding leases by manager ID: ${managerId}`);
    return this.leaseRepository().find({
      where: { manager: { id: managerId } },
      relations: ["property", "investor", "payments"],
    });
  }

  /**
   * Находит все договоры аренды, связанные с арендатором.
   * @param tenantId ID арендатора
   * @returns Промис с массивом договоров аренды
   */
  async findLeasesByTenantId(tenantId: number): Promise<Lease[]> {
    logger.info(`Finding leases by tenant ID: ${tenantId}`);
    return this.leaseRepository().find({
      where: { investor: { id: tenantId } },
      relations: ["property", "manager", "payments"],
    });
  }

  /**
   * Находит все договоры аренды в системе.
   * @returns Промис с массивом всех договоров аренды
   */
  async findAllLeases(): Promise<Lease[]> {
    logger.info("Finding all leases");
    return this.leaseRepository().find({
      relations: ["property", "investor", "manager"],
    });
  }

  /**
   * Находит все платежи, связанные с конкретным договором аренды.
   * @param leaseId ID договора аренды
   * @returns Промис с массивом платежей
   */
  async findPaymentsByLeaseId(leaseId: number): Promise<Payment[]> {
    logger.info(`Finding payments for lease ID: ${leaseId}`);
    const lease = await this.leaseRepository().findOne({
      where: { id: leaseId },
      relations: ["payments"],
    });

    return lease?.payments || [];
  }

  /**
   * Обновляет существующий договор аренды в базе данных.
   *
   * @param id Идентификатор договора аренды, которого нужно обновить.
   * @param leaseData Объект с обновленными данными для договора.
   * @returns Промис, который разрешается после обновления.
   */
  async updateLease(id: number, leaseData: Partial<Lease>): Promise<void> {
    logger.info(`Updating lease with ID ${id}: ${JSON.stringify(leaseData)}`);
    await this.leaseRepository().update({ id }, leaseData);
  }

  /**
   * Удаляет договор аренды из базы данных.
   *
   * @param id Идентификатор договора аренды, которого нужно удалить.
   * @returns Промис, который разрешается после удаления.
   */
  async deleteLease(id: number): Promise<void> {
    logger.info(`Deleting lease with ID ${id}`);
    await this.leaseRepository().delete({ id });
  }
}
