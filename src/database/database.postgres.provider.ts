import { createClassLogger } from "@/src/common/config/logger.config";
import { AppDataSource } from "@/src/common/config/typeorm.config";
import { EntityTarget, ObjectLiteral, Repository } from "typeorm";

/**
 * Провайдер для работы с PostgreSQL базой данных.
 * Управляет подключением и предоставляет доступ к репозиториям.
 */
export class DatabasePostgresProvider {
  private static isInitialized = false;
  private static readonly logger = createClassLogger(DatabasePostgresProvider.name);

  /**
   * Инициализирует подключение к базе данных.
   * @returns Промис, который разрешается после успешной инициализации.
   */
  public static async initialize(): Promise<void> {
    if (!this.isInitialized && !AppDataSource.isInitialized) {
      try {
        await AppDataSource.initialize();
        this.isInitialized = true;

        this.logger.info(
          `Database initialized. Loaded entities: ${AppDataSource.entityMetadatas
            .map((e) => {
              return e.name;
            })
            .join(", ")}`,
        );
      } catch (error) {
        this.logger.error("Database connection error:", error);
        process.exit(1);
      }
    }
  }

  /**
   * Синхронный метод получения репозитория (для использования в конструкторах).
   * @param entity Класс сущности TypeORM
   * @returns Репозиторий для работы с сущностью
   */
  public static getRepositorySync<T extends ObjectLiteral>(entity: EntityTarget<T>): Repository<T> {
    if (!AppDataSource.isInitialized) {
      throw new Error("Database is not initialized. Call DatabasePostgresProvider.initialize() first.");
    }
    return AppDataSource.getRepository(entity);
  }
}
