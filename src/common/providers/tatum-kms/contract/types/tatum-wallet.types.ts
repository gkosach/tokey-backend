/** Кошелек Tatum - единый интерфейс для всех операций */
export interface TatumWallet {
  /** Идентификатор подписи в Tatum */
  signatureId: string;
  /** Адрес кошелька */
  address: string;
  /** Статус кошелька (опционально для создания) */
  status?: string;
  /** Дата создания (опционально для создания) */
  createdAt?: Date;
}
