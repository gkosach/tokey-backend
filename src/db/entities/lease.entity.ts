import { Payment } from "@/src/db/entities/payment.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Property } from "./property.entity";
import { User } from "./user.entity";

@Entity("leases")
export class Lease {
  @PrimaryColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.managedLeases)
  @JoinColumn({ name: "manager_id" }) // Исправлено
  manager: User;

  @ManyToOne(() => User, (user) => user.leases)
  @JoinColumn({ name: "investor_id" }) // Исправлено
  investor: User;

  @Column({ name: "start_date", type: "timestamp" })
  startDate: Date;

  @Column({ name: "end_date", type: "timestamp" })
  endDate: Date;

  @Column("float")
  rent: number;

  @Column("float")
  deposit: number;

  @ManyToOne(() => Property, (property) => property.leases)
  property: Property;

  @OneToMany(() => Payment, (payment) => payment.lease)
  payments: Payment[];
}
