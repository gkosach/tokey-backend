import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Property } from "./property.entity";
import { User } from "./user.entity";

@Entity("user_favorites")
export class UserFavorites {
  @PrimaryColumn("uuid", { name: "user_id" })
  userId: string;

  @PrimaryColumn("uuid", { name: "property_id" })
  propertyId: string; // Явное объявление propertyId

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Property)
  @JoinColumn({ name: "property_id" })
  property: Property;
}
