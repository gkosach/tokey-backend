import { PropertyController } from "@/src/controllers/property.controller";
import { DatabasePostgresProvider } from "@/src/db/database.postgres.provider";
import { PropertyRepository } from "@/src/db/repository";
import { authMiddleware } from "@/src/middleware/authMiddleware";
import { Router } from "express";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();
const dbProvider = new DatabasePostgresProvider();
const propertyRepo = new PropertyRepository(dbProvider);
const propertyController = new PropertyController(propertyRepo);

/** Фильтрация объектов недвижимости по различным параметрам */
router.get("/filter", propertyController.filterProperties.bind(propertyController));

/** Получить объекты недвижимости, связанные с пользователем */
router.get("/user/:cognitoId", propertyController.getProperties.bind(propertyController));

/** Получить детальную информацию об объекте недвижимости по ID */
router.get("/:id", propertyController.getProperty.bind(propertyController));

/** Создать новый объект недвижимости с возможностью загрузки фотографий */
router.post(
  "/",
  authMiddleware(["manager"]),
  upload.array("photos"),
  propertyController.createProperty.bind(propertyController),
);

/** Обновить существующий объект недвижимости */
router.put("/:id", authMiddleware(["manager"]), propertyController.updateProperty.bind(propertyController));

/** Удалить объект недвижимости */
router.delete("/:id", authMiddleware(["manager"]), propertyController.deleteProperty.bind(propertyController));

export default router;
