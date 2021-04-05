import express from "express";
import {PassTypeController} from "../../controllers/pass/pass_type.controller";
import {authMiddleware} from "../../middlewares/auth.middleware";

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


async function getPassTypeController(): Promise<PassTypeController> {
    if (!passTypeController) {
        passTypeController = await PassTypeController.getInstance();
    }
    return passTypeController;
}

export {
    passTypeRouter
}