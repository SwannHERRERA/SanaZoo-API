import express from "express";
import * as yup from "yup";
import { Enclosure_Controller } from "../../controllers/enclosure/enclosure.controller";
import { Enclosure_Service_Book_Controller } from "../../controllers/enclosure/enclosure_service_book.controller";
import { Enclosure_Image_Controller } from "../../controllers/enclosure/enclosure_image.controller";
import { IEnclosure_Image_Instance } from "../../models";
import { authMiddleware, adminMiddleware } from "../../middlewares";

const enclosureRouter = express.Router();

enclosureRouter.post("/", adminMiddleware, async function (req, res) {
  const name = req.body.name;
  const capacity = req.body.capacity;
  const description = req.body.description;
  const visitDuration = req.body.visitDuration;
  const handicapAccess = req.body.handicapAccess;
  const maintenance = req.body.maintenance;
  const enclosureTypeId = req.body.enclosureTypeId;
  const images = req.body.images;
  const openHour = req.body.closeHour;
  const closeHour = req.body.closeHour;
  enclosureSchemaCreat
    .validate({
      name,
      capacity,
      description,
      visitDuration,
      handicapAccess,
      maintenance,
      enclosureTypeId,
      images,
      openHour,
      closeHour

    })
    .then(async function () {
      const controller = await Enclosure_Controller.getInstance();
      const result = await controller.add({
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
      if (!result) {
        res.status(500).end();
        return;
      }
      if (images !== undefined) {
        const controllerImage = await Enclosure_Image_Controller.getInstance();
        const Errors: string[] = [];
        const Success: IEnclosure_Image_Instance[] = [];
        for (const image of images) {
          image.enclosureId = result.id;
          await imageSchemaCreat
            .validate({
              ...image,
            })
            .then(async function () {
              const img = await controllerImage.add({
                ...image,
              });
              if (img !== null) {
                Success.push(img);
              }
            })
            .catch((Err) => {
              Errors.push(Err.message);
            });
        }
        if (Errors.length > 0) {
          res.status(206).json({ result, Success, Errors }).end();
        } else {
          res.status(201).json({ result, Success }).end();
        }
      } else {
        res.status(201).json(result).end();
      }
    })
    .catch((err) => {
      res.status(400).json(err.message).end();
    });
});

enclosureRouter.get("/type/:enclosureTypeId", async function (req, res) {
  const offset: number = req.query.offset
    ? Number.parseInt(req.query.offset as string)
    : 1;
  const limit: number = req.query.limit
    ? Number.parseInt(req.query.limit as string)
    : 1;

  const controller = await Enclosure_Controller.getInstance();
  const result = await controller.getAllByType(
    Number.parseInt(req.params.enclosureTypeId),
    {
      limit,
      offset,
    }
  );
  res.status(200).json(result).end();
});

enclosureRouter.get("/:id", async function (req, res) {
  const controller = await Enclosure_Controller.getInstance();
  const result = await controller.getOne(Number.parseInt(req.params.id));
  if (!result) res.status(404).end();
  res.status(200).json(result).end();
});

enclosureRouter.get("/", async function (req, res) {
  const offset: number = req.query.offset
    ? Number.parseInt(req.query.offset as string)
    : 1;
  const limit: number = req.query.limit
    ? Number.parseInt(req.query.limit as string)
    : 1;

  const controller = await Enclosure_Controller.getInstance();
  const result = await controller.getAll({
    limit,
    offset,
  });

  res.status(200).json(result).end();
});

enclosureRouter.delete("/:id", adminMiddleware, async function (req, res) {
  const controller = await Enclosure_Controller.getInstance();
  const id = Number.parseInt(req.params.id);
  const current = await controller.getOne(id);

  if (current === null) {
    res.status(404).end();
  }
  const controllerService = await Enclosure_Service_Book_Controller.getInstance();
  const controllerImage = await Enclosure_Image_Controller.getInstance();
  await controllerService.removeFromEnclosure(id);
  await controllerImage.removeFromEnclosure(id);
  await controller.remove(id);
  res.status(204).end();
});

enclosureRouter.put("/:id", adminMiddleware, async function (req, res) {
  const controller = await Enclosure_Controller.getInstance();
  const previous = await controller.getOne(Number.parseInt(req.params.id));
  if (!previous) {
    res.status(404).end();
    return;
  }

  const name = req.body.name || previous.name;
  const capacity = req.body.capacity || previous.capacity;
  const description = req.body.description || previous.description;
  const visitDuration = req.body.visitDuration || previous.visitDuration;
  const handicapAccess = req.body.handicapAccess || previous.handicapAccess;
  const maintenance = req.body.maintenance || previous.maintenance;
  const enclosureTypeId = req.body.enclosureTypeId || previous.enclosureTypeId;
  const openHour = req.body.closeDate || previous.openHour;
  const closeHour = req.body.closeDate || previous.closeHour;
  enclosureSchemaCreat
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
      const result = await controller.update(Number.parseInt(req.params.id), {
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
});

enclosureRouter.get("/:id/animals", authMiddleware, async function (req, res) {
  const controller = await Enclosure_Controller.getInstance();

  const limit = Number(req.query.limit) || 2000;
  const offset = Number(req.query.offset) || 0;

  const enclosureId = Number.parseInt(req.params.id);
  const enclosure = await controller.getOne(enclosureId);
  if (!enclosure) {
    res.status(404).end();
    return;
  }
  const animals = await controller.getAllAnimals(enclosureId, limit, offset);

  res.json(animals);
});

const enclosureSchemaCreat = yup.object().shape({
  name: yup.string().min(6).max(255).required(),
  capacity: yup.number().min(1).required(),
  description: yup.string().min(6).max(255).required(),
  visitDuration: yup.number().min(1).required(),
  handicapAccess: yup.boolean().required(),
  maintenance: yup.boolean().required(),
  enclosureTypeId: yup.number().required(),
  images: yup.array().optional(),
  openHour: yup.string().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
  closeHour: yup.string().matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).required(),
});

const imageSchemaCreat = yup.object().shape({
  enclosureId: yup.number().min(0).required(),
  title: yup.string().min(5).max(255).required(),
  path: yup.string().min(5).max(255).required(),
});

export { enclosureRouter };
