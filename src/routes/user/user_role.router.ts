import express from "express";
import { adminMiddleware, employeeMiddleware } from "../../middlewares";
import controller from "../../controllers/user/userRole.controller";
const userRoleRouter = express.Router();

userRoleRouter.patch(
  "/:id/affect-user/:userId",
  adminMiddleware,
  controller.affectUser
);
userRoleRouter.get("/", employeeMiddleware, controller.getAll);
userRoleRouter.get("/:id", employeeMiddleware, controller.getOne);
userRoleRouter.post("/", adminMiddleware, controller.create);
userRoleRouter.put("/:id", adminMiddleware, controller.update);
userRoleRouter.delete("/:id", adminMiddleware, controller.deleteOne);

export { userRoleRouter };
