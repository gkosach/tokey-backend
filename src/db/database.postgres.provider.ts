import { DataSource, EntityTarget, QueryRunner, Repository } from "typeorm";
import logger from "@/src/config/logger";

/**
 * Класс для работы с PostgreSQL базой данных.
 * Предоставляет методы для выполнения запросов и управления транзакциями.
 */
export class DatabasePostgresProvider {
  private readonly dataSource: DataSource;

  /**
   * Конструктор для инициализации провайдера базы данных.
   */
  constructor() {
    this.dataSource = new DataSource({
      type: "postgres",
      url: process.env.DATABASE_URL,
      entities: [__dirname + "/entities/*.ts"],
      synchronize: false,
    });
  }

  /**
   * Инициализирует подключение к базе данных.
   * @returns Промис, который разрешается после успешной инициализации.
   */
  async initialize(): Promise<void> {
    try {
      await this.dataSource.initialize();
      logger.info("Database connection established");
    } catch (error) {
      logger.error("Error initializing database connection:", error);
      throw error;
    }
  }

  /**
   * Создаёт транзакцию.
   * @param callback Функция, которая будет вызвана внутри транзакции.
   * @returns Промис, который разрешается с результатом выполнения транзакции.
   */
  async transaction<T>(callback: (queryRunner: QueryRunner) => Promise<T>): Promise<T> {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.startTransaction();
      const result = await callback(queryRunner);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Выполняет произвольный SQL-запрос к базе данных.
   * @param query SQL-запрос с плейсхолдерами.
   * @param params Параметры для плейсхолдеров.
   * @returns Промис, который возвращает результат выполнения запроса.
   */
  async executeQuery<T>(query: string, params?: any[]): Promise<T[]> {
    return await this.dataSource.query(query, params);
  }

  /**
   * Возвращает репозиторий для указанной сущности.
   * @param entityClass Класс сущности.
   * @returns Репозиторий для указанной сущности.
   */
  getRepository(entityClass: EntityTarget<any>): Repository<any> {
    return this.dataSource.getRepository(entityClass);
  }
}
