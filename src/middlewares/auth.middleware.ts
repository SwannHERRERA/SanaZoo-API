import { NextFunction, Request, Response } from "express";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.info(`Auth middleware from : ${req.url}`);
  next();
}
