import express from "express";
import { adminMiddleware, employeeMiddleware } from "../../middlewares";
import controller from "../../controllers/user/userRole.controller";
const userRoleRouter = express.Router();

userRoleRouter.get("/", employeeMiddleware, controller.getAll);
userRoleRouter.get("/:id", employeeMiddleware, controller.getOne);
userRoleRouter.post("/", employeeMiddleware, controller.create);
userRoleRouter.put("/:id", employeeMiddleware, controller.update);
userRoleRouter.delete("/:id", employeeMiddleware, controller.deleteOne);
userRoleRouter.patch("/:id/affect", adminMiddleware, controller.affectUser);

export { userRoleRouter };
