import { authMiddleware } from "@/src/common/middleware/authMiddleware";
import { PropertyRepository } from "@/src/database/repository";
import { PropertyController } from "@/src/property/property.controller";
import { Router } from "express";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const createPropertyRoutes = (): Router => {
  const propertyRepo = new PropertyRepository();
  const propertyController = new PropertyController(propertyRepo);
  const router = Router();
  router.get("/", propertyController.getAllProperties.bind(propertyController));

  router.get("/filter", propertyController.filterProperties.bind(propertyController));
  router.get("/managed", authMiddleware(["manager"]), propertyController.getManagedProperties.bind(propertyController));
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
