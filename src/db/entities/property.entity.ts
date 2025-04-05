import { Application } from "@/src/db/entities/application.entity";
import { Lease } from "@/src/db/entities/lease.entity";
import { UserFavorites } from "@/src/db/entities/user-favourites.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("properties")
export class Property {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  name: string;

  @Column("text")
  description: string;

  @Column("float", { name: "price_per_month" })
  pricePerMonth: number;

  @Column("float", { name: "security_deposit" })
  securityDeposit: number;

  @Column("float", { name: "application_fee" })
  applicationFee: number;

  @Column("text", { array: true, name: "photo_urls" })
  photoUrls: string[];

  @Column("boolean", { name: "is_pets_allowed", default: false })
  isPetsAllowed: boolean;

  @Column("boolean", { name: "is_parking_included", default: false })
  isParkingIncluded: boolean;

  @Column("int")
  beds: number;

  @Column("float")
  baths: number;

  @Column("int", { name: "square_feet" })
  squareFeet: number;

  @Column("text", { name: "property_type" })
  propertyType: string;

  @Column("text")
  address: string;

  @Column("text")
  city: string;

  @Column("text")
  state: string;

  @Column("text")
  country: string;

  @Column("text", { name: "postal_code" })
  postalCode: string;

  @Column("numeric", { precision: 10, scale: 6 })
  latitude: number;

  @Column("numeric", { precision: 10, scale: 6 })
  longitude: number;

  @Column("timestamp", {
    name: "posted_date",
    default: () => {
      return "CURRENT_TIMESTAMP";
    },
  })
  postedDate: Date;

  @Column("float", { name: "average_rating", default: 0 })
  averageRating: number;

  @Column("int", { name: "number_of_reviews", default: 0 })
  numberOfReviews: number;

  @ManyToOne(() => User, (user) => user.managedProperties)
  manager: User;

  @OneToMany(() => Lease, (lease) => lease.property)
  leases: Lease[];

  @OneToMany(() => Application, (app) => app.property)
  applications: Application[];

  @OneToMany(() => UserFavorites, (favorite) => favorite.property)
  favoritedBy: UserFavorites[];
}
