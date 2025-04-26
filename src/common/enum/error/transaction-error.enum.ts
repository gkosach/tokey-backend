/**
 * Коды и сообщения об ошибках транзакций
 */
export enum TransactionErrorMessages {
  /** Недостаточно средств */
  INSUFFICIENT_FUNDS = "Insufficient funds",

  /** Ошибка подписания транзакции */
  SIGNING_FAILED = "Transaction signing failed",

  /** Ошибка выполнения транзакции */
  EXECUTION_FAILED = "Transaction execution failed",

  /** Повторная транзакция */
  DUPLICATE_TX = "Duplicate transaction detected",
}
