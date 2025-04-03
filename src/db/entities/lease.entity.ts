import { Application } from "@/src/db/entities/application.entity";
import { Payment } from "@/src/db/entities/payment.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Property } from "./property.entity";
import { User } from "./user.entity";

@Entity()
export class Lease {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @ManyToOne(() => User, (user) => user.managedLeases)
  manager: User;

  @ManyToOne(() => User, (user) => user.leases)
  investor: User;

  @Column({ name: "start_date" })
  startDate: Date;

  @Column({ name: "end_date" })
  endDate: Date;

  @Column()
  rent: number;

  @Column()
  deposit: number;

  @ManyToOne(() => Property)
  property: Property;

  @ManyToOne(() => Application)
  application: Application;

  @OneToMany(() => Payment, (payment) => payment.lease)
  payments: Payment[];
}
