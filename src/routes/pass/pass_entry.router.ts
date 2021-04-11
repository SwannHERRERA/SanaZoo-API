import express from "express";
import {PassController} from "../../controllers/pass/pass.controller";
import {EntryController} from "../../controllers/pass/pass_entry.controller";

const passControlRouter = express.Router();
let entryController: EntryController;

async function getPassController(): Promise<EntryController> {
    if (!entryController) {
        entryController = await EntryController.getInstance();
    }
    return entryController;
}


export {
    passControlRouter
}