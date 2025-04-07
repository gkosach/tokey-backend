export class UserDto {
  /** Уникальный ID пользователя (UUID) */
  id!: string;

  /** Имя пользователя */
  name!: string;

  /** Email пользователя */
  email!: string;

  /** Роль пользователя (например, manager или investor) */
  role!: string;

  /** Список ID объектов недвижимости, которыми управляет пользователь */
  managedPropertyIds!: string[];

  /** Список ID аренд, связанных с пользователем */
  leaseIds!: string[];

  /** Список ID избранных объектов недвижимости */
  favoriteIds!: string[];

  /** Список ID заявок, поданных пользователем */
  applicationIds!: string[];
}
