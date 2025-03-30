import logger from "@/src/config/logger";
import { PropertyFilters } from "@/src/db/contract/interface/property-filters.interface";
import { In, Repository } from "typeorm";
import { DatabasePostgresProvider } from "../database.postgres.provider";
import { Property, Users } from "../entities";

export class PropertyRepository {
  private readonly dbProvider: DatabasePostgresProvider;

  constructor(dbProvider: DatabasePostgresProvider) {
    this.dbProvider = dbProvider;
  }

  private propertyRepository(): Repository<Property> {
    return this.dbProvider.getRepository(Property);
  }

  /**
   * Создаёт новый объект недвижимости в базе данных.
   *
   * @param propertyData Объект с данными для создания объекта недвижимости.
   * @returns Промис, который разрешается с созданным объектом.
   */
  async createProperty(propertyData: Partial<Property>): Promise<Property> {
    logger.info(`Creating property: ${JSON.stringify(propertyData)}`);
    return await this.propertyRepository().save(propertyData);
  }

  /**
   * Находит объект недвижимости по его идентификатору.
   *
   * @param id Идентификатор объекта недвижимости.
   * @returns Промис, который разрешается с найденным объектом или null, если не найден.
   */
  async findPropertyById(id: number): Promise<Property | null> {
    logger.info(`PropertyRepository: Finding property by ID ${id}`);
    return await this.propertyRepository().findOne({
      where: { id },
      relations: ["manager"],
    });
  }

  async findPropertiesByCognitoId(cognitoId: string): Promise<Property[]> {
    return this.propertyRepository().find({
      where: { manager: { cognitoId } },
      relations: ["manager"],
    });
  }

  /**
   * Находит объекты недвижимости по ID менеджера.
   * @param managerId ID менеджера
   * @returns Промис с массивом объектов недвижимости
   */
  async findPropertiesByManagerId(managerId: number): Promise<Property[]> {
    logger.info(`Finding properties by manager ID: ${managerId}`);
    return this.propertyRepository().find({
      where: { manager: { id: managerId } },
      relations: ["manager"],
    });
  }

  /**
   * Находит объекты недвижимости по массиву ID.
   * @param ids Массив ID объектов недвижимости
   * @returns Промис с массивом объектов недвижимости
   */
  async findPropertiesByIds(ids: number[]): Promise<Property[]> {
    if (ids.length === 0) return [];

    logger.info(`Finding properties by IDs: ${ids.join(", ")}`);
    return this.propertyRepository().find({
      where: { id: In(ids) },
      relations: ["manager"],
    });
  }

  /**
   * Находит объекты недвижимости по заданным фильтрам.
   *
   * @param filters Объект с фильтрами для поиска объектов недвижимости.
   * @returns Промис, который разрешается с массивом найденных объектов.
   */
  async findPropertiesByFilters(filters: PropertyFilters): Promise<Property[]> {
    /** Создание построителя запросов */
    const queryBuilder = this.dbProvider.getRepository(Property).createQueryBuilder("property");

    /** Массив для хранения условий WHERE */
    const whereConditions: string[] = [];

    /** Объект для хранения параметров запроса */
    const parameters: Record<string, any> = {};

    /** Добавление фильтра по минимальной цене */
    if (filters.minPrice) {
      whereConditions.push("property.pricePerMonth >= :minPrice");
      parameters.minPrice = filters.minPrice;
    }

    /** Добавление фильтра по максимальной цене */
    if (filters.maxPrice) {
      whereConditions.push("property.pricePerMonth <= :maxPrice");
      parameters.maxPrice = filters.maxPrice;
    }

    /** Добавление фильтра по количеству спален */
    if (filters.beds) {
      whereConditions.push("property.beds = :beds");
      parameters.beds = filters.beds;
    }

    /** Добавление фильтра по количеству ванных комнат */
    if (filters.baths) {
      whereConditions.push("property.baths = :baths");
      parameters.baths = filters.baths;
    }

    /** Добавление фильтра по минимальной площади */
    if (filters.minSquareFeet) {
      whereConditions.push("property.squareFeet >= :minSquareFeet");
      parameters.minSquareFeet = filters.minSquareFeet;
    }

    /** Добавление фильтра по максимальной площади */
    if (filters.maxSquareFeet) {
      whereConditions.push("property.squareFeet <= :maxSquareFeet");
      parameters.maxSquareFeet = filters.maxSquareFeet;
    }

    /** Добавление фильтра по городу */
    if (filters.city) {
      whereConditions.push("LOWER(property.city) LIKE LOWER(:city)");
      parameters.city = `%${filters.city}%`;
    }

    /** Добавление фильтра по штату/области */
    if (filters.state) {
      whereConditions.push("LOWER(property.state) LIKE LOWER(:state)");
      parameters.state = `%${filters.state}%`;
    }

    /** Добавление фильтра по стране */
    if (filters.country) {
      whereConditions.push("LOWER(property.country) LIKE LOWER(:country)");
      parameters.country = `%${filters.country}%`;
    }

    /** Добавление фильтра по типу недвижимости */
    if (filters.propertyType) {
      whereConditions.push("LOWER(property.propertyType) = LOWER(:propertyType)");
      parameters.propertyType = filters.propertyType;
    }

    /** Добавление фильтра по разрешению на домашних животных */
    if (filters.isPetsAllowed !== undefined) {
      whereConditions.push("property.isPetsAllowed = :isPetsAllowed");
      parameters.isPetsAllowed = filters.isPetsAllowed;
    }

    /** Добавление фильтра по наличию парковки */
    if (filters.isParkingIncluded !== undefined) {
      whereConditions.push("property.isParkingIncluded = :isParkingIncluded");
      parameters.isParkingIncluded = filters.isParkingIncluded;
    }

    /** Добавление фильтра по расстоянию от заданной точки */
    if (filters.latitude !== undefined && filters.longitude !== undefined && filters.maxDistance !== undefined) {
      whereConditions.push(`
    ST_DWithin(
      property.location,
      ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326),
      :maxDistance * 1000
    )
  `);

      parameters.latitude = filters.latitude;
      parameters.longitude = filters.longitude;
      parameters.maxDistance = filters.maxDistance; // в километрах, умножаем на 1000 для метров
    }

    /** Применение сортировки по расстоянию, если заданы координаты */
    if (filters.latitude !== undefined && filters.longitude !== undefined) {
      queryBuilder.addSelect(
        `
    ST_Distance(
      property.location,
      ST_SetSRID(ST_MakePoint(:longitudeSort, :latitudeSort), 4326)
    )`,
        "distance",
      );

      queryBuilder.setParameter("latitudeSort", filters.latitude);
      queryBuilder.setParameter("longitudeSort", filters.longitude);

      queryBuilder.orderBy("distance", "ASC");
    } else if (filters.sortBy) {
      /** Применение обычной сортировки */
      queryBuilder.orderBy(`property.${filters.sortBy}`, filters.sortDirection || "ASC");
    } else {
      /** Сортировка по умолчанию - по дате публикации (от новых к старым) */
      queryBuilder.orderBy("property.postedDate", "DESC");
    }

    /** Применение пагинации */
    if (filters.limit) {
      queryBuilder.take(filters.limit);
    }
    if (filters.offset) {
      queryBuilder.skip(filters.offset);
    }

    /** Выполнение запроса и возврат результатов */
    return await queryBuilder.getMany();
  }

