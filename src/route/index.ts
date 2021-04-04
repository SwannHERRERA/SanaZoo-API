import {Express} from "express";
import {enclosureRouter} from "./enclosure/enclosure.route";
import {enclosureMaintenanceRouter} from "./enclosure/enclosure_maintenance.route";

export function buildRoutes(app: Express) {
    app.use("/enclosure", enclosureRouter);
    app.use("/enclosure/maintenance", enclosureMaintenanceRouter);
}