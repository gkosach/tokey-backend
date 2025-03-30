import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Payment } from "./payment";
import { Property } from "./property";
import { Users } from "./users";
import { Application } from "./application";

/**
 * Сущность договора аренды.
 */
@Entity()
export class Lease {
  @PrimaryGeneratedColumn({ comment: "Уникальный идентификатор договора аренды" })
  id: number;

  @Column("timestamp", { comment: "Дата начала аренды" })
  startDate: Date;

  @Column("timestamp", { comment: "Дата окончания аренды" })
  endDate: Date;

  @Column("float", { comment: "Сумма арендной платы" })
  rent: number;

  @Column("float", { comment: "Сумма депозита" })
  deposit: number;

  @ManyToOne(
    () => {
      return Property;
    },
    (property) => {
      return property.leases;
    },
  )
  @JoinColumn({ name: "propertyId" })
  property: Property;

  @ManyToOne(
    () => {
      return Users;
    },
    (user) => {
      return user.leases;
    },
  )
  @JoinColumn({ name: "investorId" })
  investor: Users;

  @ManyToOne(
    () => {
      return Users;
    },
    (user) => {
      return user.managedProperties;
    },
  )
  @JoinColumn({ name: "managerId" })
  manager: Users;

  @JoinColumn({ name: "applicationId" })
  application: Application;

  @OneToMany(
    () => {
      return Payment;
    },
    (payment) => {
      return payment.lease;
    },
  )
  payments: Payment[];
}
