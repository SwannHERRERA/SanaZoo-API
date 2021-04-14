import { Request, Response } from "express";
import { SequelizeManager } from "../../utils/db";
import * as yup from "yup";
import { StatusCode } from "../../utils/statusCode";

export class SpeciesController {
  specieSchema = yup.object().shape({
    name: yup.string().required(),
    origin: yup.string().required(),
    description: yup.string(),
  });
  async validate(specie: unknown, res: Response): Promise<boolean> {
    return this.specieSchema
      .validate(specie)
      .then(() => true)
      .catch((err) => {
        res.status(StatusCode.BAD_REQUEST).json(err.message).end();
        return false;
      });
  }

  async getOneById(req: Request, res: Response): Promise<void> {
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
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { Specie } = await SequelizeManager.getInstance();
      const species = await Specie.findAll();
      res.json(species);
    } catch (err) {
      console.error(err);
      res.status(StatusCode.SERVER_ERROR).end();
    }
  }

  create = async (req: Request, res: Response): Promise<void> => {
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

  updateOne = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const speciePost = req.body;
    const isValid = await this.validate(speciePost, res);
    if (isValid === false) {
      return;
    }
    try {
      const { Specie } = await SequelizeManager.getInstance();
      const specie = await Specie.findByPk(id);
      if (!specie) {
        res.status(StatusCode.NOT_FOUND).end();
        return;
      }
      const specieUpdated = await specie.update(speciePost);
      res.json(specieUpdated);
    } catch (err) {
      console.error(err);
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };

  async deleteOne(req: Request, res: Response): Promise<void> {
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
  }

  async getAllAnimals(req: Request, res: Response): Promise<void> {
    try {
      const specieId = Number(req.params.specieId);
      const { Animal } = await SequelizeManager.getInstance();
      const animals = await Animal.findAll({ where: { specieId } });
      res.json(animals);
    } catch (err) {
      console.error(err);
      res.status(StatusCode.SERVER_ERROR).end();
    }
  }
}

export default new SpeciesController();
