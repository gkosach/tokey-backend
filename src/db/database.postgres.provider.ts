import { createClassLogger } from "@/src/config/logger";
import { Application, Lease, Payment, Property, User } from "@/src/db/entities";
import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

/**
 * Класс для работы с PostgreSQL базой данных.
 * Предоставляет методы для выполнения запросов и управления транзакциями.
 */
export class DatabasePostgresProvider {
  private static instance: DataSource;
  private static isInitialized = false;
  private readonly logger = createClassLogger(DatabasePostgresProvider.name);

  /**
   * Конструктор для инициализации провайдера базы данных.
   */
  public static getDataSource(): DataSource {
    if (!this.instance) {
      this.instance = new DataSource({
        type: "postgres",
        url: process.env.DATABASE_URL,
        entities: [User, Application, Lease, Payment, Property],
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: false,
        logging: ["query", "error"],
        extra: {
          ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
        },
      });
    }
    return this.instance;
  }

  /**
   * Инициализирует подключение к базе данных.
   * @returns Промис, который разрешается после успешной инициализации.
   */
  public static async initialize(): Promise<void> {
    if (!this.isInitialized) {
      try {
        const instance = this.getDataSource();
        await instance.initialize();

        this.isInitialized = true;
        console.log(
          "Loaded entities:",
          instance.entityMetadatas.map((e) => {
            return e.name;
          }),
        );
      } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
      }
    }
  }

  /**
   * Статический метод для получения репозитория сущности
   * @param entity Класс сущности TypeORM
   * @returns Репозиторий для работы с сущностью
   */
  public static async getRepository<T extends ObjectLiteral>(entity: EntityTarget<T>): Promise<Repository<T>> {
    if (!this.isInitialized) {
      await this.initialize();
    }
    return this.instance.getRepository(entity);
  }
}
