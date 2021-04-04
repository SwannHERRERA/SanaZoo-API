import express, {Express} from "express";
import {config} from "dotenv";
import {SequelizeManager} from "./utils/db";
import {buildRoutes} from "./route";

config();

const app: Express = express();

/**
 * Parse body into json
 */
app.use(express.json());

/**
 * Build all routes
 */
buildRoutes(app)

const sequelize = SequelizeManager.getInstance();

/**
 * Just testing route, will be deleted in final release
 */
app.get("/", (req: express.Request, res: express.Response) => {
    res.send("Hello world !");
});

const port = process.env.PORT || 3000
app.listen(port, function () {
    console.log(`Listening on http://localhost:${port}`);
});