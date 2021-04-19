import { NextFunction, Request, Response } from "express";
import { employeeMiddleware } from "./employee.middleware";

export async function veterinaryMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  await employeeMiddleware(req, res, async () => {
    console.info(`Veterinary middleware from : ${req.url}`);
    next();
  });
}
