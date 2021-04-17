import express from "express";
import controller from "../../controllers/animals/species.controller";
import { authMiddleware, employeeMiddleware } from "../../middlewares";

const animalSpecieRouter = express.Router();

animalSpecieRouter.get("/:id", controller.getOneById);
animalSpecieRouter.get("/", controller.getAll);
animalSpecieRouter.post("/", employeeMiddleware, controller.create);
animalSpecieRouter.put("/:id", employeeMiddleware, controller.updateOne);
animalSpecieRouter.delete("/:id", employeeMiddleware, controller.deleteOne);
animalSpecieRouter.get(
  "/:specieId/animals",
  authMiddleware,
  controller.getAllAnimals
);

export { animalSpecieRouter };
