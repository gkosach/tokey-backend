import { Application } from "@/src/db/entities/application.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Lease } from "./lease.entity";
import { Property } from "./property.entity";

@Entity({ name: "users" })
export class User {
  @PrimaryColumn({
    name: "cognito_id",
    type: "uuid",
  })
  cognitoId: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  email: string;

  @Column({
    name: "phone_number",
    type: "varchar",
  })
  phoneNumber: string;

  @Column("varchar")
  role: string;

  @Column("uuid", {
    name: "favorite_property_ids",
    array: true,
    default: () => "'{}'::uuid[]",
  })
  favoritePropertyIds: string[];

  @OneToMany(() => Property, (property) => property.manager)
  managedProperties: Property[];

  @OneToMany(() => Lease, (lease) => lease.investor)
  leases: Lease[];

  @OneToMany(() => Lease, (lease) => lease.manager)
  managedLeases: Lease[];

  @OneToMany(() => Application, (application) => application.applicant)
  applications: Application[];
}
