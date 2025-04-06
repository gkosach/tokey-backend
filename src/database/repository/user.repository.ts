import { User } from "@/src/database/entities";
import { BaseRepository } from "@/src/database/repository/base.repository";

/**
 * Репозиторий для работы с пользователями
 */
export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }
}
