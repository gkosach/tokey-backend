import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Payment } from "./payment";
import { Property } from "./property";
import { Users } from "./users";

@Entity()
export class Lease {
  /** Уникальный идентификатор договора аренды.*/
  @PrimaryGeneratedColumn()
  id: number;
  /** Дата начала аренды.*/
  @Column("timestamp")
  startDate: Date;
  /** Дата окончания аренды.*/
  @Column("timestamp")
  endDate: Date;
  /** Сумма арендной платы.*/
  @Column("float")
  rent: number;
  /** Сумма депозита.*/
  @Column("float")
  deposit: number;
  /** Объект недвижимости, арендуемый по договору.*/
  @ManyToOne(() => Property, (property) => property.leases)
  @JoinColumn({ name: "propertyId" })
  property: Property;
  /** Пользователь, арендующий объект недвижимости.*/
  @ManyToOne(() => Users, (investor) => investor.leases)
  @JoinColumn({ name: "investorId" })
  investor: Users;
  /** Менеджер, управляющий объектом недвижимости.*/
  @ManyToOne(() => Users, (user) => user.managedProperties)
  @JoinColumn({ name: "managerId" })
  manager: Users;
  /** Дата подачи заявки.*/
  @Column("timestamp")
  applicationDate: Date;
  /** Статус заявки.*/
  @Column("text")
  status: string;
  /** Список платежей по договору аренды.*/
  @OneToMany(() => Payment, (payment) => payment.lease)
  payments: Payment[];
}
