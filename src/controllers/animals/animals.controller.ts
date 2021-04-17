import { Request, Response } from "express";
import { SequelizeManager } from "../../utils/db";
import * as yup from "yup";

export class AnimalsController {
  animalSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string(),
    birthdate: yup.date().required(),
    image: yup.string(),
    specieId: yup.number().required(),
    enclosureId: yup.number().required(),
  });

  async validate(animal: unknown, res: Response): Promise<boolean> {
    return this.animalSchema
      .validate(animal)
      .then(() => true)
      .catch((err) => {
        res.status(400).json(err.message).end();
        return false;
      });
  }

  async getOneById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const { Animal } = await SequelizeManager.getInstance();
      const animal = await Animal.findByPk(id);
      if (animal === null) {
        res.status(404).end();
        return;
      }
      res.json(animal);
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { Animal } = await SequelizeManager.getInstance();
      const animals = await Animal.findAll();
      res.json(animals);
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  }

  create = async (req: Request, res: Response): Promise<void> => {
    const animalPost = req.body;
    const isValid = await this.validate(animalPost, res);
    if (isValid === false) {
      return;
    }
    try {
      const { Animal, Specie } = await SequelizeManager.getInstance();
      const specie = await Specie.findByPk(animalPost.specieId);
      if (!specie) {
        res.status(404).json({ message: "specie not found" }).end();
        return;
      }
      const animalCreate = await Animal.create(animalPost);
      res.json(animalCreate).status(201);
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  };

  updateOne = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const animalPost = req.body;
    const isValid = await this.validate(animalPost, res);
    if (isValid === false) {
      return;
    }
    try {
      const { Animal } = await SequelizeManager.getInstance();
      const animal = await Animal.findByPk(id);
      if (!animal) {
        res.status(404).end();
        return;
      }
      const animalUpdated = await animal.update(animalPost);
      res.json(animalUpdated);
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  };
  async deleteOne(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const { Animal } = await SequelizeManager.getInstance();
      const isDestroyed = await Animal.destroy({ where: { id } });
      if (isDestroyed) {
        res.status(204).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  }

  async moveEnclosureVerif(req: Request, res: Response): Promise<boolean> {
    const animalId = Number(req.params.id);
    const moveEnclosureSchema = yup.object().shape({
      animalId: yup.number().required(),
      enclosureId: yup.number().required(),
    });
    if (animalId !== req.body.animalId) {
      res.status(400).end();
      return false;
    }
    try {
      await moveEnclosureSchema.validate(req.body);
      return true;
    } catch (err) {
      res.status(400).json(err.message).end();
      return false;
    }
  }

  moveEnclosure = async (req: Request, res: Response): Promise<void> => {
    const reqIsValid = await this.moveEnclosureVerif(req, res);
    if (!reqIsValid) {
      return;
    }
    try {
      const { Animal } = await SequelizeManager.getInstance();
      const animal = await Animal.findByPk(req.body.animalId);
      if (animal === null) {
        throw new Error("animal doesn't exist");
      }
      const animalUpdated = await animal.setEnclosure(req.body.enclosureId);
      res.json(animalUpdated);
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  };
}

export default new AnimalsController();
