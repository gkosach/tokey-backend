import { PropertyFilters } from "@/src/db/contract";
import { In, Repository } from "typeorm";
import { DatabasePostgresProvider } from "../database.postgres.provider";
import { Property, User } from "../entities";

/**
 * Репозиторий для работы с объектами недвижимости.
 */
export class PropertyRepository {
  private repository: Repository<Property>;
  private userRepository: Repository<User>;
  private readonly logger;

  constructor() {
    this.initRepositories();
  }

  async initRepositories() {
    this.repository = await DatabasePostgresProvider.getRepository(Property);
    this.userRepository = await DatabasePostgresProvider.getRepository(User);
  }

  /**
   * Создаёт новый объект недвижимости в базе данных.
   *
   * @param propertyData Объект с данными для создания объекта недвижимости.
   * @returns Промис, который разрешается с созданным объектом.
   */
  async createProperty(propertyData: Partial<Property>): Promise<Property> {
    this.logger.info(`Создание объекта недвижимости: ${JSON.stringify(propertyData)}`);
    return this.repository.save(propertyData);
  }

  /**
   * Находит объект недвижимости по его идентификатору.
   *
   * @param id Идентификатор объекта недвижимости.
   * @returns Промис, который разрешается с найденным объектом или null, если не найден.
   */
  async findPropertyById(id: string): Promise<Property | null> {
    return this.repository.findOne({
      where: { id },
      relations: { manager: true },
    });
  }

  /**
   * Находит объекты недвижимости по Cognito ID менеджера
   * @param cognitoId Идентификатор менеджера в Cognito
   * @returns Промис с массивом объектов недвижимости
   */
  async findPropertiesByCognitoId(cognitoId: string): Promise<Property[]> {
    this.logger.info(`Поиск объектов по Cognito ID менеджера: ${cognitoId}`);
    try {
      return await this.repository.find({
        where: { manager: { cognitoId } },
        relations: ["manager"],
        order: { postedDate: "DESC" },
      });
    } catch (error) {
      this.logger.error(`Ошибка поиска объектов: ${error}`);
      throw new Error("Ошибка получения объектов недвижимости");
    }
  }

  /**
   * Находит объекты недвижимости по массиву ID.
   *
   * @param ids Массив ID объектов недвижимости.
   * @returns Промис с массивом объектов недвижимости.
   */
  async findPropertiesByIds(ids: string[]): Promise<Property[]> {
    return this.repository.find({
      where: { id: In(ids) },
      relations: { manager: true },
    });
  }

