import express from "express";
import { config } from "dotenv";
import { SequelizeManager } from "./utils/db";
import swaggerUI from "swagger-ui-express";
import swaggerJSON from "../docs/swagger.json";
import { buildRoutes } from "./routes";
import { adminMiddleware } from "./middlewares/admin.middleware";

config();

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSON));
// const sequelize = SequelizeManager.getInstance();

buildRoutes(app);

const sequelize = SequelizeManager.getInstance();

/**
 * Just testing route, will be deleted in final release
 */
app.get(
  "/",
  adminMiddleware,
  async (req: express.Request, res: express.Response) => {
    res.send("Hello world !");
  }
);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Listening on http://localhost:${port}`);
});
