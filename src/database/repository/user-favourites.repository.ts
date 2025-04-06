import { UserFavorites } from "@/src/database/entities";
import { BaseRepository } from "@/src/database/repository/base.repository";

/**
 * Репозиторий для работы с избранными объектами пользователей
 */
export class UserFavoritesRepository extends BaseRepository<UserFavorites> {
  constructor() {
    super(UserFavorites);
  }
  /**
   * Добавляет объект в избранное пользователя
   * @param userId - ID пользователя
   * @param propertyId - ID объекта недвижимости
   */
  async addFavorite(userId: string, propertyId: string): Promise<UserFavorites> {
    const favorite = this.repository.create({ userId, propertyId });
    return this.repository.save(favorite);
  }

  /**
   * Удаляет объект из избранного пользователя
   * @param userId - ID пользователя
   * @param propertyId - ID объекта недвижимости
   */
  async removeFavorite(userId: string, propertyId: string): Promise<void> {
    await this.repository.delete({ userId, propertyId });
  }

  /**
   * Проверяет, есть ли объект в избранном у пользователя
   * @param userId - ID пользователя
   * @param propertyId - ID объекта недвижимости
   */
  async isFavorite(userId: string, propertyId: string): Promise<boolean> {
    return this.repository.exist({ where: { userId, propertyId } });
  }
}