  /**
   * Удаляет объект недвижимости из базы данных.
   *
   * @param id Идентификатор объекта недвижимости, который нужно удалить.
   * @returns Промис, который разрешается true, если объект удалён, или false, если не найден.
   */
  async deleteProperty(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  /**
   * Обновляет существующий объект недвижимости в базе данных.
   *
   * @param id Идентификатор объекта недвижимости, который нужно обновить.
   * @param propertyData Объект с обновлёнными данными для объекта недвижимости.
   * @returns Промис, который разрешается после обновления.
   */
  async updateProperty(id: string, propertyData: Partial<Property>): Promise<void> {
    await this.repository.update(id, propertyData);
  }

  /**
   * Находит объекты недвижимости по заданным фильтрам.
   *
   * @param filters Объект с фильтрами для поиска объектов недвижимости.
   * @returns Промис, который разрешается массивом найденных объектов.
   */
  async findPropertiesByFilters(filters: PropertyFilters): Promise<Property[]> {
    const query = this.repository.createQueryBuilder("property").leftJoinAndSelect("property.manager", "manager");

    // Фильтрация
    if (filters.minPrice) query.andWhere("property.pricePerMonth >= :minPrice", { minPrice: filters.minPrice });
    if (filters.maxPrice) query.andWhere("property.pricePerMonth <= :maxPrice", { maxPrice: filters.maxPrice });
    if (filters.beds) query.andWhere("property.beds = :beds", { beds: filters.beds });
    if (filters.baths) query.andWhere("property.baths = :baths", { baths: filters.baths });
    if (filters.minSquareFeet)
      query.andWhere("property.squareFeet >= :minSquareFeet", { minSquareFeet: filters.minSquareFeet });
    if (filters.maxSquareFeet)
      query.andWhere("property.squareFeet <= :maxSquareFeet", { maxSquareFeet: filters.maxSquareFeet });
    if (filters.city) query.andWhere("LOWER(property.city) LIKE LOWER(:city)", { city: `%${filters.city}%` });
    if (filters.state) query.andWhere("LOWER(property.state) LIKE LOWER(:state)", { state: `%${filters.state}%` });
    if (filters.country)
      query.andWhere("LOWER(property.country) LIKE LOWER(:country)", { country: `%${filters.country}%` });
    if (filters.propertyType)
      query.andWhere("LOWER(property.propertyType) = LOWER(:propertyType)", { propertyType: filters.propertyType });
    if (filters.isPetsAllowed !== undefined)
      query.andWhere("property.isPetsAllowed = :isPetsAllowed", { isPetsAllowed: filters.isPetsAllowed });
    if (filters.isParkingIncluded !== undefined)
      query.andWhere("property.isParkingIncluded = :isParkingIncluded", {
        isParkingIncluded: filters.isParkingIncluded,
      });

    // Геопоиск
    if (filters.latitude && filters.longitude && filters.maxDistance) {
      query
        .addSelect(
          `
        ST_Distance(
          property.location,
          ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)
        )`,
          "distance",
        )
        .setParameters({
          lat: filters.latitude,
          lng: filters.longitude,
          maxDist: filters.maxDistance * 1000,
        })
        .where(
          `
        ST_DWithin(
          property.location,
          ST_SetSRID(ST_MakePoint(:lng, :lat), 4326),
          :maxDist
        )`,
        )
        .orderBy("distance", "ASC");
    } else if (filters.sortBy) {
      query.orderBy(`property.${filters.sortBy}`, filters.sortDirection || "ASC");
    } else {
      query.orderBy("property.postedDate", "DESC");
    }

    // Пагинация
    if (filters.limit) query.take(filters.limit);
    if (filters.offset) query.skip(filters.offset);

    return query.getMany();
  }

  async findFavoritePropertiesByUserId(userId: string): Promise<Property[]> {
    try {
      const user = await this.userRepository.findOne({
        where: { cognitoId: userId },
        select: ["favoritePropertyIds"],
      });

      // Проверка типа массива
      if (!user?.favoritePropertyIds || !Array.isArray(user.favoritePropertyIds)) {
        return [];
      }

      return this.repository.find({
        where: { id: In(user.favoritePropertyIds) },
        relations: ["manager"],
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      this.logger.error(`Ошибка поиска избранного: ${message}`);
      throw new Error("Не удалось получить избранные объекты");
    }
  }

  async addPropertyToFavorites(userId: string, propertyId: string): Promise<void> {
    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({
        favoritePropertyIds: () => "favorite_property_ids || ARRAY[:propertyId",
      })
      .where("cognito_id = :userId", { userId })
      .setParameters({ propertyId })
      .execute();

  }
  async removePropertyFromFavorites(userId: string, propertyId: string): Promise<void> {
    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({
        favoritePropertyIds: () => "array_remove(favorite_property_ids, :propertyId)",
      })
      .where("cognito_id = :userId", { userId })
      .setParameters({ propertyId })
      .execute();
  }

  async findPropertiesByManagerId(managerId: string): Promise<Property[]> {
    try {
      return this.repository.find({
        where: { manager: { cognitoId: managerId } },
        relations: ["applications", "leases"],
        order: { postedDate: "DESC" },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      this.logger.error(`Ошибка поиска объектов: ${message}`);
      throw new Error("Ошибка получения объектов");
    }
  }
}
