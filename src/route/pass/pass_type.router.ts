import express from "express";
import {PassTypeController} from "../../controllers/pass/pass_type.controller";
import {authMiddleware} from "../../middlewares/auth.middleware";
import * as yup from "yup";
import {adminMiddleware} from "../../middlewares/admin.middleware";
import {employeePlanningRouter} from "../planning/employee_planning.router";

const passTypeRouter = express.Router();

let passTypeController: PassTypeController;

/**
 * Find all pass type
 */
passTypeRouter.get('/', authMiddleware, async function (req, res, next) {
    const result = await (await getPassTypeController()).getAllPassTypes();
    res.json(result);
});

/**
 * Get pass type by id
 */
passTypeRouter.get('/:id', authMiddleware, async function (req, res, next) {
    const result = await (await getPassTypeController()).getPassTypes(req.params.id);
    if (!result) {
        res.status(404).end();
        return;
    }
    res.json(result);
});


/**
 * Add pass type
 */
passTypeRouter.post('/', adminMiddleware, async function (req, res, next) {
    const name = req.body.name;
    const price = req.body.price;

    await passTypeSchema.validate({
        name,
        price
    }).then(async function () {
        const result = await (await getPassTypeController()).addPassType({name, price});
        if (!result) {
            res.status(500).end();
            return;
        }
        res.status(200).json(result).end();
    }).catch((err) => {
        res.status(400).json(err.errors).end();
    });
});

/**
 * Update pass type
 */
passTypeRouter.put('/', adminMiddleware, async function (req, res, next) {
    const name = req.body.name;
    const price = req.body.price;
    const id = req.body.id;

    await passTypeSchema.validate({
        name,
        price
    }).then(async function () {
        const result = await (await getPassTypeController()).updatePassType({id, name, price});
        if (!result) {
            res.status(500).end();
            return;
        }
        res.status(200).json(result).end();
    }).catch((err) => {
        res.status(400).json(err.errors).end();
    });
});

/**
 * Remove pass type
 */
passTypeRouter.delete('/:id', adminMiddleware, async function (req, res, next) {
    const success = await (await getPassTypeController()).deletePassType(req.params.id);
    if (success) {
        res.status(204).end();
    } else {
        res.status(404).end();
    }
});


/**
 * Add pass type to pass
 */
passTypeRouter.post('/add-pass', employeePlanningRouter, async function (req, res, next) {
    const passId = req.body.passId;
    const passTypeId = req.body.passTypeId;

    if (!passId || !passTypeId) {
        res.status(404).json('You must provide passId and passTypeId in body').end();
        return;
    }

    const pass = await (await getPassTypeController()).setPassType(passId, passTypeId);
    if (!pass) {
        res.status(500).end();
        return;
    }
    res.status(200).json(pass).end();
});


async function getPassTypeController(): Promise<PassTypeController> {
    if (!passTypeController) {
        passTypeController = await PassTypeController.getInstance();
    }
    return passTypeController;
}

const passTypeSchema = yup.object().shape({
    id: yup.number().min(0).optional(),
    name: yup.string().min(4).required(),
    price: yup.number().min(0).required()
})


export {
    passTypeRouter
}
