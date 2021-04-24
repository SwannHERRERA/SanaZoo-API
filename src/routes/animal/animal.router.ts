import express from "express";
import controller from "../../controllers/animals/animals.controller";
import { authMiddleware, employeeMiddleware } from "../../middlewares";
const animalRouter = express.Router();

animalRouter.get("/", authMiddleware, controller.getAll);
animalRouter.post("/", employeeMiddleware, controller.create);
animalRouter.get("/:id", authMiddleware, controller.getOneById);
animalRouter.put("/:id", employeeMiddleware, controller.updateOne);
animalRouter.delete("/:id", employeeMiddleware, controller.deleteOne);

/**
 * Move an animal into another enclosure.
 * should have animalId and enclosureId in BODY
 * @param animalId
 * @param enclosureId
 */
animalRouter.patch(
  "/move-enclosure",
  employeeMiddleware,
  controller.moveEnclosure
);

export { animalRouter };
