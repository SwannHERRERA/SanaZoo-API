import {NextFunction, Request, Response} from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    console.info(`Auth middleware from : ${req.originalUrl}`);
    next();
}