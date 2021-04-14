import express from "express";
import {StatisticController} from "../../controllers/monitoring/statistic.controller";
import {authMiddleware} from "../../middlewares/auth.middleware";

const statisticRouter = express.Router();

let statisticController: StatisticController;

async function getStatisticController(): Promise<StatisticController> {
    if (!statisticController) {
        statisticController = await StatisticController.getInstance();
    }
    return statisticController
}

statisticRouter.get('/affluence/daily', authMiddleware, async function (req, res) {
    await (await getStatisticController()).dailyAffluence(res);
});

export {
    statisticRouter
}