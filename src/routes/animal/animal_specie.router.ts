import express from "express";
import controller from "../../controllers/animals/species.controller";
import { adminMiddleware, authMiddleware, employeeMiddleware } from "../../middlewares";

const animalSpecieRouter = express.Router();

animalSpecieRouter.get("/:id", authMiddleware, controller.getOneById);
animalSpecieRouter.get("/", authMiddleware, controller.getAll);
animalSpecieRouter.post("/", employeeMiddleware, controller.create);
animalSpecieRouter.put("/:id", employeeMiddleware, controller.updateOne);
animalSpecieRouter.delete("/:id", adminMiddleware, controller.deleteOne);
animalSpecieRouter.get(
  "/:specieId/animals",
  authMiddleware,
  controller.getAllAnimals
);

export { animalSpecieRouter };
