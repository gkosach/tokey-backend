import { Application } from "@/src/db/entities/application";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Lease } from "./lease";
import { Users } from "./users";

/**
 * Сущность объекта недвижимости.
 */
@Entity()
export class Property {
  @PrimaryGeneratedColumn({ comment: "Уникальный идентификатор объекта недвижимости" })
  id: number;

  @Column({ comment: "Название объекта недвижимости" })
  name: string;

  @Column({ comment: "Описание объекта недвижимости" })
  description: string;

  @Column("float", { comment: "Цена аренды в месяц" })
  pricePerMonth: number;

  @Column("float", { comment: "Сумма залога" })
  securityDeposit: number;

  @Column("float", { comment: "Сумма платы за заявку" })
  applicationFee: number;

  @Column("text", { array: true, comment: "Список URL-адресов фотографий объекта недвижимости" })
  photoUrls: string[];

  @Column("boolean", { default: false, comment: "Разрешено ли содержание домашних животных?" })
  isPetsAllowed: boolean;

  @Column("boolean", { default: false, comment: "Включена ли парковка в стоимость аренды?" })
  isParkingIncluded: boolean;

  @Column("integer", { comment: "Количество спален в объекте недвижимости" })
  beds: number;

  @Column("float", { comment: "Количество ванных комнат в объекте недвижимости" })
  baths: number;

  @Column("integer", { comment: "Площадь объекта недвижимости в квадратных футах" })
  squareFeet: number;

  @Column("text", { comment: "Тип объекта недвижимости (например, квартира или дом)" })
  propertyType: string;

  @Column("text", { comment: "Адрес местоположения объекта недвижимости" })
  address: string;

  @Column("text", { comment: "Город местоположения объекта недвижимости" })
  city: string;

  @Column("text", { comment: "Регион местоположения объекта недвижимости" })
  state: string;

  @Column("text", { comment: "Страна местоположения объекта недвижимости" })
  country: string;

  @Column("text", { comment: "Почтовый индекс местоположения объекта недвижимости" })
  postalCode: string;

  @Column("timestamp", {
    default: () => {
      return "CURRENT_TIMESTAMP";
    },
    comment: "Дата публикации объекта недвижимости",
  })
  postedDate: Date;

  @Column("float", {
    nullable: true,
    default: 0,
    comment: "Средний рейтинг объекта недвижимости",
  })
  averageRating?: number;

  @Column("integer", {
    nullable: true,
    default: 0,
    comment: "Количество отзывов для объекта недвижимости",
  })
  numberOfReviews?: number;

  @Column("geometry", {
    spatialFeatureType: "Point",
    srid: 4326,
    comment: "Координаты местоположения объекта недвижимости (PostGIS Point)",
  })
  location: any;

  @Column("float", { comment: "Широта (latitude) местоположения объекта недвижимости" })
  latitude: number;

  @Column("float", { comment: "Долгота (longitude) местоположения объекта недвижимости" })
  longitude: number;

  @OneToMany(
    () => {
      return Lease;
    },
    (lease) => {
      return lease.property;
    },
  )
  leases?: Lease[];

  @ManyToOne(
    () => {
      return Users;
    },
    (user) => {
      return user.managedProperties;
    },
  )
  @JoinColumn({ name: "managerId" })
  manager?: Users;

  @OneToMany(
    () => {
      return Application;
    },
    (application) => {
      return application.property;
    },
  )
  applications?: Application[];

  @ManyToMany(
    () => {
      return Users;
    },
    (user) => {
      return user.favoriteProperties;
    },
  )
  favoritedBy: Users[];
}
