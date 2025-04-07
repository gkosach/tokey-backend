import { DatabasePostgresProvider } from "@/src/database/database.postgres.provider";
import { DeepPartial, FindManyOptions, FindOneOptions, ObjectLiteral, Repository } from "typeorm";

/**
 * Базовый репозиторий для работы с сущностями TypeORM.
 * Предоставляет стандартные CRUD-операции.
 * @template T - Тип сущности, должен расширять ObjectLiteral.
 */
export abstract class BaseRepository<T extends ObjectLiteral> {
  protected readonly repository: Repository<T>;

  constructor(entity: new () => T) {
    this.repository = DatabasePostgresProvider.getRepositorySync(entity);
  }

  async find(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(options);
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return this.repository.findOne(options);
  }
  /**
   * Сохраняет сущность в базе данных.
   * Если сущность уже существует (по ID), она будет обновлена.
   * @param data - Данные для создания или обновления сущности.
   */
  async save(data: DeepPartial<T>): Promise<T> {
    return this.repository.save(data);
  }

  create(data: DeepPartial<T>): T {
    return this.repository.create(data);
  }


  /**
   * Обновляет сущность по ID.
   * @param id - Идентификатор сущности.
   * @param data - Данные для обновления. Поддерживает тип Partial.
   */
  async update(id: string, data: Partial<T>): Promise<void> {
    await this.repository.update(id, data);
  }

  /**
   * Удаляет сущность по ID.
   * @param id - Идентификатор сущности.
   */
  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
