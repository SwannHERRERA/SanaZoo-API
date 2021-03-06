import { Request, Response } from "express";
import { SequelizeManager } from "../../utils/db";
import * as yup from "yup";
import { StatusCode } from "../../utils/statusCode";
import { Controller } from "../../core/controller";

export class AnimalsController extends Controller {
  schema = yup.object().shape({
    name: yup.string().max(120).required(),
    description: yup.string().nullable(),
    birthdate: yup.date().required(),
    image: yup.string().nullable(),
    specieId: yup.number().required(),
    enclosureId: yup.number().required(),
  });

  public getOneById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const { Animal } = await SequelizeManager.getInstance();
      const animal = await Animal.findByPk(id);
      if (animal === null) {
        res.status(StatusCode.NOT_FOUND).end();
        return;
      }
      res.json(animal);
    } catch (err) {
      console.error(err);
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };

  public getAll = async (req: Request, res: Response): Promise<void> => {
    const limit = Number(req.query.limit) || 2000;
    const offset = Number(req.query.offset) || 0;
    try {
      const { Animal } = await SequelizeManager.getInstance();
      const animals = await Animal.findAll({ limit, offset });
      res.json(animals);
    } catch (err) {
      console.error(err);
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    const animalPost = req.body;
    const isValid = await this.validate(animalPost, res);
    if (isValid === false) {
      return;
    }
    try {
      const {
        Animal,
        Specie,
        Enclosure,
      } = await SequelizeManager.getInstance();
      const enclosure = await Enclosure.findByPk(animalPost.enclosureId);
      const specie = await Specie.findByPk(animalPost.specieId);
      if (!specie) {
        res
          .status(StatusCode.NOT_FOUND)
          .json({ message: "specie not found" })
          .end();
        return;
      }
      if (!enclosure) {
        res
          .status(StatusCode.NOT_FOUND)
          .json({ message: "enclosure not found" })
          .end();
        return;
      }
      const animalCreate = await Animal.create(animalPost);
      res.json(animalCreate).status(StatusCode.CREATED);
    } catch (err) {
      console.error(err);
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };

  public updateOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const animalPost = req.body;
      const { Animal } = await SequelizeManager.getInstance();
      const previousAnimal = await Animal.findByPk(id);
      if (previousAnimal === null) {
        res.status(StatusCode.NOT_FOUND).end();
        return;
      }
      animalPost.name = animalPost.name || previousAnimal.name;
      animalPost.description =
        animalPost.description || previousAnimal.description;
      animalPost.birthdate = animalPost.birthdate || previousAnimal.birthdate;
      animalPost.image = animalPost.image || previousAnimal.image;
      animalPost.specieId = animalPost.specieId || previousAnimal.specieId;
      animalPost.enclosureId =
        animalPost.enclosureId || previousAnimal.enclosureId;
      const isValid = await this.validate(animalPost, res);
      if (isValid === false) {
        return;
      }
      const animalUpdated = await previousAnimal.update(animalPost);
      res.json(animalUpdated);
    } catch (err) {
      console.error(err);
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };
  public deleteOne = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    try {
      const { Animal } = await SequelizeManager.getInstance();
      const isDestroyed = await Animal.destroy({ where: { id } });
      if (isDestroyed) {
        res.status(StatusCode.DELETED).end();
      } else {
        res.status(StatusCode.NOT_FOUND).end();
      }
    } catch (err) {
      console.error(err);
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };

  private async moveEnclosureVerif(
    req: Request,
    res: Response
  ): Promise<boolean> {
    const moveEnclosureSchema = yup.object().shape({
      animalId: yup.number().required(),
      enclosureId: yup.number().required(),
    });
    try {
      await moveEnclosureSchema.validate(req.body);
      return true;
    } catch (err) {
      res.status(StatusCode.BAD_REQUEST).json(err.message).end();
      return false;
    }
  }

  public moveEnclosure = async (req: Request, res: Response): Promise<void> => {
    const reqIsValid = await this.moveEnclosureVerif(req, res);
    if (!reqIsValid) {
      return;
    }
    try {
      const { Animal, Enclosure } = await SequelizeManager.getInstance();
      const animal = await Animal.findByPk(req.body.animalId);
      const enclosure = await Enclosure.findByPk(req.body.enclosureId);
      if (animal === null) {
        res
          .status(StatusCode.NOT_FOUND)
          .json({ message: "animal not found" })
          .end();
        return;
      }
      if (enclosure === null) {
        res
          .status(StatusCode.NOT_FOUND)
          .json({ message: "enclosure not found" })
          .end();
        return;
      }
      const animalUpdated = await animal.setEnclosure(req.body.enclosureId);
      res.json(animalUpdated);
    } catch (err) {
      console.error(err);
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };
}

export default new AnimalsController();
