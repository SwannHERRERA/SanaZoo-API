import express from "express";
import { EntryController } from "../../controllers/pass/pass_entry.controller";
import { employeeMiddleware } from "../../middlewares/employee.middleware";

const passEntryRouter = express.Router();
let entryController: EntryController;

async function getEntryController(): Promise<EntryController> {
  if (!entryController) {
    entryController = await EntryController.getInstance();
  }
  return entryController;
}

/**
 * Get all entries for user
 */
passEntryRouter.get("/user/:id", employeeMiddleware, async (req, res) => {
  await (await getEntryController()).getEntriesByUserId(req, res);
});

/**
 * Get all entries for pass
 */
passEntryRouter.get("/pass/:id", employeeMiddleware, async (req, res) => {
  await (await getEntryController()).getPassEntries(req, res);
});

/**
 * Get all entries for enclosure
 */
passEntryRouter.get("/enclosure/:id", employeeMiddleware, async (req, res) => {
  await (await getEntryController()).getEnclosureEntries(req, res);
});

/**
 * Get all entries
 */
passEntryRouter.get("/", employeeMiddleware, async (req, res) => {
  await (await getEntryController()).getAllEntries(req, res);
});

/**
 * Add entry
 */
passEntryRouter.post("/", employeeMiddleware, async (req, res) => {
  await (await getEntryController()).addEntry(req, res);
});

/**
 * Delete entry
 */
passEntryRouter.post("/", employeeMiddleware, async (req, res) => {
  await (await getEntryController()).deleteEntry(req, res);
});

export { passEntryRouter };
