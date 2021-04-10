import express from "express";
import controller from "../../controllers/animals/animals.controller";
import { authMiddleware, employeeMiddleware } from "../../middlewares";
const animalRouter = express.Router();

animalRouter.get("/", authMiddleware, controller.getAll);
animalRouter.post("/", employeeMiddleware, controller.create);
animalRouter.get("/:id", authMiddleware, controller.getOneById);
animalRouter.put("/:id", employeeMiddleware, controller.updateOne);
animalRouter.delete("/:id", employeeMiddleware, controller.deleteOne);

export { animalRouter };
