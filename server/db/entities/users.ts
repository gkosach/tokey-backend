import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Lease } from "./lease";
import { Property } from "./property";

@Entity()
export class Users {
  /** Уникальный идентификатор пользователя.*/
  @PrimaryGeneratedColumn()
  id: number;
  /** Идентификатор пользователя в системе Cognito.*/
  @Column("text", { unique: true })
  cognitoId: string;
  /** Имя пользователя.*/
  @Column("text")
  name: string;
  /** Электронный адрес пользователя.*/
  @Column("text")
  email: string;
  /** Номер телефона пользователя.*/
  @Column("text")
  phoneNumber: string;
  /** Роль пользователя (арендатор или менеджер).*/
  @Column("text")
  role: string;
  /** Список всех действий пользователя (договоры).*/
  @OneToMany(() => Lease, (lease) => lease.investor)
  leases: Lease[];
  /** Список объектов недвижимости, которыми управляет пользователь (если менеджер).*/
  @OneToMany(() => Property, (property) => property.manager)
  managedProperties: Property[];
}
