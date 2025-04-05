import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Property } from "./property.entity";
import { User } from "./user.entity";

@Entity("applications")
export class Application {
  @PrimaryColumn("uuid")
  id: string;

  @Column("timestamp", { name: "application_date", default: () => "CURRENT_TIMESTAMP" })
  applicationDate: Date;

  @Column("varchar", { length: 50 })
  status: string;

  @Column("text")
  message: string;

  @ManyToOne(() => Property, (property) => property.applications)
  property: Property;

  @ManyToOne(() => User, (user) => user.applications)
  applicant: User;
}
