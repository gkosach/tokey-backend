import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Application } from "./application.entity";
import { UserFavorites } from "./user-favourites.entity";
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

  @Column({ name: "phone_number", type: "varchar", length: 20 })
  phoneNumber: string;

  @Column("varchar", { length: 50 })
  role: string;
  /**
   * Зависимости
   */
  @OneToMany(() => UserFavorites, (favorite) => favorite.user)
  favorites: UserFavorites[];

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
