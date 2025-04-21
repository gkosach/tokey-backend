/**
 * DTO для создания KYC-сессии.
 * Используется в теле запроса на /kyc/init.
 */
export class CreateKycSessionDto {
  /** Cognito ID пользователя */
  userId!: string;

  /** Тип пользователя: "investor" или "manager" */
  userType!: "investor" | "manager";
}
