import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Lease } from "./lease.entity";

@Entity("payments")
export class Payment {
  @PrimaryColumn("uuid")
  id: string;

  @Column("float", { name: "amount_due" })
  amountDue: number;

  @Column("float", { name: "amount_paid" })
  amountPaid: number;

  @Column("timestamp", { name: "due_date" })
  dueDate: Date;

  @Column("timestamp", { name: "payment_date", nullable: true })
  paymentDate: Date | null;

  @Column("varchar", { name: "payment_status", length: 50 })
  paymentStatus: string;

  @ManyToOne(() => Lease, (lease) => lease.payments)
  lease: Lease;
}
