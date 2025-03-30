import { Repository } from "typeorm";
import { Users } from "../entities";
import { DatabasePostgresProvider } from "../database.postgres.provider";
import logger from "@/src/config/logger";

export class UsersRepository {
  private readonly dbProvider: DatabasePostgresProvider;

  constructor(dbProvider: DatabasePostgresProvider) {
    this.dbProvider = dbProvider;
  }

  private usersRepository(): Repository<Users> {
    return this.dbProvider.getRepository(Users);
  }

  /**
   * Находит пользователя по его электронному адресу.
   *
   * @param email Электронный адрес пользователя.
   * @returns Промис, который разрешается с найденным пользователем или null, если не найден.
   */
  async findUserByEmail(email: string): Promise<Users | null> {
    logger.info(`UsersRepository: Finding user by email: ${email}`);
    return await this.usersRepository().findOne({ where: { email } });
  }

  /**
   * Находит пользователя по его идентификатору в Cognito.
   *
   * @param cognitoId Идентификатор пользователя в Cognito.
   * @returns Промис, который разрешается с найденным пользователем или null, если не найден.
   */
  async findUserByCognitoId(cognitoId: string): Promise<Users | null> {
    logger.info(`Finding user by Cognito ID: ${cognitoId}`);
    return await this.usersRepository().findOne({ where: { cognitoId } });
  }

  /**
   * Создаёт нового пользователя в базе данных.
   *
   * @param userData Объект с данными для создания пользователя.
   * @returns Промис, который разрешается с созданным пользователем.
   */
  async createUser(userData: Partial<Users>): Promise<Users> {
    logger.info(`Creating user: ${JSON.stringify(userData)}`);
    return await this.usersRepository().save(userData);
  }

  /**
   * Обновляет существующего пользователя в базе данных.
   *
   * @param id Идентификатор пользователя, которого нужно обновить.
   * @param userData Объект с обновленными данными для пользователя.
   * @returns Промис, который разрешается после обновления.
   */
  async updateUser(id: number, userData: Partial<Users>): Promise<void> {
    logger.info(`Updating user with ID ${id}: ${JSON.stringify(userData)}`);
    await this.usersRepository().update({ id }, userData);
  }

  /**
   * Удаляет пользователя из базы данных.
   *
   * @param id Идентификатор пользователя, которого нужно удалить.
   * @returns Промис, который разрешается после удаления.
   */
  async deleteUser(id: number): Promise<void> {
    logger.info(`Deleting user with ID ${id}`);
    await this.usersRepository().delete({ id });
  }
}
