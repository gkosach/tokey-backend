import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Application } from "./application.entity";
import { Lease } from "./lease.entity";
import { Property } from "./property.entity";

@Entity({ name: "users" })
export class User {
  @PrimaryColumn({ name: "id", type: "uuid" }) // Переименовано обратно на "id"
  id: string;

  @Column("varchar", { length: 255 })
  name: string;

  @Column("varchar", { length: 255, unique: true })
  email: string;

  @Column("varchar", { length: 50 })
  role: string;

  /**
   * Зависимости
   */
  @OneToMany(() => Property, (property) => property.manager)
  managedProperties: Property[];

  @OneToMany(() => Lease, (lease) => lease.investor)
  leases: Lease[];

  @OneToMany(() => Lease, (lease) => lease.manager)
  managedLeases: Lease[];

  @OneToMany(() => Application, (app) => app.applicant)
  applications: Application[];

  /**
   * Indexes
   */
}
