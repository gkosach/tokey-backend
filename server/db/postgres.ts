import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [__dirname + "/entities/*.ts"],
  synchronize: true,
});

// TODO: remove
// Чтобы инициализировать соединение
AppDataSource.initialize()
  .then(() => {
    console.log("Database connection established");
  })
  .catch((error) => {
    console.error("Error initializing database connection:", error);
  });
