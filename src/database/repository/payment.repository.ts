import { Payment } from "@/src/database/entities";
import { BaseRepository } from "@/src/database/repository/base.repository";

export class PaymentRepository extends BaseRepository<Payment> {
  constructor() {
    super(Payment);
  }

  async findById(id: string): Promise<Payment | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<Payment[]> {
    return this.repository.find();
  }

  async create(data: Partial<Payment>): Promise<Payment> {
    return this.repository.save(data);
  }

  async update(id: string, data: Partial<Payment>): Promise<void> {
    await this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
