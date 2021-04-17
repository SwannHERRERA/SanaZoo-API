import { NextFunction, Request, Response } from "express";
import { employeeMiddleware } from "./employee.middleware";

export async function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  await employeeMiddleware(req, res, async () => {
    console.info(`Admin middleware from : ${req.originalUrl}`);
    next();
  });
}
