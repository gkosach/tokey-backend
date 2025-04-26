/**
 * Коды и сообщения об ошибках стейкинга
 */
export enum StakingErrorMessages {
  /** Нет доступных токенов для клейма */
  NO_REWARDS = "No rewards available to claim",

  /** Период клейма не завершен */
  CLAIM_PERIOD = "Claim period not passed",

  /** Ошибка расчета наград */
  REWARD_CALCULATION = "Reward calculation error",
}
