import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { ErrorHandler } from "./common/error/error.handler";
import kycRoutes from "./kyc/kyc.routes";
import { authMiddleware } from "./middleware/auth.middleware";
import propertyRoutes from "./property/property.routes";
import userRoutes from "./user/user.routes";
import walletRoutes from "./wallet/wallet.routes";

const envFile = process.env.NODE_ENV === "development" ? ".development.env" : ".env";

dotenv.config({ path: envFile });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(
  bodyParser.json({
    verify: (req, _, buf) => {
      (req as any).rawBody = buf;
    },
  }),
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://trytokey.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
    credentials: true,
  }),
);
app.options("*", cors());

if (process.env.NODE_ENV === "development") {
  app.use((req: Request, res: Response, next: NextFunction): void => {
    console.log(`${req.method} ${req.path}`);
    console.log("Body:", req.body);
    next();
  });
}

app.get("/", (req: Request, res: Response): void => {
  res.send("Real Estate Tokenization API");
});

/**
 * Основные модули
 */
app.use("/properties", propertyRoutes);
app.use("/users", userRoutes);
app.use("/wallets", authMiddleware(), walletRoutes);
app.use("/kyc", kycRoutes);

app.use(ErrorHandler.handle);

/**
 * Запуск сервера
 */
const port = Number(process.env.PORT) || 3002;
app.listen(port, "0.0.0.0", (): void => {
  console.log(`Server started on port ${port} | ${process.env.NODE_ENV}`);
});

export default app;
