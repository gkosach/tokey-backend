import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Property } from "./property.entity";
import { User } from "./user.entity";

@Entity("application")
export class Application {
  @PrimaryColumn("uuid")
  id: string;

  @Column("timestamp", {
    name: "application_date",
    default: () => {
      return "CURRENT_TIMESTAMP";
    },
  })
  applicationDate: Date;

  @Column("text")
  status: string;

  @Column("text")
  message: string;

  // Свойство заявки
  @ManyToOne(() => Property, (property) => property.applications)
  @JoinColumn({ name: "property_id" })
  property: Property;

  // Заявитель
  @ManyToOne(() => User, (user) => user.applications)
  @JoinColumn({ name: "applicant_id" })
  applicant: User;
}
