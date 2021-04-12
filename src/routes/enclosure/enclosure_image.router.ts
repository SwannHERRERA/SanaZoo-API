import express from "express";
import {adminMiddleware} from "../../middlewares/admin.middleware";
import {Enclosure_Image_Controller} from "../../controllers/enclosure/enclosure_image.controller";
import * as yup from "yup";


const enclosureRouter = express.Router();

enclosureRouter.delete("/:id", adminMiddleware, async function(req, res) {
    const id = Number.parseInt(req.params.id);
    if (id === undefined) {
        res.status(404).end();
        return;
    }
    const controller = await Enclosure_Image_Controller.getInstance();
    const number = await controller.remove(id);
    if (number === 0) {
        res.status(404).end();
        return;
    }
    res.status(204).end();
});

enclosureRouter.get("/enclosure/:id", async function(req, res) {
    const id = Number.parseInt(req.params.id);
    if (id === undefined) {
        res.status(404).end();
        return;
    }
    const controller = await Enclosure_Image_Controller.getInstance();
    const result = await controller.getAllFromImage(id);
    res.status(200).json(result).end();
});

enclosureRouter.get("/:id", async function(req, res) {
    const id = Number.parseInt(req.params.id);
    if (id === undefined) {
        res.status(404).end();
        return;
    }
    const controller = await Enclosure_Image_Controller.getInstance();
    const result = await controller.getOne(id);
    res.status(200).json(result).end();
});

enclosureRouter.get("/", async function (req, res) {
   const offset = req.body.offset;
   const limit = req.body.limit;

   const controller = await Enclosure_Image_Controller.getInstance();
   const result = await controller.getAll({
       offset,
       limit
   });
   res.status(200).json(result).end();
});

enclosureRouter.put("/:id", adminMiddleware, async function (req, res) {
    const id = Number.parseInt(req.params.id);
    if (id === undefined) {
        res.status(404).end();
        return;
    }
    const controller = await Enclosure_Image_Controller.getInstance();
    const prev = await controller.getOne(id);
    if (prev === null) {
        res.status(404).end();
        return;
    }
    const title =  req.body.title || prev.title;
    const path = req.body.path || prev.path;
    const enclosureId = Number.parseInt(req.body.enclosureId) || prev.enclosureId;
    SchemaImageCreat.validate({
       title,
       path,
       enclosureId
    }).then(async function () {

        const result = controller.update(id, {
            title,
            path,
            enclosureId
        });
        res.status(200).json(result).end();
    }).catch((Err) => {
        res.status(500).json(Err.message).end();
    });

});

const SchemaImageCreat = yup.object().shape({
    title: yup.string().min(5).max(255).required(),
    path: yup.string().min(5).max(255).required(),
    enclosureId: yup.number().min(0).required()

});

export {
    enclosureRouter
}