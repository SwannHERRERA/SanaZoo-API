import express from "express";
import controller from "../../controllers/user/user.controller";
import {
  adminMiddleware,
  authMiddleware,
  employeeMiddleware,
} from "../../middlewares";

const userRouter = express.Router();

userRouter.put(
  "/update-client/:id",
  employeeMiddleware,
  controller.updateClient
);
userRouter.get("/", employeeMiddleware, controller.getAll);
userRouter.post("/", adminMiddleware, controller.create);
userRouter.get("/me", authMiddleware, controller.me);
userRouter.put("/me", authMiddleware, controller.updateMe);
userRouter.post("/register", controller.register);
userRouter.post("/login", controller.login);
userRouter.delete("/logout", authMiddleware, controller.logout);
userRouter.patch("/change-password", authMiddleware, controller.changePassword);
userRouter.patch("/restore/:id", adminMiddleware, controller.restaureOne);
userRouter.delete(
  "/force-delete/:id",
  adminMiddleware,
  controller.forceDeleteOne
);
userRouter.get("/:id", employeeMiddleware, controller.getOne);
userRouter.put("/:id", adminMiddleware, controller.update);
userRouter.delete("/:id", adminMiddleware, controller.deleteOne);

export { userRouter };
