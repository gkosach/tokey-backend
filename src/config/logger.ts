import { createLogger, format, transports } from "winston";

/**
 * Фабрика для создания логгера с указанием класса.
 * @param className Имя класса, откуда вызывается логгер.
 * @returns Логгер с предустановленным классом.
 */
export const createClassLogger = (className: string) => {
  return createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: format.combine(
      format.timestamp(),
      format.label({ label: className }),
      format.printf(({ timestamp, level, message, label }) => {
        return `${timestamp} [${label}] ${level}: ${message}`;
      }),
    ),
    transports: [new transports.Console()],
  });
};
