import express from "express";
import { config } from "dotenv";
import { SequelizeManager } from "./utils/db";
config();

const app = express();

app.use(express.json());

const sequelize = SequelizeManager.getInstance();

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello world !");
});

app.listen(process.env.PORT);
