import { Property } from "@/src/db/entities/property.entity";
import { User } from "@/src/db/entities/user.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity("user_favorites")
export class UserFavorites {
  @PrimaryColumn("uuid", { name: "user_id" })
  userId: string;

  @PrimaryColumn("uuid", { name: "property_id" })
  propertyId: string;

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn({ name: "user_id" }) // Добавлено
  user: User;

  @ManyToOne(() => Property, (property) => property.favoritedBy)
  @JoinColumn({ name: "property_id" }) // Добавлено
  property: Property;
}
