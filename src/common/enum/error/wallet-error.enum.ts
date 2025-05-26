/**
 * Коды и сообщения об ошибках кошельков
 */
export enum WalletErrorMessages {
  /** Некорректный адрес кошелька */
  INVALID_ADDRESS = "Invalid wallet address",
  ALREADY_EXISTS = "Wallet address already exists",
  DATABASE_ERROR = "Database error",
  /** Подпись не верифицирована */
  SIGNATURE_FAILED = "Wallet signature verification failed",
  /** Кошелек уже привязан */
  ALREADY_LINKED = "Wallet already linked",
  /** Кошелек не найден */
  NOT_FOUND = "Wallet not found",
}
