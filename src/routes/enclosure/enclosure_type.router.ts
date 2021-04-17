import express from "express";
import { Enclosure_Type_Controller } from "../../controllers/enclosure/enclosure_type.controller";
import { adminMiddleware } from "../../middlewares/admin.middleware";
import * as yup from "yup";

const enclosureTypeRouter = express.Router();

enclosureTypeRouter.get("/:id", async function (req, res) {
  const controller = await Enclosure_Type_Controller.getInstance();
  const result = await controller.getOne(Number.parseInt(req.params.id));

  if (!result) res.status(404).end();
  res.status(200).json(result).end();
});

enclosureTypeRouter.get("/", async function (req, res) {
  const offset: number = req.body.offset;
  const limit: number = req.body.limit;

  const controller = await Enclosure_Type_Controller.getInstance();
  const result = await controller.getAll({
    limit,
    offset,
  });

  res.status(200).json(result).end();
});

enclosureTypeRouter.post("/", adminMiddleware, async function (req, res) {
  const name = req.body.name;

  enclosureSchemaCreat
    .validate({ name })
    .then(async function () {
      const controller = await Enclosure_Type_Controller.getInstance();
      const result = await controller.add({
        name,
      });
      if (!result) res.status(500).end();
      res.status(201).json(result).end();
    })
    .catch((err) => {
      res.status(400).json(err.message).end();
    });
});

enclosureTypeRouter.delete("/:id", adminMiddleware, async function (req, res) {
  const controller = await Enclosure_Type_Controller.getInstance();
  const result = await controller.remove(Number.parseInt(req.params.id));
  if (result === 0) res.status(404).end();
  res.status(204).end();
});

enclosureTypeRouter.put("/:id", adminMiddleware, async function (req, res) {
  const name = req.body.name;

  enclosureSchemaCreat
    .validate({ name })
    .then(async function () {
      const controller = await Enclosure_Type_Controller.getInstance();
      const result = await controller.update(Number.parseInt(req.params.id), {
        name,
      });
      if (!result) res.status(500).end();
      res.status(201).json(result).end();
    })
    .catch((err) => {
      res.status(400).json(err.message).end();
    });
});

const enclosureSchemaCreat = yup.object().shape({
  name: yup.string().min(6).max(255).required(),
});

export { enclosureTypeRouter };
