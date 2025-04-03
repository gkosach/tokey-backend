import { ManagerController } from "@/src/controllers/manager.controller";
import { DatabasePostgresProvider } from "@/src/db/database.postgres.provider";
import { PropertyRepository, UserRepository } from "@/src/db/repository";
import { authMiddleware } from "@/src/middleware/authMiddleware";
import { Router } from "express";

const createManagerRoutes = async () => {
  const usersRepository = new UserRepository();
  const propertyRepository = new PropertyRepository();

  await Promise.all([usersRepository.initializeRepository(), propertyRepository.initRepositories()]);

  const managerController = new ManagerController(usersRepository, propertyRepository);
  const router = Router();

  router.get("/:cognitoId", managerController.getManager.bind(managerController));
  router.put("/:cognitoId", managerController.updateManager.bind(managerController));
  router.post("/", managerController.createmanager.bind(managerController));
  router.get(
    "/properties",
    authMiddleware(["manager"]),
    managerController.getManagerProperties.bind(managerController),
  );

  return router;
};

export default createManagerRoutes;
