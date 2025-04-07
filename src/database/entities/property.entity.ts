import { Amenity } from "@/src/database/contract/enum/amenity.enum";
import { Highlight } from "@/src/database/contract/enum/highlight.enum";
import { PropertyType } from "@/src/database/contract/enum/property-type.enum";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Application } from "./application.entity";
import { Lease } from "./lease.entity";
import { User } from "./user.entity";

@Entity("properties")
export class Property {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  name: string;

  @Column("varchar", { length: 255 })
  address: string;

  @Column("text")
  description: string;

  @Column("decimal", { precision: 10, scale: 2, name: "price_per_month" })
  pricePerMonth: number;

  @Column("decimal", { precision: 10, scale: 2, name: "security_deposit" })
  securityDeposit: number;

  @Column("decimal", { precision: 10, scale: 2, name: "application_fee" })
  applicationFee: number;

  @Column("text", { array: true, name: "photo_urls" })
  photoUrls: string[];

  @Column("decimal", { precision: 9, scale: 6, nullable: true })
  latitude: number;

  @Column("decimal", { precision: 9, scale: 6, nullable: true })
  longitude: number;

  @Column("enum", {
    enum: Amenity,
    array: true,
    default: [],
  })
  amenities: Amenity[];

  @Column("enum", {
    enum: Highlight,
    array: true,
    default: [],
  })
  highlights: Highlight[];

  @Column("boolean", { name: "is_pets_allowed", default: false })
  isPetsAllowed: boolean;

  @Column("boolean", { name: "is_parking_included", default: false })
  isParkingIncluded: boolean;

  @Column("integer")
  beds: number;

  @Column("decimal", { precision: 3, scale: 1 })
  baths: number;

  @Column("integer", { name: "square_feet" })
  squareFeet: number;

  @Column({
    type: "enum",
    enum: PropertyType,
    name: "property_type",
  })
  propertyType: PropertyType;

  @Column("varchar", { length: 20 })
  postalCode: string;

  @Column("timestamp", {
    name: "posted_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  postedDate: Date;

  @Column("decimal", {
    precision: 3,
    scale: 2,
    name: "average_rating",
    default: 0,
  })
  averageRating: number;

  @Column("integer", {
    name: "number_of_reviews",
    default: 0,
  })
  numberOfReviews: number;

  // Связи
  @ManyToOne(() => User, (user) => user.managedProperties)
  manager: User;

  @OneToMany(() => Lease, (lease) => lease.property)
  leases: Lease[];

  @OneToMany(() => Application, (app) => app.property)
  applications: Application[];
}
