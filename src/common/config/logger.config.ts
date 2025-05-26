import { createLogger, format, Logger, transports } from "winston";

const { combine, timestamp, printf, colorize } = format;
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});
const loggerConfig: Logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: combine(colorize(), timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  transports: [
    new transports.Console({
      handleExceptions: true,
      handleRejections: true,
    }),
  ],
});

if (process.env.NODE_ENV === "production") {
  loggerConfig.add(
    new transports.File({
      filename: "logs/app.log",
      format: format.combine(format.uncolorize(), format.json()),
    }),
  );
}

export default loggerConfig;
