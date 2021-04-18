import { NextFunction, Request, Response } from "express";
import { SequelizeManager } from "../utils/db";
import { StatusCode } from "../utils/statusCode";
import { authMiddleware } from "./auth.middleware";

export async function employeeMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  await authMiddleware(req, res, async () => {
    const EMPLOYEE_ROLES = ["ADMIN", "EMPLOYEE", "VETERINARY"];
    const user = res.locals.user;
    const { UserRole } = await SequelizeManager.getInstance();
    const userRole = await UserRole.findByPk(user.userRoleId);
    if (userRole === null) {
      res.status(StatusCode.SERVER_ERROR).end();
      console.error("User Role didn't exist");
      return;
    }
    if (EMPLOYEE_ROLES.includes(userRole.name) === false) {
      res.status(StatusCode.FORBIDDEN).end();
      return;
    }
    console.info(`Employee middleware from : ${req.url}`);
    next();
  });
}
