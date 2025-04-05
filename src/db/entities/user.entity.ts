import { Application } from "@/src/db/entities/application.entity";
import { UserFavorites } from "@/src/db/entities/user-favourites.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Lease } from "./lease.entity";
import { Property } from "./property.entity";

@Entity({ name: "users" })
export class User {
  @PrimaryColumn({ name: "cognito_id", type: "uuid" })
  cognitoId: string;

  @Column("varchar", { length: 255 })
  name: string;

  @Column("varchar", { length: 255, unique: true })
  email: string;

  @Column({ name: "phone_number", type: "varchar", length: 20 })
  phoneNumber: string;

  @Column("varchar", { length: 50 })
  role: string;

  // Relationships
  @OneToMany(() => UserFavorites, (favorite) => favorite.user)
  favorites: UserFavorites[];

  @OneToMany(() => Property, (property) => property.manager)
  managedProperties: Property[];

  @OneToMany(() => Lease, (lease) => lease.investor)
  leases: Lease[];

  @OneToMany(() => Lease, (lease) => lease.manager)
  managedLeases: Lease[]; // Добавлено!

  @OneToMany(() => Application, (app) => app.applicant)
  applications: Application[];
}
