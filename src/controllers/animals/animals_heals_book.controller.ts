import { Request, Response } from "express";
import { SequelizeManager } from "../../utils/db";
import * as yup from "yup";
import { ModelCtor } from "sequelize/types";
import { IAnimal_Instance, IUser_Instance } from "../../models";

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

  async checkFKError(
    res: Response,
    Animal: ModelCtor<IAnimal_Instance>,
    User: ModelCtor<IUser_Instance>,
    userId: number,
    animalId: number
  ): Promise<boolean> {
    const user = await User.findByPk(userId);
    const animal = await Animal.findByPk(animalId);
    if (!user) {
      res.status(404).send("the user does not exist").end();
    }
    if (!animal) {
      res.status(404).send("the animal does not exist").end();
    }
    if (!animal || !user) {
      return false;
    }
    return true;
  }

  create = async (req: Request, res: Response): Promise<void> => {
    const heals = req.body;
    const isValid = await this.validate(heals, res);
    if (isValid === false) {
      return;
    }
    try {
      const {
        AnimalHealthBook,
        User,
        Animal,
      } = await SequelizeManager.getInstance();

      const isBuildable = await this.checkFKError(
        res,
        Animal,
        User,
        heals.userId,
        heals.animalId
      );
      if (isBuildable === false) {
        return;
      }

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
      const {
        AnimalHealthBook,
        Animal,
        User,
      } = await SequelizeManager.getInstance();
      const isUpadatable = await this.checkFKError(
        res,
        Animal,
        User,
        heals.userId,
        heals.animalId
      );
      const animalHealsBook = await AnimalHealthBook.findByPk(healsId);
      if (isUpadatable === false || !animalHealsBook) {
        res.send(404).end(); // for animalHealsBook === null
        return;
      }
      const animalHealsBookUpdated = await animalHealsBook.update(heals);

      res.json(animalHealsBookUpdated);
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

  async getAllByAnimal(req: Request, res: Response): Promise<void> {
    try {
      const animalId = Number(req.params.animalId);
      const { AnimalHealthBook, Animal } = await SequelizeManager.getInstance();
      const animal = await Animal.findByPk(animalId);
      if (!animal) {
        res.status(404).send("the animal does not exist").end();
        return;
      }
      AnimalHealthBook.findAll({ where: { animalId } });
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  }
}

export default new AnimalsHealsBookController();
