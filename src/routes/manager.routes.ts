import { ManagerController } from "@/src/controllers/manager.controller";
import { DatabasePostgresProvider } from "@/src/db/database.postgres.provider";
import { PropertyRepository, UsersRepository } from "@/src/db/repository";
import { authMiddleware } from "@/src/middleware/authMiddleware";
import { Router } from "express";

const router = Router();
const dbProvider = new DatabasePostgresProvider();
const usersRepository = new UsersRepository(dbProvider);
const propertyRepository = new PropertyRepository(dbProvider);
const managerController = new ManagerController(usersRepository, propertyRepository);

/** Получить данные менеджера по его Cognito ID */
router.get("/:cognitoId", managerController.getManager);

/** Обновить данные менеджера */
router.put("/:cognitoId", managerController.updateManager);

/** Создать нового менеджера */
router.post("/", managerController.createmanager);

/** Получить объекты недвижимости, управляемые текущим менеджером */
router.get("/properties", authMiddleware(["manager"]), managerController.getManagerProperties);

export default router;
