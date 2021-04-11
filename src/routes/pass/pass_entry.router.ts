import express from "express";
import {EntryController} from "../../controllers/pass/pass_entry.controller";
import {employeeMiddleware} from "../../middlewares/employee.middleware";
import {passRouter} from "./pass.router";

const passControlRouter = express.Router();
let entryController: EntryController;

async function getEntryController(): Promise<EntryController> {
    if (!entryController) {
        entryController = await EntryController.getInstance();
    }
    return entryController;
}

/**
 * Get all entries
 */
passRouter.get('/', employeeMiddleware, async (req, res) => {
    await (await getEntryController()).getAllEntries(req, res);
});

/**
 * Get all entries for user
 */
passRouter.get('/user/:id', employeeMiddleware, async (req, res) => {
    await (await getEntryController()).getEntriesByUserId(req, res);
});

/**
 * Get all entries for pass
 */
passRouter.get('/pass/:id', employeeMiddleware, async (req, res) => {
    await (await getEntryController()).getPassEntries(req, res);
});

/**
 * Get all entries for enclosure
 */
passRouter.get('/enclosure/:id', employeeMiddleware, async (req, res) => {
    await (await getEntryController()).getEnclosureEntries(req, res);
});


export {
    passControlRouter
}