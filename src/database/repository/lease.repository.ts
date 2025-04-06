import { BaseRepository } from "@/src/database/repository/base.repository";
import { Lease } from "../entities";

/**
 * Репозиторий для работы с договорами аренды
 */
export class LeaseRepository extends BaseRepository<Lease> {
  constructor() {
    super(Lease);
  }
  async findLeasesByManagerId(managerId: string): Promise<Lease[]> {
    return this.repository.find({
      where: { manager: { id: managerId } },
      relations: ["property", "investor"],
    });
  }

  async findLeaseById(id: string): Promise<Lease | null> {
    return this.repository.findOne({
      where: { id },
      relations: ["property", "investor", "payments"],
    });
  }

  async findPaymentsByLeaseId(leaseId: string): Promise<Lease[]> {
    return this.repository.find({
      where: { id: leaseId },
      relations: ["payments"],
    });
  }
}
