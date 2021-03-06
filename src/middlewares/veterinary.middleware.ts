import { NextFunction, Request, Response } from "express";
import { SequelizeManager } from "../utils/db";
import { StatusCode } from "../utils/statusCode";
import { employeeMiddleware } from "./employee.middleware";

export async function veterinaryMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  await employeeMiddleware(req, res, async () => {
    const user = res.locals.user;
    const { UserRole } = await SequelizeManager.getInstance();
    const userRole = await UserRole.findByPk(user.userRoleId);
    if (userRole === null) {
      res.status(StatusCode.SERVER_ERROR).end();
      console.error("User Role didn't exist");
      return;
    }
    if (userRole.name !== "VETERINAIRE") {
      res.status(StatusCode.FORBIDDEN).end();
      return;
    }
    console.info(`Veterinary middleware from : ${req.url}`);
    next();
  });
}
