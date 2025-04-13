import { createLogger, format, transports } from "winston";

/**
 * Создает логгер с заданной конфигурацией, который выводит логи только в консоль.
 * @param level - Уровень логирования. Например: "debug", "info", "warn", "error".
 * @param format - Форматирование логов. Определяет, как будут выглядеть сообщения.
 * @returns Логгер для записи сообщений.
 */
const logger = createLogger({
  level: "debug",

  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`),
  ),
  transports: [new transports.Console()],
});

export default logger;
