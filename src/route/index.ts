import {Express} from "express";
import {enclosureRouter} from "./enclosure/enclosure.route";
import {enclosureMaintenanceRouter} from "./enclosure/enclosure_maintenance.route";
import {animalRouter} from "./animal/animalRouter";
import {animalHealthBookRouter} from "./animal/animal_health_book.route";

export function buildRoutes(app: Express) {
    app.use("/enclosure", enclosureRouter);
    app.use("/enclosure/maintenance", enclosureMaintenanceRouter);

    app.use("/animal", animalRouter);
    app.use("/animal/health", animalHealthBookRouter);
}