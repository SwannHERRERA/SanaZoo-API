import {Express} from "express";
import {enclosureRouter} from "./enclosure/enclosure.router";
import {enclosureMaintenanceRouter} from "./enclosure/enclosure_maintenance.router";
import {animalRouter} from "./animal/animal.router";
import {animalHealthBookRouter} from "./animal/animal_health_book.router";
import {employeePlanningRouter} from "./planning/employee_planning.router";
import {zooOpeningRouter} from "./planning/zoo_opening.router";
import {passRouter} from "./pass/pass.router";
import {passControlRouter} from "./pass/pass_control.router";
import {passEscapeGameRouter} from "./pass/pass_escape_game.router";
import {passNightRouter} from "./pass/pass_night.router";
import {statisticRouter} from "./monitoring/statistic.router";
import {affluenceRouter} from "./monitoring/affluence.router";
import {userRouter} from "./user/user.router";
import {userRoleRouter} from "./user/user_role.router";
import {animalSpecieRouter} from "./animal/animal_specie.router";
import {enclosureTypeRouter} from "./enclosure/enclosure_type.router";

export function buildRoutes(app: Express) {
    app.use("/enclosure/maintenance", enclosureMaintenanceRouter);
    app.use("/enclosure/type", enclosureTypeRouter)
    app.use("/enclosure", enclosureRouter);

    app.use("/animal/specie", animalSpecieRouter);
    app.use("/animal/health", animalHealthBookRouter);
    app.use("/animal", animalRouter);

    app.use("/planning", employeePlanningRouter);
    app.use("/zoo", zooOpeningRouter);

    app.use("/pass/control", passControlRouter);
    app.use("/pass/escape-game", passEscapeGameRouter);
    app.use("/pass/night", passNightRouter);
    app.use("/pass", passRouter);

    app.use("/monitoring/statistic", statisticRouter);
    app.use("/monitoring/affluence", affluenceRouter);

    app.use("/user/role", userRoleRouter);
    app.use("/user", userRouter);
}