  /**
   * Находит избранные объекты недвижимости пользователя.
   * @param userId ID пользователя
   * @returns Промис с массивом объектов недвижимости
   */
  async findFavoritePropertiesByUserId(userId: number): Promise<Property[]> {
    logger.info(`Finding favorite properties for user ID: ${userId}`);

    const user = await this.dbProvider.getRepository(Users).findOne({
      where: { id: userId },
      relations: ["favoriteProperties", "favoriteProperties.manager"],
    });

    return user?.favoriteProperties || [];
  }

  /**
   * Добавляет объект недвижимости в избранное пользователя.
   * @param userId ID пользователя
   * @param propertyId ID объекта недвижимости
   * @returns Промис, который разрешается после добавления
   */
  async addPropertyToFavorites(userId: number, propertyId: number): Promise<void> {
    logger.info(`Adding property ${propertyId} to favorites for user ${userId}`);

    const user = await this.dbProvider.getRepository(Users).findOne({
      where: { id: userId },
      relations: ["favoriteProperties"],
    });

    if (!user) {
      throw new Error("User not found");
    }

    const property = await this.findPropertyById(propertyId);
    if (!property) {
      throw new Error("Property not found");
    }
    const alreadyFavorited = user.favoriteProperties.some((p) => {
      return p.id === propertyId;
    });

    if (!alreadyFavorited) {
      user.favoriteProperties.push(property);
      await this.dbProvider.getRepository(Users).save(user);
    }
  }

  /**
   * Удаляет объект недвижимости из избранного пользователя.
   * @param userId ID пользователя
   * @param propertyId ID объекта недвижимости
   * @returns Промис, который разрешается после удаления
   */
  async removePropertyFromFavorites(userId: number, propertyId: number): Promise<void> {
    logger.info(`Removing property ${propertyId} from favorites for user ${userId}`);

    const user = await this.dbProvider.getRepository(Users).findOne({
      where: { id: userId },
      relations: ["favoriteProperties"],
    });

    if (!user) {
      throw new Error("User not found");
    }

    user.favoriteProperties = user.favoriteProperties.filter((p) => {
      return p.id !== propertyId;
    });
    await this.dbProvider.getRepository(Users).save(user);
  }
  /**
   * Обновляет существующий объект недвижимости в базе данных.
   *
   * @param id Идентификатор объекта недвижимости, которого нужно обновить.
   * @param propertyData Объект с обновленными данными для объекта недвижимости.
   * @returns Промис, который разрешается после обновления.
   */
  async updateProperty(id: number, propertyData: Partial<Property>): Promise<void> {
    logger.info(`Updating property with ID ${id}: ${JSON.stringify(propertyData)}`);
    await this.propertyRepository().update({ id }, propertyData);
  }

  /**
   * Удаляет объект недвижимости из базы данных.
   *
   * @param id Идентификатор объекта недвижимости, которого нужно удалить.
   * @returns Промис, который разрешается после удаления.
   */
  async deleteProperty(id: number): Promise<void> {
    logger.info(`Deleting property with ID ${id}`);
    await this.propertyRepository().delete({ id });
  }
}
