import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../utils/statusCode";
import { findUserByToken, getToken } from "../utils/tokenHelper";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const user = await findUserByToken(token);
  if (user === null) {
    res.status(StatusCode.UNAUTHORIZED).end();
    return;
  }
  res.locals.user = user;
  next();
}
