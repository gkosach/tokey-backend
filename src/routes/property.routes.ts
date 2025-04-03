import { PropertyController } from "@/src/controllers/property.controller";
import { PropertyRepository } from "@/src/db/repository";
import { authMiddleware } from "@/src/middleware/authMiddleware";
import { Router } from "express";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const createPropertyRoutes = async () => {
  const propertyRepo = new PropertyRepository();
  await propertyRepo.initRepositories();

  const propertyController = new PropertyController(propertyRepo);
  const router = Router();

  router.get("/filter", propertyController.filterProperties.bind(propertyController));
  router.get("/user/:cognitoId", propertyController.getProperties.bind(propertyController));
  router.get("/:id", propertyController.getProperty.bind(propertyController));
  router.post(
    "/",
    authMiddleware(["manager"]),
    upload.array("photos"),
    propertyController.createProperty.bind(propertyController),
  );
  router.put("/:id", authMiddleware(["manager"]), propertyController.updateProperty.bind(propertyController));
  router.delete("/:id", authMiddleware(["manager"]), propertyController.deleteProperty.bind(propertyController));

  return router;
};

export default createPropertyRoutes;
