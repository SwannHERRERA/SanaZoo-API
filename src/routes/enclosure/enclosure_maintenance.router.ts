import express from "express";
import { employeeMiddleware } from "../../middlewares/employee.middleware";
import { Enclosure_Controller } from "../../controllers/enclosure/enclosure.controller";
import * as yup from "yup";
import { Enclosure_Maintenance_Controller } from "../../controllers/enclosure/enclosure_maintenance.controller";

const enclosureMaintenanceRouter = express.Router();

enclosureMaintenanceRouter.get(
  "/month/:id",
  employeeMiddleware,
  async function (req, res) {
    const id = Number.parseInt(req.params.id);
    const controller = await Enclosure_Maintenance_Controller.getInstance();
    const result = await controller.getBestMonth(id);

    res.status(200).json(result).end();
  }
);

enclosureMaintenanceRouter.get(
  "/:state",
  employeeMiddleware,
  async function (req, res) {
    const controller = await Enclosure_Controller.getInstance();
    const state: boolean = req.params.state == "true";
    if (state === undefined) {
      res.status(400).end();
    }

    const result = await controller.getAllByState(state, {
      offset: req.body.offset,
      limit: req.body.limit,
    });
    res.status(200).json(result).end();
  }
);

enclosureMaintenanceRouter.delete("/", async function (req, res) {
  res.status(404).end();
});

enclosureMaintenanceRouter.post("/", async function (req, res) {
  res.status(404).end();
});

enclosureMaintenanceRouter.put(
  "/:id",
  employeeMiddleware,
  async function (req, res) {
    const id = Number.parseInt(req.params.id);
    const controller = await Enclosure_Controller.getInstance();

    const previous = await controller.getOne(id);
    if (previous === null) {
      res.status(404).end();
      return;
    }
    const name = req.body.name || previous.name;

    const capacity = req.body.capacity || previous.capacity;
    const description = req.body.description || previous.description;
    const visitDuration = req.body.visitDuration || previous.visitDuration;
    const maintenance = req.body.maintenance;
    const handicapAccess = req.body.handicapAccess || previous.handicapAccess;
    const enclosureTypeId = req.body.enclosureTypeId || previous.enclosureTypeId;
    const openHour = req.body.closeHour;
    const closeHour = req.body.closeHour;
    enclosureSchema
      .validate({
        name,
        capacity,
        description,
        visitDuration,
        handicapAccess,
        maintenance,
        enclosureTypeId,
        openHour,
        closeHour
      })
      .then(async function () {
        const result = await controller.update(id, {
          name,
          capacity,
          description,
          visitDuration,
          handicapAccess,
          maintenance,
          enclosureTypeId,
          openHour,
          closeHour

        });
        res.status(200).json(result).end();
      })
      .catch((err) => {
        res.status(500).json(err.message).end();
      });
  }
);

const enclosureSchema = yup.object().shape({
  name: yup.string().min(6).max(255).required(),
  capacity: yup.number().min(1).required(),
  description: yup.string().min(6).max(255).required(),
  visitDuration: yup.number().min(1).required(),
  handicapAccess: yup.boolean().required(),
  maintenance: yup.boolean().required(),
  enclosureTypeId: yup.number().required(),
  openHour: yup.string().matches(/^[0-2][0-3]:[0-5][0-9]$/).required(),
  closeHour: yup.string().matches(/^[0-2][0-3]:[0-5][0-9]$/).required(),
});

export { enclosureMaintenanceRouter };
