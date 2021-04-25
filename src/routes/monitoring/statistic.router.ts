import express from "express";
import { StatisticController } from "../../controllers/monitoring/statistic.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const statisticRouter = express.Router();

let statisticController: StatisticController;

async function getStatisticController(): Promise<StatisticController> {
  if (!statisticController) {
    statisticController = await StatisticController.getInstance();
  }
  return statisticController;
}

statisticRouter.get("/count/user", authMiddleware, async function (req, res) {
  await (await getStatisticController()).userCount(res);
});

statisticRouter.get(
  "/count/enclosure",
  authMiddleware,
  async function (req, res) {
    await (await getStatisticController()).enclosureCount(res);
  }
);

statisticRouter.get("/count/animal", authMiddleware, async function (req, res) {
  await (await getStatisticController()).animalCount(res);
});

statisticRouter.get(
  "/count/animal/:enclosureId",
  authMiddleware,
  async function (req, res) {
    await (await getStatisticController()).enclosureAnimalCount(req, res);
  }
);

statisticRouter.get(
  "/count/pass/valid/types",
  authMiddleware,
  async function (req, res) {
    await (await getStatisticController()).validPassStatsByType(res);
  }
);

statisticRouter.get(
  "/count/pass/valid",
  authMiddleware,
  async function (req, res) {
    await (await getStatisticController()).validPassStats(res);
  }
);

statisticRouter.get(
  "/count/pass/expired",
  authMiddleware,
  async function (req, res) {
    await (await getStatisticController()).expiredPassStats(res);
  }
);

statisticRouter.get(
  "/count/pass/types",
  authMiddleware,
  async function (req, res) {
    await (await getStatisticController()).allPassStatsByType(res);
  }
);

statisticRouter.get("/count/pass", authMiddleware, async function (req, res) {
  await (await getStatisticController()).allPassStats(res);
});

export { statisticRouter };
