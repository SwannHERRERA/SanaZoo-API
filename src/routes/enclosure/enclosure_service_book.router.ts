import express from "express";
import { adminMiddleware } from "../../middlewares/admin.middleware";
import { Enclosure_Service_Book_Controller } from "../../controllers/enclosure/enclosure_service_book.controller";
import * as yup from "yup";
import { employeeMiddleware } from "../../middlewares/employee.middleware";

const enclosureServiceBookRouter = express.Router();

enclosureServiceBookRouter.delete(
  "/:id",
  adminMiddleware,
  async function (req, res) {
    const controller = await Enclosure_Service_Book_Controller.getInstance();
    const number = await controller.remove(Number.parseInt(req.params.id));

    if (number === 0) res.status(404).end();
    res.status(204).end();
  }
);

enclosureServiceBookRouter.post(
  "/",
  employeeMiddleware,
  async function (req, res) {
    const date = req.body.date;
    const description = req.body.description;
    const enclosureId = req.body.enclosureId;
    const userId = req.body.userId;

    enclosureServiceBookSchemaCreat
      .validate({
        date,
        description,
        enclosureId,
        employeeId: userId,
      })
      .then(async function () {
        const controller = await Enclosure_Service_Book_Controller.getInstance();
        const result = await controller.add({
          date,
          description,
          enclosureId,
          userId,
        });

        res.status(200).json(result).end();
      })
      .catch((err) => {
        res.status(500).json(err.message).end();
      });
  }
);

enclosureServiceBookRouter.put(
  "/:id",
  employeeMiddleware,
  async function (req, res) {
    const controller = await Enclosure_Service_Book_Controller.getInstance();
    const id = Number.parseInt(req.params.id);
    const previous = await controller.getOne(id);

    if (previous === null) {
      res.status(404).end();
      return;
    }
    const date = req.body.date || previous.date;
    const description = req.body.description || previous.description;
    const enclosureId = req.body.enclosureId || previous.enclosureId;
    const userId = req.body.userId || previous.userId;

    enclosureServiceBookSchemaCreat
      .validate({
        date,
        description,
        enclosureId,
        userId,
      })
      .then(async function () {
        const result = await controller.update(id, {
          date,
          description,
          enclosureId,
          userId,
        });
        res.status(200).json(result).end();
      })
      .catch((err) => {
        res.status(500).json(err.message).end();
      });
  }
);

enclosureServiceBookRouter.get(
  "/:id",
  employeeMiddleware,
  async function (req, res) {
    const controller = await Enclosure_Service_Book_Controller.getInstance();
    const result = await controller.getOne(Number.parseInt(req.params.id));
    if (result === null) {
      res.status(404).end();
      return;
    }
    res.status(200).json(result).end();
  }
);

enclosureServiceBookRouter.get(
  "/enclosure/:id",
  employeeMiddleware,
  async function (req, res) {
    const controller = await Enclosure_Service_Book_Controller.getInstance();
    const result = await controller.getAllFromEnclosure(
      Number.parseInt(req.params.id)
    );
    if (result === null) {
      res.status(404).end();
      return;
    }
    res.status(200).json(result).end();
  }
);

enclosureServiceBookRouter.get(
  "/employee/:id",
  employeeMiddleware,
  async function (req, res) {
    const controller = await Enclosure_Service_Book_Controller.getInstance();
    const result = await controller.getAllFromEmployee(
      Number.parseInt(req.params.id)
    );
    if (result === null) {
      res.status(404).end();
      return;
    }
    res.status(200).json(result).end();
  }
);

enclosureServiceBookRouter.get(
  "/",
  employeeMiddleware,
  async function (req, res) {
    const offset: number = req.body.offset;
    const limit: number = req.body.limit;

    const controller = await Enclosure_Service_Book_Controller.getInstance();
    const result = await controller.getAll({
      limit,
      offset,
    });
    if (result === null) {
      res.status(404).end();
      return;
    }
    res.status(200).json(result).end();
  }
);

const enclosureServiceBookSchemaCreat = yup.object().shape({
  date: yup.date().required(),
  description: yup.string().min(10).max(255).required(),
  enclosureId: yup.number().min(0).required(),
  employeeId: yup.number().min(0).required(),
});

export { enclosureServiceBookRouter };
