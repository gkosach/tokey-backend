import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lease } from "./lease";

@Entity()
export class Payment {
  /** Уникальный идентификатор платежа.*/
  @PrimaryGeneratedColumn()
  id: number;
  /** Сумма платежа, подлежащая оплате.*/
  @Column("float")
  amountDue: number;
  /** Сумма платежа, уже оплаченная.*/
  @Column("float")
  amountPaid: number;
  /** Дата, до которой необходимо произвести платеж.*/
  @Column("timestamp")
  dueDate: Date;
  /** Дата фактического платежа.*/
  @Column("timestamp", { nullable: true })
  paymentDate: Date;
  /** Статус платежа.*/
  @Column("text")
  paymentStatus: string;
  /** Договор аренды, по которому произведен платеж.*/
  @ManyToOne(() => Lease, (lease) => lease.payments)
  @JoinColumn({ name: "leaseId" })
  lease: Lease;
}
