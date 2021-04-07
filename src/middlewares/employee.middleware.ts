import {NextFunction, Request, Response} from "express";
import {authMiddleware} from "./auth.middleware";

export async function employeeMiddleware(req: Request, res: Response, next: NextFunction) {

    await authMiddleware(req, res, async () => {
        console.info(`Employee middleware from : ${req.originalUrl}`);
        next();
    });
}