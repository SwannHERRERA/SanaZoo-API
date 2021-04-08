import express from "express";
import {adminMiddleware} from "../../middlewares/admin.middleware";
import * as yup from "yup";
import {Enclosure_Controller} from "../../controllers/enclosure/enclosure.controller";

const enclosureRouter = express.Router();

enclosureRouter.post("/", adminMiddleware,  async function(req, res) {
    const name = req.body.name;
    const capacity = req.body.capacity;
    const description = req.body.description;
    const visitDuration = req.body.visitDuration;
    const handicapAccess = req.body.handicapAccess;
    const maintenance = req.body.maintenance;
    const enclosureTypeId = req.body.enclosureTypeId;
    enclosureSchemaCreat.validate({
            name,
            capacity,
            description,
            visitDuration,
            handicapAccess,
            maintenance,
            enclosureTypeId
    }).then(async function() {
        const controller = await Enclosure_Controller.getInstance();
        const result = await controller.add({
            name,
            capacity,
            description,
            visitDuration,
            handicapAccess,
            maintenance,
            enclosureTypeId
        });
        if (!result)
            res.status(500).end();
        res.status(201).json(result).end();
    }).catch ((err) => {
        res.status(400).json(err.message).end();
    });
})

enclosureRouter.get("/", async function(req, res) {
    const offset: number = req.body.offset;
    const limit: number = req.body.limit;

    const controller = await Enclosure_Controller.getInstance();
    const result = await controller.getAll({
        limit,
        offset
    });

    res.status(200).json(result).end();
});

enclosureRouter.get("/:id", async function(req, res){
    const controller = await Enclosure_Controller.getInstance();
    const result = await controller.getOne(Number.parseInt(req.params.id));
    if (!result)
        res.status(404).end();
    res.status(200).json(result).end();
})

enclosureRouter.delete("/:id", adminMiddleware, async function(req, res){
    const controller = await Enclosure_Controller.getInstance();
    const number = await controller.remove(Number.parseInt(req.params.id));

    if (number === 0)
        res.status(404).end();
    res.status(200).end();
})

enclosureRouter.put("/:id", adminMiddleware, async function (req, res) {
    const name = req.body.name;
    const capacity = req.body.capacity;
    const description = req.body.description;
    const visitDuration = req.body.visitDuration;
    const handicapAccess = req.body.handicapAccess;
    const maintenance = req.body.maintenance;
    const enclosureTypeId = req.body.enclosureTypeId;
    enclosureSchemaUpdate.validate({
        name,
        capacity,
        description,
        visitDuration,
        handicapAccess,
        maintenance,
        enclosureTypeId
    }).then(async function() {
        const controller = await Enclosure_Controller.getInstance();
        const result = await controller.update(Number.parseInt(req.params.id), {
            name,
            capacity,
            description,
            visitDuration,
            handicapAccess,
            maintenance,
            enclosureTypeId
        });
        res.status(200).json(result).end();
    }).catch((err) => {
        res.status(500).json(err.message).end();
    })
});

const enclosureSchemaUpdate = yup.object().shape({
    name: yup.string().optional(),
    capacity: yup.number().optional(),
    description: yup.string().optional(),
    visitDuration: yup.number().optional(),
    handicapAccess: yup.boolean().optional(),
    maintenance: yup.boolean().optional(),
    enclosureTypeId: yup.number().optional()
});

const enclosureSchemaCreat = yup.object().shape({
    name: yup.string().required(),
    capacity: yup.number().required(),
    description: yup.string().required(),
    visitDuration: yup.number().required(),
    handicapAccess: yup.boolean().required(),
    maintenance: yup.boolean().required(),
    enclosureTypeId: yup.number().required()
});

export {

    enclosureRouter
}