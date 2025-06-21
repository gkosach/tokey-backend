/* eslint-disable import/first */
import "./common/config/env.config";
/* eslint-enable import/first */

import cors from "cors";
import express, { NextFunction, Request, Response, Router } from "express";
import "express-async-errors";
import helmet from "helmet";
import morgan from "morgan";
import { handlePrismaError, validateEnvConfig } from "./common";
import { APP_ROUTES } from "./index";

/** Валидация переменных окружения */
try {
  validateEnvConfig();
  console.log(`✅ Environment validated: ${process.env.NODE_ENV}`);
} catch (error) {
  console.warn(`⚠️ Environment validation warning:`, (error as Error).message);
}

const app = express();

/** Middleware */
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
}

app.use(
  express.json({
    verify: (req, _, buf) => {
      (req as any).rawBody = buf.toString("utf8");
    },
  }),
);
app.use(express.urlencoded({ extended: true }));

/** CORS */
app.use(
  cors({
    origin: ["http://localhost:3000", "https://trytokey.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
    credentials: true,
  }),
);

/** Development логирование (оптимизированное) */
if (process.env.NODE_ENV === "development") {
  app.use((req: Request, res: Response, next: NextFunction): void => {
    if (!req.path.includes("/favicon") && !req.path.includes("/assets")) {
      console.log(`${req.method} ${req.path}`);
      if (["POST", "PUT", "PATCH"].includes(req.method) && Object.keys(req.body).length > 0) {
        console.log("Body:", req.body);
      }
    }
    next();
  });
}

/** Health check */
app.get("/", (req: Request, res: Response): void => {
  res.json({
    message: "Real Estate Tokenization API",
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    environment: process.env.NODE_ENV || "unknown",
  });
});

/** Регистрация маршрутов */
const routeMap = [
  "/api/users", // UserModule
  "/api/wallets", // WalletModule
  "/api/properties", // PropertyModule
  "/api/kyc", // KycModule
  "/api/tokens", // TokenModule
  "/api/files", // FileModule
];
APP_ROUTES.forEach((route: Router, index: number) => {
  const routePath = routeMap[index] || `/api/module${index}`;
  app.use(routePath, route);
  if (process.env.NODE_ENV === "development") {
    console.log(`📍 Registered route: ${routePath}`);
  }
});

/** 404 handler */
app.use("*", (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    timestamp: new Date().toISOString(),
  });
});

/** Error handler */
app.use((error: any, req: Request, res: Response): void => {
  if (error.statusCode && error.message) {
    console.error(`❌ ${req.method} ${req.path} - ${error.message}`);
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  const errorResponse = handlePrismaError(error);
  console.error(`❌ ${req.method} ${req.path} - ${error.message}`);

  res.status(errorResponse.status).json({
    success: false,
    message: errorResponse.message,
    timestamp: new Date().toISOString(),
    ...(process.env.NODE_ENV === "development" && {
      details: errorResponse.details || errorResponse.field,
    }),
  });
});

/**
 * Graceful error handling
 */
process.on("unhandledRejection", (reason) => {
  console.error("⚠️ Unhandled Rejection:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("⚠️ Uncaught Exception:", error);
});

/**
 * Запуск сервера
 */
const port = Number(process.env.PORT) || 3002;
app.listen(port, "0.0.0.0", (): void => {
  console.log(`🚀 Server started on port ${port} | Environment: ${process.env.NODE_ENV || "unknown"}`);
  console.log(`📍 Health check: http://localhost:${port}/`);
  console.log(`📦 Loaded ${APP_ROUTES.length} modules`);
});

export default app;
