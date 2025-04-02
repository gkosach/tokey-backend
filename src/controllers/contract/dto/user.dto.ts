import { User } from "@/src/db/entities";

export class UserDTO {
  id: string; // Cognito ID пользователя
  name: string;
  email: string;
  phoneNumber: string;
  role: string;

  /**
   * Преобразует сущность User в объект DTO
   * @param user Сущность пользователя из базы данных
   * @returns Объект DTO для передачи на фронтенд
   */
  static fromEntity(user: User): UserDTO {
    return {
      id: user.cognitoId, // Используем cognitoId как уникальный идентификатор
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    };
  }
}
