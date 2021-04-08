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

passRouter.get('/', employeeMiddleware, async function (req, res) {
    const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : undefined;
    const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : undefined;

    const result = await (await getPassController()).getAllPass({limit, offset});
    if (!result) {
        res.status(404).end();
        return;
    }
    res.json(result);

});

/**
 * Add pass
 */
passRouter.post('/', authMiddleware, async function (req, res, next) {
    const validDate = req.body.validDate
    const passTypeId = req.body.passTypeId
    const userId = req.body.userId
    const entries = req.body.entries
    passSchema.validate({
        validDate,
        passTypeId,
        userId,
        entries
    }).then(async function () {
        const result = await (await getPassController()).createPass({passTypeId, userId, validDate}, entries);
        if (!result) {
            res.status(500).end();
            return;
        }
        res.status(200).json(result).end();
    }).catch((err) => {
        res.status(400).json(err.message).end();
    });
});

const passSchema = yup.object().shape({
    validDate: yup.date().required(),
    passTypeId: yup.number().required().min(1),
    userId: yup.number().required().min(1),
    entries: yup.array().of(yup.number().required()).min(1).required()
})

export {
    passRouter
}