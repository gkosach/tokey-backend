import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { ErrorHandler } from "./common/error/error.handler";
import { authMiddleware } from "./middleware/auth.middleware"; // Новый модуль кошельков
import propertyRoutes from "./property/property.routes";
import userRoutes from "./user/user.routes";
import walletRoutes from "./wallet/wallet.routes";

dotenv.config();

const app = express();

// ========================================
// 1. Middleware Configuration
// ========================================
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev")); // Упрощенный формат логов
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ========================================
// 2. Логирование
// ========================================
if (process.env.NODE_ENV === "development") {
  app.use((req: Request, res: Response, next: NextFunction): void => {
    console.log("\n=== Request ===");
    console.log(`${req.method} ${req.path}`);
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    next();
  });
}

// ========================================
// 3. Роуты
// ========================================
app.get("/", (req: Request, res: Response): void => {
  res.send("Real Estate Tokenization API");
});

// Основные модули
app.use("/properties", propertyRoutes);
app.use("/users", authMiddleware(), userRoutes);
app.use("/wallets", authMiddleware(), walletRoutes);

// ========================================
// 4. Финализаторы
// ========================================
// Глобальный обработчик ошибок
app.use(ErrorHandler.handle);

// Запуск сервера
const port = Number(process.env.PORT) || 3002;
app.listen(port, "0.0.0.0", (): void => {
  console.log(`Server started on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
