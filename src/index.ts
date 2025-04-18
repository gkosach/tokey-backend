import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { authMiddleware } from "./middleware/auth.middleware";
/* ROUTE IMPORT */
import investorRoutes from "./investor/investor.routes";
import managerRoutes from "./manager/manager.routes";
import propertyRoutes from "./property/property.routes";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use((req, res, next) => {
  console.log("\n=== Incoming Request ===");
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", JSON.stringify(req.body, null, 2));
  console.log("-----------------------");
  /* ROUTES */
  app.get("/", (req, res) => {
    res.send("This is home route");
  });

  app.use("/properties", propertyRoutes);
  app.use("/investors", authMiddleware(["investor"]), investorRoutes);
  app.use("/managers", authMiddleware(["manager"]), managerRoutes);

  const originalSend = res.send;
  res.send = function (body) {
    console.log("\n=== Outgoing Response ===");
    console.log("Status:", res.statusCode);
    console.log("Body:  ", JSON.stringify(JSON.parse(body), null, 2));
    console.log("==========================\n");
    return originalSend.call(this, body);
  };

  next();
});

/* SERVER */
const port = Number(process.env.PORT) || 3002;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
