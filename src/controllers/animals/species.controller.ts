import { Request, Response } from "express";
import { SequelizeManager } from "../../utils/db";
import * as yup from "yup";
import { StatusCode } from "../../utils/statusCode";
import { Controller } from "../../core/controller";

export class SpeciesController extends Controller {
  schema = yup.object().shape({
    name: yup.string().max(120).required(),
    origin: yup.string().required(),
    description: yup.string().nullable(),
  });

  public getOneById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const { Specie } = await SequelizeManager.getInstance();
      const specie = await Specie.findByPk(id);
      if (specie === null) {
        res.status(StatusCode.NOT_FOUND).end();
        return;
      }
      res.json(specie);
    } catch (err) {
      console.error(err);
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };

  public getAll = async (req: Request, res: Response): Promise<void> => {
    const limit = Number(req.query.limit) || 200;
    const offset = Number(req.query.offset) || 0;
    try {
      const { Specie } = await SequelizeManager.getInstance();
      const species = await Specie.findAll({ limit, offset });
      res.json(species);
    } catch (err) {
      console.error(err);
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };

  public create = async (req: Request, res: Response): Promise<void> => {
    const speciePost = req.body;
    const isValid = await this.validate(speciePost, res);
    if (isValid === false) {
      return;
    }
    try {
      const { Specie } = await SequelizeManager.getInstance();
      const specieCreate = await Specie.create(speciePost);
      res.json(specieCreate).status(StatusCode.CREATED);
    } catch (err) {
      console.error(err);
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };

  public updateOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const { Specie } = await SequelizeManager.getInstance();
      const previousSpecie = await Specie.findByPk(id);
      if (!previousSpecie) {
        res.status(StatusCode.NOT_FOUND).end();
        return;
      }
      const speciePost = req.body;
      speciePost.name = speciePost.name || previousSpecie.name;
      speciePost.origin = speciePost.origin || speciePost.origin;
      speciePost.description = speciePost.description || speciePost.description;

      const isValid = await this.validate(speciePost, res);
      if (isValid === false) {
        return;
      }
      const specieUpdated = await previousSpecie.update(speciePost);
      res.json(specieUpdated);
    } catch (err) {
      console.error(err);
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };

  public deleteOne = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    try {
      const { Specie, Animal } = await SequelizeManager.getInstance();
      const animals = await Animal.findAll({ where: { specieId: id } });
      if (animals.length > 0) {
        res
          .status(StatusCode.CONFLICT)
          .json({ message: "this species has animals you can't remove" })
          .end();
      }

      const isDestroyed = await Specie.destroy({ where: { id } });
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

  public getAllAnimals = async (req: Request, res: Response): Promise<void> => {
    try {
      const specieId = Number(req.params.specieId);
      const { Animal } = await SequelizeManager.getInstance();
      const animals = await Animal.findAll({ where: { specieId } });
      res.json(animals);
    } catch (err) {
      console.error(err);
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };
}

export default new SpeciesController();
