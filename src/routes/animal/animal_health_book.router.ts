import express from "express";
import controller from "../../controllers/animals/animals_heals_book.controller";
import {
  adminMiddleware,
  authMiddleware,
  employeeMiddleware,
  veterinaryMiddleware,
} from "../../middlewares";

const animalHealthBookRouter = express.Router();

animalHealthBookRouter.get("/:id", employeeMiddleware, controller.getOneById);
animalHealthBookRouter.get("/", employeeMiddleware, controller.getAll);
animalHealthBookRouter.post("/", veterinaryMiddleware, controller.create);
animalHealthBookRouter.put("/:id", veterinaryMiddleware, controller.updateOne);
animalHealthBookRouter.delete("/:id", adminMiddleware, controller.deleteOne);
animalHealthBookRouter.get(
  "/animal/:animalId",
  employeeMiddleware,
  controller.getAllByAnimal
);

export { animalHealthBookRouter };
