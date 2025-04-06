import winston from "winston";

/**
 * Фабрика для создания логгера с указанием класса.
 * @param className Имя класса, откуда вызывается логгер.
 * @returns Логгер с предустановленным классом.
 */
export function createClassLogger(className: string) {
  return winston.createLogger({
    level: "debug",
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] [${className}] [${level}]: ${message}`;
      }),
    ),
    transports: [new winston.transports.Console()],
  });
}
