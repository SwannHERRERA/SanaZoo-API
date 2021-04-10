import express from "express";

import {PassController} from "../../controllers/pass/pass.controller";
import {authMiddleware} from "../../middlewares/auth.middleware";
import {employeeMiddleware} from "../../middlewares/employee.middleware";

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

passRouter.get('/', employeeMiddleware, async (req, res) => {
    await (await getPassController()).getAllPass(req, res);
});

/**
 * Add pass
 */
passRouter.post('/', authMiddleware, async function (req, res) {
    await (await getPassController()).createPass(req, res);
});

/**
 * Update pass
 */
passRouter.put('/', employeeMiddleware, async function (req, res) {
    await (await getPassController()).updatePass(req, res);
});

/**
 * Delete pass
 */
passRouter.delete('/', employeeMiddleware, async function (req, res) {
    await (await getPassController()).deletePass(req, res);
});

/**
 * Get pass
 */
passRouter.get('/:id', authMiddleware, async function (req, res) {
    await (await getPassController()).getPassById(req, res);
});

/**
 * Get pass by userId
 */
passRouter.get('/user/:id', authMiddleware, async function (req, res) {
    await (await getPassController()).getPassByUserId(req, res);
});

/**
 * Add pass enclosure access
 */
passRouter.post('/enclosure-access', employeeMiddleware, async function (req, res) {
    await (await getPassController()).addPassEnclosureAccess(req, res);
});

/**
 * Delete pass enclosure access
 */
passRouter.delete('/enclosure-access', employeeMiddleware, async function (req, res) {
    await (await getPassController()).removePassEnclosureAccess(req, res);
});

export {
    passRouter
}