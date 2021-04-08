import { Request, Response } from "express";
import { SequelizeManager } from "../../utils/db";
import * as yup from "yup";

export class AnimalsHealsBookController {
  animalHealsBookSchema = yup.object().shape({
    description: yup.string().required(),
    date: yup.date().required(),
    animalId: yup.number().required(),
    userId: yup.number().required(),
  });

  async validate(animal: unknown, res: Response): Promise<boolean> {
    return this.animalHealsBookSchema
      .validate(animal)
      .then(() => true)
      .catch((err) => {
        res.status(400).json(err.message).end();
        return false;
      });
  }

  async getOneById(req: Request, res: Response): Promise<void> {
    try {
      const healsId = Number(req.body.id);
      const { AnimalHealthBook } = await SequelizeManager.getInstance();
      const healsBook = await AnimalHealthBook.findByPk(healsId);
      res.json(healsBook);
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  }
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { AnimalHealthBook } = await SequelizeManager.getInstance();
      const healsBooks = await AnimalHealthBook.findAll();
      res.json(healsBooks);
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  }
  create = async (req: Request, res: Response): Promise<void> => {
    const heals = req.body;
    const isValid = await this.validate(heals, res);
    if (isValid === false) {
      return;
    }
    try {
      const { AnimalHealthBook } = await SequelizeManager.getInstance();
      const healsBookCreate = await AnimalHealthBook.create(heals);
      res.json(healsBookCreate).status(201);
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  };
  updateOne = async (req: Request, res: Response): Promise<void> => {
    const healsId = Number(req.body.id);
    const heals = req.body;
    const isValid = await this.validate(heals, res);
    if (isValid === false) {
      return;
    }
    try {
      const { AnimalHealthBook } = await SequelizeManager.getInstance();
      const [idUpdate] = await AnimalHealthBook.update(heals, {
        where: { id: healsId },
      });
      if (idUpdate === 0) {
        throw new Error("update fail");
      }
      res.json(heals);
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  };
  async deleteOne(req: Request, res: Response): Promise<void> {
    const id = Number(req.body.id);
    try {
      const { AnimalHealthBook } = await SequelizeManager.getInstance();
      const isDestroyed = await AnimalHealthBook.destroy({ where: { id } });
      res.json(isDestroyed);
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  }
}

export default new AnimalsHealsBookController();
