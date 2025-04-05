import { PropertyFilters } from "@/src/db/contract";
import { In, Repository } from "typeorm";
import { DatabasePostgresProvider } from "../database.postgres.provider";
import { Property, User, UserFavorites } from "../entities";

/**
 * Репозиторий для работы с объектами недвижимости.
 */
export class PropertyRepository {
  private propertyRepository: Repository<Property>;
  private userRepository: Repository<User>;
  private userFavoritesRepository: Repository<UserFavorites>;

  private readonly logger;

  constructor() {
    this.initRepositories();
  }

  async initRepositories() {
    this.propertyRepository = await DatabasePostgresProvider.getRepository(Property);
    this.userRepository = await DatabasePostgresProvider.getRepository(User);
    this.userFavoritesRepository = await DatabasePostgresProvider.getRepository(UserFavorites);
  }

  /**
   * Создаёт новый объект недвижимости в базе данных.
   *
   * @param propertyData Объект с данными для создания объекта недвижимости.
   * @returns Промис, который разрешается с созданным объектом.
   */
  async createProperty(propertyData: Partial<Property>): Promise<Property> {
    this.logger.info(`Создание объекта недвижимости: ${JSON.stringify(propertyData)}`);
    return this.propertyRepository.save(propertyData);
  }

  /**
   * Находит объект недвижимости по его идентификатору.
   *
   * @param id Идентификатор объекта недвижимости.
   * @returns Промис, который разрешается с найденным объектом или null, если не найден.
   */
  async findPropertyById(id: string): Promise<Property> {
    const property = await this.propertyRepository.findOne({
      where: { id },
      relations: { manager: true },
    });

    if (!property) {
      throw new Error(`Property with id ${id} not found`);
    }

    return property;
  }

  /**
   * Находит объекты недвижимости по Cognito ID менеджера
   * @param cognitoId Идентификатор менеджера в Cognito
   * @returns Промис с массивом объектов недвижимости
   */
  async findPropertiesByCognitoId(cognitoId: string): Promise<Property[]> {
    this.logger.info(`Поиск объектов по Cognito ID менеджера: ${cognitoId}`);
    try {
      return await this.propertyRepository.find({
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
    return this.propertyRepository.find({
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
    const result = await this.propertyRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  /**
   * Обновляет существующий объект недвижимости в базе данных.
   *
   * @param id Идентификатор объекта недвижимости, который нужно обновить.
   * @param propertyData Объект с обновлёнными данными для объекта недвижимости.
   * @returns Промис, который разрешается после обновления.
   */
  async updateProperty(id: string, propertyData: Partial<Property>): Promise<Property> {
    await this.propertyRepository.update(id, propertyData);
    const updatedProperty = await this.propertyRepository.findOne({
      where: { id },
      loadEagerRelations: false,
    });

    if (!updatedProperty) {
      throw new Error(`Property with id ${id} not found after update`);
    }

    return updatedProperty;
  }

  /**
   * Находит объекты недвижимости по заданным фильтрам.
   *
   * @param filters Объект с фильтрами для поиска объектов недвижимости.
   * @returns Промис, который разрешается массивом найденных объектов.
   */
  async findPropertiesByFilters(filters: PropertyFilters): Promise<Property[]> {
    const query = this.propertyRepository
      .createQueryBuilder("property")
      .leftJoinAndSelect("property.manager", "manager");

    // Базовые фильтры
    if (filters.minPrice) query.andWhere("property.pricePerMonth >= :minPrice", { minPrice: filters.minPrice });
    if (filters.maxPrice) query.andWhere("property.pricePerMonth <= :maxPrice", { maxPrice: filters.maxPrice });

    // Геопоиск через координаты (используем Haversine formula)
    if (filters.latitude && filters.longitude && filters.maxDistance) {
      query
        .addSelect(
          `6371 * acos(
          cos(radians(:lat)) * cos(radians(property.latitude)) * 
          cos(radians(property.longitude) - radians(:lng)) + 
          sin(radians(:lat)) * sin(radians(property.latitude))
        )`,
          "distance",
        )
        .setParameters({
          lat: filters.latitude,
          lng: filters.longitude,
          maxDist: filters.maxDistance,
        })
        .having("distance <= :maxDist")
        .orderBy("distance", "ASC");
    } else if (filters.latitude || filters.longitude) {
      this.logger.warn("Incomplete geo parameters provided");
    }

    return query.getMany();
  }

  async findFavoritePropertiesByUserId(userId: string): Promise<Property[]> {
    try {
      return this.propertyRepository
        .createQueryBuilder("property")
        .innerJoin("property.favoritedBy", "favorite")
        .where("favorite.userId = :userId", { userId })
        .getMany();
    } catch (error) {
      this.logger.error(`Ошибка поиска избранного: ${error}`);
      throw new Error("Не удалось получить избранные объекты");
    }
  }

  async addPropertyToFavorites(userId: string, propertyId: string): Promise<void> {
    await this.userFavoritesRepository.save({ userId, propertyId });
  }

  async removePropertyFromFavorites(userId: string, propertyId: string): Promise<void> {
    await this.userFavoritesRepository.delete({ userId, propertyId });
  }

  async findPropertiesByManagerId(managerId: string): Promise<Property[]> {
    return this.propertyRepository.find({
      where: { manager: { cognitoId: managerId } },
      relations: {
        applications: true,
        leases: {
          payments: true, // Добавляем платежи в leases
        },
      },
      order: { postedDate: "DESC" },
      loadEagerRelations: false, // Оптимизация производительности
    });
  }
}
