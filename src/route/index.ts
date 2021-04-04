import {Express} from "express";
import {enclosureRouter} from "./enclosure/enclosure.router";
import {enclosureMaintenanceRouter} from "./enclosure/enclosure_maintenance.router";
import {animalRouter} from "./animal/animal.router";
import {animalHealthBookRouter} from "./animal/animal_health_book.router";

export function buildRoutes(app: Express) {
    app.use("/enclosure", enclosureRouter);
    app.use("/enclosure/maintenance", enclosureMaintenanceRouter);

    app.use("/animal", animalRouter);
    app.use("/animal/health", animalHealthBookRouter);
}