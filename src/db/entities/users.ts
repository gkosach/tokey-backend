import { Application } from "@/src/db/entities/application";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Lease } from "./lease";
import { Property } from "./property";

@Entity()
export class Users {
  @PrimaryGeneratedColumn({ comment: "Уникальный идентификатор пользователя" })
  id: number;

  @Column("text", {
    unique: true,
    comment: "Идентификатор пользователя в системе Cognito",
  })
  cognitoId: string;

  @Column("text", { comment: "Имя пользователя" })
  name: string;

  @Column("text", { comment: "Электронный адрес пользователя" })
  email: string;

  @Column("text", { comment: "Номер телефона пользователя" })
  phoneNumber: string;

  @Column({
    type: "text",
    comment: "Роль пользователя (\"investor\" для арендатора или \"manager\" для управляющего)",
    enum: ["investor", "manager"],
  })
  role: "investor" | "manager";

  @OneToMany(
    () => {
      return Lease;
    },
    (lease) => {
      return lease.investor;
    },
  )
  leases: Lease[];

  @OneToMany(
    () => {
      return Property;
    },
    (property) => {
      return property.manager;
    },
  )
  managedProperties: Property[];

  @OneToMany(
    () => {
      return Application;
    },
    (application) => {
      return application.applicant;
    },
  )
  applications: Application[];

  @ManyToMany(() => {
    return Property;
  })
  @JoinTable({
    name: "user_favorites",
    joinColumn: {
      name: "userId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "propertyId",
      referencedColumnName: "id",
    },
  })
  favoriteProperties: Property[];
}
