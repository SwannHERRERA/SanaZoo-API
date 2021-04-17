import express from "express";

const userRouter = express.Router();
import controller from "../../controllers/user/user.controller";
import {
  adminMiddleware,
  authMiddleware,
  employeeMiddleware,
} from "../../middlewares";

/**
 * ICI on a quelque chose de problématique ou un employee peur edité un admin
 * mais il faut faire en sorte que l'employee puisse édité les clients
 */
userRouter.put(
  "/update-client/:id",
  employeeMiddleware,
  controller.updateClient
);
userRouter.get("/", employeeMiddleware, controller.getAll);
userRouter.get("/me", authMiddleware, controller.me);
userRouter.get("/:id", employeeMiddleware, controller.getOne);
userRouter.put("/:id", adminMiddleware, controller.update);
userRouter.delete("/:id", adminMiddleware, controller.deleteOne);
userRouter.post("/", adminMiddleware, controller.create);
userRouter.post("/register", controller.register);

export { userRouter };
