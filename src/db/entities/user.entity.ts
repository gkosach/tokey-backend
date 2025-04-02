import { Application } from "@/src/db/entities/application.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Lease } from "./lease.entity";
import { Property } from "./property.entity";

@Entity({ name: "users" }) // Явно указываем имя таблицы
export class User {
  @PrimaryColumn({
    name: "cognito_id", // Соответствует имени колонки в БД
    type: "uuid",
  })
  cognitoId: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ name: "phone_number" }) // snake_case для БД
  phoneNumber: string;

  @Column()
  role: string;

  @Column("uuid", {
    name: "favorite_property_ids", // Соответствует имени колонки
    array: true,
    default: () => "'{}'::uuid[]",
  })
  favoritePropertyIds: string[];

  // Связи
  @OneToMany(() => Property, (property) => property.manager)
  managedProperties: Property[];

  @OneToMany(() => Lease, (lease) => lease.investor)
  leases: Lease[];

  @OneToMany(() => Lease, (lease) => lease.manager)
  managedLeases: Lease[];

  @OneToMany(() => Application, (application) => application.applicant)
  applications: Application[];
}
