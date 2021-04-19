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
userRouter.post("/", adminMiddleware, controller.create);
userRouter.get("/me", authMiddleware, controller.me);
userRouter.post("/register", controller.register);
userRouter.post("/login", controller.login);
userRouter.delete("/logout", controller.logout);
userRouter.patch("/change-password", controller.changePassword);
userRouter.patch("/restaure/:id", adminMiddleware, controller.restaureOne);
userRouter.delete(
  "/force-delete/:id",
  adminMiddleware,
  controller.forceDeleteOne
);
userRouter.get("/:id", employeeMiddleware, controller.getOne);
userRouter.put("/:id", adminMiddleware, controller.update);
userRouter.delete("/:id", adminMiddleware, controller.deleteOne);

export { userRouter };
