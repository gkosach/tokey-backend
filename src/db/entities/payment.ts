import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lease } from "./lease";

/**
 * Сущность платежа.
 */
@Entity()
export class Payment {
  @PrimaryGeneratedColumn({ comment: "Уникальный идентификатор платежа" })
  id: number;

  @Column("float", { comment: "Сумма платежа, подлежащая оплате" })
  amountDue: number;

  @Column("float", { comment: "Сумма платежа, уже оплаченная" })
  amountPaid: number;

  @Column("timestamp", { comment: "Дата, до которой необходимо произвести платеж" })
  dueDate: Date;

  @Column("timestamp", { nullable: true, comment: "Дата фактического платежа" })
  paymentDate?: Date;

  @Column("text", { comment: "Статус платежа" })
  paymentStatus: string;

  @ManyToOne(
    () => {
      return Lease;
    },
    (lease) => {
      return lease.payments;
    },
  )
  @JoinColumn({ name: "leaseId" })
  lease: Lease;
}
