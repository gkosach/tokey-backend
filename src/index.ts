/**
 * Import libs
 */
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
/**
 * Import Middlewares
 */
import { authMiddleware } from "./middleware/auth.middleware";

/**
 * Import Routes
 */
import investorRoutes from "./investor/investor.routes";
import managerRoutes from "./manager/manager.routes";
import propertyRoutes from "./property/property.routes";

/**
 * Import utils
 */
import { ErrorHandler } from "./common/error/error.handler";

/* Конифгурации */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* Логирование входящих запросов */
// TODO: убрать после дебага
app.use((req, res, next) => {
  console.log("\n=== Incoming Request ===");
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", JSON.stringify(req.body, null, 2));
  console.log("-----------------------");
  next();
});

/* Роуты */
app.get("/", (req, res) => {
  res.send("This is home route");
});
app.use("/properties", propertyRoutes);
app.use("/investors", authMiddleware(["investor"]), investorRoutes);
app.use("/managers", authMiddleware(["manager"]), managerRoutes);

/* Логирование исходящих ответов */
app.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function (body) {
    try {
      // TODO: убрать после дебага
      console.log("\n=== Outgoing Response ===");
      console.log("Status:", res.statusCode);
      try {
        console.log("Body:  ", JSON.stringify(JSON.parse(body), null, 2));
      } catch {
        console.log("Body:  ", body);
      }
      console.log("==========================\n");
    } catch (e) {
      console.log("Failed to log outgoing response:", e);
    }
    return originalSend.call(this, body);
  };
  next();
});

/* Глобальный обработчик ошибок */
app.use(ErrorHandler.handle);

/* Сервер */
const port = Number(process.env.PORT) || 3002;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
