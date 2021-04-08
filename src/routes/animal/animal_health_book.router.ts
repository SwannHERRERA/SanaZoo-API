import express from "express";
import controller from "../../controllers/animals/animals_heals_book.controller";
import {
  adminMiddleware,
  authMiddleware,
  veterinaryMiddleware,
} from "../../middlewares";

const animalHealthBookRouter = express.Router();

animalHealthBookRouter.get("/:id", authMiddleware, controller.getOneById);
animalHealthBookRouter.get("/", authMiddleware, controller.getAll);
animalHealthBookRouter.post("/", veterinaryMiddleware, controller.create);
animalHealthBookRouter.put("/:id", veterinaryMiddleware, controller.updateOne);
animalHealthBookRouter.delete("/:id", adminMiddleware, controller.deleteOne);

export { animalHealthBookRouter };
