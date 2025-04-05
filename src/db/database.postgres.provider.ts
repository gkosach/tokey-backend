import { createClassLogger } from "@/src/config/logger";
import { AppDataSource } from "@/src/db/contract/config/typeorm.config";
import { EntityTarget, ObjectLiteral, Repository } from "typeorm";

/**
 * Класс для работы с PostgreSQL базой данных.
 * Предоставляет методы для выполнения запросов и управления транзакциями.
 */
export class DatabasePostgresProvider {
  private static isInitialized = false;
  private readonly logger = createClassLogger(DatabasePostgresProvider.name);

  /**
   * Инициализирует подключение к базе данных.
   * @returns Промис, который разрешается после успешной инициализации.
   */
  public static async initialize(options = { inspectStructure: false }): Promise<void> {
    if (!this.isInitialized && !AppDataSource.isInitialized) {
      try {
        await AppDataSource.initialize();

        if (options.inspectStructure) {
          await this.inspectDatabaseStructure();
        }

        this.isInitialized = true;
        console.log(
          "Loaded entities:",
          AppDataSource.entityMetadatas.map((e) => {
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
   * Анализирует и выводит структуру базы данных
   */
  public static async inspectDatabaseStructure(): Promise<void> {
    try {
      const queryRunner = AppDataSource.createQueryRunner();

      const tables = await queryRunner.query(`
        SELECT table_name, column_name, data_type 
        FROM information_schema.columns 
        WHERE table_schema = 'public'
      `);

      console.log("\n=== Database Structure Report ===");
      console.table(
        tables.map((t) => {
          return {
            Table: t.table_name,
            Column: t.column_name,
            Type: t.data_type,
          };
        }),
      );

      await queryRunner.release();
    } catch (error) {
      console.error("Structure inspection failed:", error);
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
    return AppDataSource.getRepository(entity);
  }
}
