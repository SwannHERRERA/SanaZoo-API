import express from "express";
import { config } from "dotenv";
config();

const app = express();
app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello world !");
});

app.listen(process.env.PORT);
