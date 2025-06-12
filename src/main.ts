import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response, Router } from "express";
import "express-async-errors"; // Добавить в начало
import helmet from "helmet";
import morgan from "morgan";
import { validateEnvConfig } from "./common/config/env.config";
import { handlePrismaError } from "./common/utils/error.handler";
import { APP_ROUTES } from "./index";

/** Определение файла окружения */
const envFile = process.env.NODE_ENV === "production" ? ".env" : ".development.env";

const result = dotenv.config({ path: envFile });

if (result.error) {
  console.error(`❌ Error loading environment file: ${envFile}`);
  process.exit(1);
}

/** Валидируем переменные окружения при старте */
try {
  validateEnvConfig();
  console.log(`✅ Environment validated successfully: ${process.env.NODE_ENV}`);
} catch (error) {
  console.error(`❌ Environment validation failed:`, (error as Error).message);
  process.exit(1);
}

const app = express();

/** Middleware для безопасности */
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

/** Middleware для логирования */
app.use(morgan("dev"));

/** Middleware для парсинга запросов */
app.use(
  express.json({
    verify: (req, _, buf) => {
      (req as any).rawBody = buf;
    },
  }),
);
app.use(express.urlencoded({ extended: true }));

/** CORS конфигурация */
app.use(
  cors({
    origin: ["http://localhost:3000", "https://trytokey.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
    credentials: true,
  }),
);

/** Обработка preflight запросов */
app.options("*", cors());

/** Development логирование */
if (process.env.NODE_ENV === "development") {
  app.use((req: Request, res: Response, next: NextFunction): void => {
    console.log(`${req.method} ${req.path}`);
    console.log("Body:", req.body);
    next();
  });
}

/** Health check endpoint */
app.get("/", (req: Request, res: Response): void => {
  res.json({
    message: "Real Estate Tokenization API",
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

/** Автоматическая регистрация всех модульных маршрутов */
APP_ROUTES.forEach((route: Router, index: number) => {
  const routePath = getRoutePathFromModule(route, index);
  app.use(routePath, route);
  console.log(`📍 Registered route: ${routePath}`);
});

/** Функция для определения пути маршрута */
function getRoutePathFromModule(route: Router, index: number): string {
  const routeMap = ["/api/users", "/api/wallets", "/api/properties", "/api/kyc", "/api/tokens", "/api/files"];
  return routeMap[index] || `/api/module${index}`;
}

/** Обработка несуществующих маршрутов */
app.use("*", (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString(),
  });
});

/** Глобальный обработчик ошибок */
app.use((error: any, req: Request, res: Response, next: NextFunction): void => {
  const errorResponse = handlePrismaError(error);

  console.error("Error occurred:", {
    path: req.path,
    method: req.method,
    error: error.message,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    timestamp: new Date().toISOString(),
  });

  res.status(errorResponse.status).json({
    success: false,
    message: errorResponse.message,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === "development" && {
      details: errorResponse.details || errorResponse.field,
      stack: error.stack,
    }),
  });
});

/** Запуск сервера */
const port = Number(process.env.PORT) || 3002;
app.listen(port, "0.0.0.0", (): void => {
  console.log(`🚀 Server started on port ${port} | Environment: ${process.env.NODE_ENV}`);
  console.log(`📍 Health check: http://localhost:${port}/`);
  console.log(`📦 Loaded ${APP_ROUTES.length} modules`);
});

export default app;
