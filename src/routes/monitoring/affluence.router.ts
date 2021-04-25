import express from "express";
import { AffluenceController } from "../../controllers/monitoring/affluence.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const affluenceRouter = express.Router();

let affluenceController: AffluenceController;

async function getAffluenceController(): Promise<AffluenceController> {
  if (!affluenceController) {
    affluenceController = await AffluenceController.getInstance();
  }
  return affluenceController;
}

affluenceRouter.get(
  "/daily/:enclosureId",
  authMiddleware,
  async function (req, res) {
    await (await getAffluenceController()).dailyEnclosureAffluence(req, res);
  }
);

affluenceRouter.get("/daily", authMiddleware, async function (req, res) {
  await (await getAffluenceController()).dailyAffluence(req, res);
});

affluenceRouter.get(
  "/weekly/:enclosureId",
  authMiddleware,
  async function (req, res) {
    await (await getAffluenceController()).weeklyEnclosureAffluence(req, res);
  }
);

affluenceRouter.get("/weekly", authMiddleware, async function (req, res) {
  await (await getAffluenceController()).weeklyAffluence(res);
});

affluenceRouter.get(
  "/monthly-enclosure/:enclosureId/:month?",
  authMiddleware,
  async function (req, res) {
    await (await getAffluenceController()).monthlyEnclosureAffluence(req, res);
  }
);
affluenceRouter.get(
  "/monthly/:month?",
  authMiddleware,
  async function (req, res) {
    await (await getAffluenceController()).monthlyAffluence(req, res);
  }
);

affluenceRouter.get(
  "/yearly-enclosure/:enclosureId/:year?",
  authMiddleware,
  async function (req, res) {
    await (await getAffluenceController()).yearlyEnclosureAffluence(req, res);
  }
);

affluenceRouter.get(
  "/yearly/:year?",
  authMiddleware,
  async function (req, res) {
    await (await getAffluenceController()).yearlyAffluence(req, res);
  }
);

affluenceRouter.get(
  "/total/:enclosureId",
  authMiddleware,
  async function (req, res) {
    await (await getAffluenceController()).totalEnclosureAffluence(req, res);
  }
);

affluenceRouter.get("/total", authMiddleware, async function (req, res) {
  await (await getAffluenceController()).totalAffluence(res);
});

affluenceRouter.get(
  "/live/:enclosureId",
  authMiddleware,
  async function (req, res) {
    await (await getAffluenceController()).currentEnclosureAffluence(req, res);
  }
);

export { affluenceRouter };
