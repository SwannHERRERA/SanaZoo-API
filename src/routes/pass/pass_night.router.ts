import express from "express";
import { PassNightController } from "../../controllers/pass/pass_night.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { adminMiddleware } from "../../middlewares/admin.middleware";

const passNightRouter = express.Router();
let passNightController: PassNightController;

async function getPassNightController(): Promise<PassNightController> {
  if (!passNightController) {
    passNightController = await PassNightController.getInstance();
  }
  return passNightController;
}

/**
 * Add pass night availability
 */
passNightRouter.post("/", adminMiddleware, async function (req, res) {
  await (await getPassNightController()).createPassNightAvailability(req, res);
});

/**
 * Get all pass night availability
 */
passNightRouter.get("/", authMiddleware, async function (req, res) {
  await (await getPassNightController()).getAllPassNightsAvailabilities(
    req,
    res
  );
});

/**
 * Get available pass night availability
 */
passNightRouter.get("/available", async function (req, res) {
  await (await getPassNightController()).getAvailablePassNightsAvailabilities(
    req,
    res
  );
});

/**
 * Get pass night availability
 */
passNightRouter.get("/:id", async function (req, res) {
  await (await getPassNightController()).getPassNighAvailability(req, res);
});

/**
 * Update pass night availability
 */
passNightRouter.put("/:id", async function (req, res) {
  await (await getPassNightController()).updatePassNightAvailability(req, res);
});

/**
 * Delete pass night availability
 */
passNightRouter.delete("/:id", async function (req, res) {
  await (await getPassNightController()).deletePassNightAvailability(req, res);
});

export { passNightRouter };
