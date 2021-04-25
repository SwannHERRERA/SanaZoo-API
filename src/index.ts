import express from "express";
import { config } from "dotenv";
import { SequelizeManager } from "./utils/db";
import swaggerUI from "swagger-ui-express";
import swaggerJSON from "../swagger/zoo.json";
import { buildRoutes } from "./routes";
// import { seedDB } from "./seeds/faker";

config();

process.env.TZ = "Europe/Paris";

/**
 * Create Fake data
 */
// seedDB();

const app = express();
app.use(express.json());
app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerJSON));

buildRoutes(app);
//Initialise instance
SequelizeManager.getInstance();

/**
 * Just testing routes, will be deleted in final release
 */
app.get("/", async (req: express.Request, res: express.Response) => {
  res.send(
    "<h1>Welcome to SanaZoo API !</h1>" +
      'To test our API, go on <a target="_blank" href="https://zoo.nospy.fr/swagger">https://zoo.nospy.fr/swagger</a>' +
      "<p>" +
      'Check our github repo on <a target="_blank" href="https://github.com/SwannHERRERA/api-zoo">https://github.com/SwannHERRERA/api-zoo</a>' +
      "</p><p>" +
      "Contributors : <ul>" +
      '<li><a target="_blank" href="https://github.com/Nouuu">Noé Larrieu-Lacoste</a></li>' +
      '<li><a target="_blank" href="https://github.com/SwannHERRERA">Swann Herrera</a></li>' +
      '<li><a target="_blank" href="https://github.com/Huriumari">Clément Bossard</a></li>' +
      "</ul>" +
      "</p>"
  );
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Listening on http://localhost:${port}`);
});
