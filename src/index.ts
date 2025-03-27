import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
// import { authMiddleware } from "./middleware/authMiddleware";
/* ROUTE IMPORT */
// import investorRoutes from "./routes/investorRoutes";
// import managerRoutes from "./routes/managerRoutes";
// import propertyRoutes from "./routes/propertyRoutes";
// import leaseRoutes from "./routes/leaseRoutes";
// import applicationRoutes from "./routes/applicationRoutes";

/* CONFIGURATIONS */
const envFile = process.env.NODE_ENV === "development" ? "./env/.development.env" : "./env/.production.env";
dotenv.config({ path: envFile });
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.get("/", (req, res) => {
  res.send("This is home route");
});

// app.use("/applications", applicationRoutes);
// app.use("/properties", propertyRoutes);
// app.use("/leases", leaseRoutes);
// app.use("/investors", authMiddleware(["investor"]), investorRoutes);
// app.use("/managers", authMiddleware(["manager"]), managerRoutes);

/* SERVER */
const port = Number(process.env.PORT) || 3002;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
