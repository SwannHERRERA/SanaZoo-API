import express from "express";
import controller from "../../controllers/animals/animals.controller";
const animalRouter = express.Router();

animalRouter.get("/", controller.getAll);
animalRouter.post("/", controller.create);
animalRouter.get("/:id", controller.getOneById);
animalRouter.put("/:id", controller.updateOne);
animalRouter.delete("/:id", controller.deleteOne);

export { animalRouter };
