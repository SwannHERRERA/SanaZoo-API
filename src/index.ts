import express from "express";
import { config } from "dotenv";
import { SequelizeManager } from "./utils/db";
import swaggerUI from "swagger-ui-express";
import swaggerJSON from "../docs/swagger.json";
config();

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSON));
// const sequelize = SequelizeManager.getInstance();

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello world !");
});

app.listen(process.env.PORT);
