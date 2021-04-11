import express from "express";

const userRouter = express.Router();
import controller from "../../controllers/user/user.controller";
import {
  adminMiddleware,
  authMiddleware,
  employeeMiddleware,
} from "../../middlewares";

userRouter.get("/", employeeMiddleware, controller.getAll);
userRouter.get("/me", authMiddleware, controller.me);
userRouter.get("/:id", employeeMiddleware, controller.getOne);
userRouter.put("/:id", employeeMiddleware, controller.update);
userRouter.delete("/:id", adminMiddleware, controller.deleteOne);
userRouter.post("/", adminMiddleware, controller.create);
userRouter.post("/register", authMiddleware, controller.register);

export { userRouter };
