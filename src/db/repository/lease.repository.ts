import { createClassLogger } from "@/src/config/logger";
import { DatabasePostgresProvider } from "@/src/db/database.postgres.provider";
import { LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { Lease, Payment } from "../entities";

/**
 * Репозиторий для работы с договорами аренды
 */
export class LeaseRepository {
  private repository: Repository<Lease>;
  private readonly logger = createClassLogger(LeaseRepository.name);

  constructor() {
    this.initializeRepository();
  }

  async initializeRepository() {
    this.repository = await DatabasePostgresProvider.getRepository(Lease);
  }

  /**
   * Находит договор аренды по ID
   * @param id Идентификатор договора
   * @returns Промис с договором или null
   */
  async findLeaseById(id: string): Promise<Lease | null> {
    return this.repository.findOne({
      where: { id },
      relations: ["property", "investor", "manager"],
    });
  }

  /**
   * Создаёт новый договор аренды
   * @param leaseData Данные договора
   * @returns Промис с созданным договором
   */
  async createLease(leaseData: Partial<Lease>): Promise<Lease> {
    this.logger.info(`Создание договора: ${JSON.stringify(leaseData)}`);
    try {
      const newLease = this.repository.create(leaseData);
      return await this.repository.save(newLease);
    } catch (error) {
      this.logger.error(`Ошибка создания договора: ${error}`);
      throw new Error("Ошибка создания договора");
    }
  }

  /**
   * Находит активные договоры аренды для инвестора
   * @param investorId ID инвестора
   * @returns Промис с массивом активных договоров
   */
  async findActiveLeasesByInvestorId(investorId: string): Promise<Lease[]> {
    const currentDate = new Date();
    return this.repository.find({
      where: {
        investor: { cognitoId: investorId },
        startDate: LessThanOrEqual(currentDate),
        endDate: MoreThanOrEqual(currentDate),
      },
      relations: ["property", "property.manager"],
    });
  }

  /**
   * Обновляет данные договора
   * @param id ID договора
   * @param leaseData Новые данные
   * @returns Промис с обновлённым договором
   */
  async updateLease(id: string, leaseData: Partial<Lease>): Promise<Lease> {
    await this.repository.update(id, leaseData);
    const updatedLease = await this.findLeaseById(id);
    if (!updatedLease) throw new Error("Договор не найден");
    return updatedLease;
  }

  /**
   * Удаляет договор аренды
   * @param id ID договора
   * @returns Промис с результатом операции
   */
  async deleteLease(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  /**
   * Находит платежи по договору аренды
   * @param leaseId ID договора
   * @returns Промис с массивом платежей
   */
  async findPaymentsByLeaseId(leaseId: string): Promise<Payment[]> {
    const lease = await this.repository.findOne({
      where: { id: leaseId },
      relations: ["payments"],
    });
    return lease?.payments || [];
  }

  /**
   * Находит все договоры аренды для менеджера
   * @param managerId ID менеджера
   * @returns Промис с массивом договоров
   */
  async findLeasesByManagerId(managerId: string): Promise<Lease[]> {
    return this.repository.find({
      where: { manager: { cognitoId: managerId } }, // Используем cognitoId
      relations: ["property", "investor", "payments"],
      order: { startDate: "DESC" },
    });
  }

  /**
   * Находит все договоры аренды для арендатора
   * @param tenantId ID арендатора
   * @returns Промис с массивом договоров
   */
  async findLeasesByTenantId(tenantId: string): Promise<Lease[]> {
    return this.repository.find({
      where: { investor: { cognitoId: tenantId } },
      relations: ["property", "manager", "payments"],
      order: { startDate: "DESC" },
    });
  }

  /**
   * Находит все договоры аренды в системе
   * @returns Промис с массивом всех договоров
   */
  async findAllLeases(): Promise<Lease[]> {
    this.logger.info("Поиск всех договоров аренды");
    try {
      return await this.repository.find({
        relations: ["property", "investor", "manager"],
        order: { startDate: "DESC" },
      });
    } catch (error) {
      this.logger.error(`Ошибка получения всех договоров: ${error}`);
      throw new Error("Ошибка получения договоров");
    }
  }
}
