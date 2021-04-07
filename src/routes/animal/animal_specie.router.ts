import express from "express";
import controller from "../../controllers/species.controller";

const animalSpecieRouter = express.Router();

animalSpecieRouter.get("/:id", controller.getOneById);
animalSpecieRouter.get("/", controller.getAll);
animalSpecieRouter.post("/", controller.create);
animalSpecieRouter.put("/:id", controller.updateOne);
animalSpecieRouter.delete("/:id", controller.deleteOne);

export { animalSpecieRouter };
