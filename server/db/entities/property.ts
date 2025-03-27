import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Lease } from "./lease";
import { Users } from "./users";

@Entity()
export class Property {
  /** Уникальный идентификатор объекта недвижимости.*/
  @PrimaryGeneratedColumn()
  id: number;
  /** Название объекта недвижимости.*/
  @Column()
  name: string;
  /** Описание объекта недвижимости.*/
  @Column()
  description: string;
  /** Цена аренды в месяц.*/
  @Column("float")
  pricePerMonth: number;
  /** Сумма залога.*/
  @Column("float")
  securityDeposit: number;
  /** Сумма платы за заявку.*/
  @Column("float")
  applicationFee: number;
  /** Список URL-адресов фотографий.*/
  @Column("text", { array: true })
  photoUrls: string[];
  /** Флаг, разрешающий содержание домашних животных.*/
  @Column("boolean", { default: false })
  isPetsAllowed: boolean;
  /** Флаг, указывающий на включение парковки в стоимость аренды.*/
  @Column("boolean", { default: false })
  isParkingIncluded: boolean;
  /** Количество спален.*/
  @Column("integer")
  beds: number;
  /** Количество ванных комнат.*/
  @Column("float")
  baths: number;
  /** Площадь объекта недвижимости в квадратных футах.*/
  @Column("integer")
  squareFeet: number;
  /** Тип объекта недвижимости.*/
  @Column("text")
  propertyType: string;
  /** Адрес местоположения.*/
  @Column("text")
  address: string;
  /** Город местоположения.*/
  @Column("text")
  city: string;
  /** Регион местоположения.*/
  @Column("text")
  state: string;
  /** Страна местоположения.*/
  @Column("text")
  country: string;
  /** Почтовый индекс местоположения.*/
  @Column("text")
  postalCode: string;
  /** Дата публикации объекта недвижимости.*/
  @Column("timestamp", {
    default: () => {
      return "CURRENT_TIMESTAMP";
    },
  })
  postedDate: Date;
  /** Средний рейтинг объекта недвижимости.*/
  @Column("float", { nullable: true, default: 0 })
  averageRating: number;
  /** Количество отзывов.*/
  @Column("integer", { nullable: true, default: 0 })
  numberOfReviews: number;
  /** Список договоров аренды, связанных с объектом недвижимости.*/
  @OneToMany(() => Lease, (lease) => lease.property)
  leases: Lease[];

  /** Менеджер, управляющий объектом недвижимости.*/
  @ManyToOne(() => Users, (user) => user.managedProperties)
  @JoinColumn({ name: "managerId" })
  manager: Users;
}
