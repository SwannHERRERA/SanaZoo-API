import express from "express";
import * as yup from "yup";

import {PassController} from "../../controllers/pass/pass.controller";
import {authMiddleware} from "../../middlewares/auth.middleware";
import {employeeMiddleware} from "../../middlewares/employee.middleware";
import DateTimeFormat = Intl.DateTimeFormat;

const passRouter = express.Router();
let passController: PassController;


async function getPassController(): Promise<PassController> {
    if (!passController) {
        passController = await PassController.getInstance();
    }
    return passController;
}

/**
 * Get all pass
 */

passRouter.get('/', employeeMiddleware, async(req,res)=> {
    (await getPassController()).getAllPass(req, res);
});

/**
 * Add pass
 */
passRouter.post('/', authMiddleware, async function (req, res, next) {
    (await getPassController()).createPass(req, res);
});

export {
    passRouter
}