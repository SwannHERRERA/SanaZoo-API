import express from "express";
import controller from "../../controllers/animals/animals_heals_book.controller";

const animalHealthBookRouter = express.Router();

animalHealthBookRouter.get("/:id", controller.getOneById);
animalHealthBookRouter.get("/", controller.getAll);
animalHealthBookRouter.post("/", controller.create);
animalHealthBookRouter.put("/:id", controller.updateOne);
animalHealthBookRouter.delete("/:id", controller.deleteOne);

export { animalHealthBookRouter };
