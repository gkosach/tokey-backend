import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lease } from "./lease";
import { Property } from "./property";
import { Users } from "./users";

/**
 * Сущность для хранения заявок на аренду.
 */
@Entity()
export class Application {
  @PrimaryGeneratedColumn({ comment: "Уникальный идентификатор заявки" })
  id: number;

  @Column("timestamp", { comment: "Дата подачи заявки" })
  applicationDate: Date;

  @Column("text", { comment: "Статус заявки" })
  status: string;

  @Column("text", { comment: "Сообщение или комментарий к заявке" })
  message: string;

  @ManyToOne(
    () => {
      return Property;
    },
    (property) => {
      return property.applications;
    },
  )
  @JoinColumn({ name: "propertyId" })
  property: Property;

  @ManyToOne(
    () => {
      return Users;
    },
    (user) => {
      return user.applications;
    },
  )
  @JoinColumn({ name: "applicantId" })
  applicant: Users;

  @JoinColumn({ name: "leaseId" })
  lease: Lease;
}
