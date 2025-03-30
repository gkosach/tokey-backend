import { InvestorController } from "@/src/controllers/investor.controller";
import { DatabasePostgresProvider } from "@/src/db/database.postgres.provider";
import { LeaseRepository, PropertyRepository, UsersRepository } from "@/src/db/repository";
import { authMiddleware } from "@/src/middleware/authMiddleware";
import { Router } from "express";

const router = Router();
const dbProvider = new DatabasePostgresProvider();
const usersRepository = new UsersRepository(dbProvider);
const propertyRepository = new PropertyRepository(dbProvider);
const leaseRepository = new LeaseRepository(dbProvider);
const investorController = new InvestorController(usersRepository, propertyRepository, leaseRepository);

/** Получить данные инвестора по его Cognito ID */
router.get("/:cognitoId", investorController.getInvestor);

/** Обновить данные инвестора */
router.put("/:cognitoId", investorController.updateInvestor);

/** Создать нового инвестора */
router.post("/", investorController.createInvestor);

/** Получить объекты недвижимости, связанные с текущим инвестором */
router.get("/properties", authMiddleware(["investor"]), investorController.getInvestorProperties);

/** Добавить объект недвижимости в избранное инвестора */
router.post("/:cognitoId/favourites/:propertyId", investorController.addPropertyToFavorites);

/** Удалить объект недвижимости из избранного инвестора */
router.delete("/:cognitoId/favourites/:propertyId", investorController.removePropertyFromFavorites);

export default router;
