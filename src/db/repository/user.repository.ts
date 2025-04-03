import { createClassLogger } from "@/src/config/logger";
import { Equal, Repository } from "typeorm";
import { DatabasePostgresProvider } from "../database.postgres.provider";
import { User } from "../entities";

/**
 * Репозиторий для работы с сущностью пользователя
 */
export class UserRepository {
  private readonly logger = createClassLogger(UserRepository.name);
  private repository: Repository<User>;

  constructor() {
    this.initializeRepository();
  }

  async initializeRepository() {
    this.repository = await DatabasePostgresProvider.getRepository(User);
  }

  /**
   * Поиск пользователя по Cognito ID
   * @param cognitoId Идентификатор в Cognito
   * @returns Объект пользователя или null
   */
  async findUserByCognitoId(cognitoId: string): Promise<User | null> {
    try {
      this.logger.info(
        `[INPUT] Поиск пользователя. CognitoID: ${JSON.stringify(
          {
            cognitoId,
            timestamp: new Date().toISOString(),
          },
          null,
          2,
        )}`,
      );

      const result = await this.repository.findOne({
        where: { cognitoId: Equal(cognitoId) },
        relations: {
          managedProperties: true,
          leases: true,
          managedLeases: true,
        },
      });

      this.logger.info(
        `[OUTPUT] Результат поиска: ${JSON.stringify(
          {
            found: !!result,
            userId: result?.cognitoId,
            email: result?.email,
            relationsCount: {
              properties: result?.managedProperties?.length || 0,
              leases: result?.leases?.length || 0,
            },
          },
          null,
          2,
        )}`,
      );

      return result;
    } catch (error) {
      this.logger.error(
        `[ERROR] Детали ошибки: ${JSON.stringify(
          {
            error: error instanceof Error ? error.message : "Неизвестная ошибка",
            stack: error instanceof Error ? error.stack : null,
            queryParams: { cognitoId },
            timestamp: new Date().toISOString(),
          },
          null,
          2,
        )}`,
      );

      throw new Error("Ошибка при выполнении запроса");
    }
  }

  /**
   * Создание нового пользователя
   * @param userData Данные пользователя
   * @returns Созданный пользователь
   */
  async createUser(userData: Partial<User>): Promise<User> {
    try {
      this.logger.info(`Создание пользователя: ${JSON.stringify(userData)}`);
      const newUser = this.repository.create(userData);
      return await this.repository.save(newUser);
    } catch (error) {
      this.logger.error(`Ошибка создания: ${error}`);
      throw new Error("Ошибка создания пользователя");
    }
  }

  /**
   * Обновление данных пользователя
   * @param cognitoId
   * @param userData Новые данные
   * @returns Обновленный пользователь
   */
  async updateUser(cognitoId: string, userData: Partial<User>): Promise<User> {
    try {
      this.logger.info(`Обновление пользователя ${cognitoId}`);

      // Выполняем обновление
      await this.repository
        .createQueryBuilder()
        .update(User)
        .set(userData)
        .where("cognito_id = :cognitoId", { cognitoId })
        .execute();

      // Получаем обновленного пользователя с проверкой на null
      const updatedUser = await this.findUserByCognitoId(cognitoId);
      if (!updatedUser) {
        throw new Error("Пользователь не найден после обновления");
      }

      return updatedUser;
    } catch (error) {
      this.logger.error(`Ошибка обновления: ${error}`);
      throw new Error("Ошибка обновления пользователя");
    }
  }
}
