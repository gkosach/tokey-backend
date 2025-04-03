import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Lease } from "./lease.entity";

@Entity("payment")
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
  paymentDate?: Date;

  @Column("text", { name: "payment_status" })
  paymentStatus: string;

  @ManyToOne(() => Lease, (lease) => lease.payments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "lease_id" })
  lease: Lease;
}
