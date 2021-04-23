import { Request, Response } from "express";
import { SequelizeManager } from "../../utils/db";
import * as yup from "yup";
import { ModelCtor } from "sequelize/types";
import { IAnimal_Instance, IUser_Instance } from "../../models";
import { StatusCode } from "../../utils/statusCode";
import { Controller } from "../../core/controller";

export class AnimalsHealsBookController extends Controller {
  schema = yup.object().shape({
    description: yup.string().required(),
    date: yup.date().required(),
    animalId: yup.number().required(),
    userId: yup.number().required(),
  });

  public getOneById = async (req: Request, res: Response): Promise<void> => {
    try {
      const healsId = Number(req.params.id);
      const { AnimalHealthBook } = await SequelizeManager.getInstance();
      const healsBook = await AnimalHealthBook.findByPk(healsId);
      if (healsBook === null) {
        res.status(StatusCode.NOT_FOUND).end();
        return;
      }
      res.json(healsBook);
    } catch (err) {
      console.error(err);
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };
  public getAll = async (req: Request, res: Response): Promise<void> => {
    const limit = Number(req.query.limit) || 2000;
    const offset = Number(req.query.offset) || 0;
    try {
      const { AnimalHealthBook } = await SequelizeManager.getInstance();
      const healsBooks = await AnimalHealthBook.findAll({ limit, offset });
      res.json(healsBooks);
    } catch (err) {
      console.error(err);
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };

  private async checkFKError(
    res: Response,
    Animal: ModelCtor<IAnimal_Instance>,
    User: ModelCtor<IUser_Instance>,
    userId: number,
    animalId: number
  ): Promise<boolean> {
    const user = await User.findByPk(userId);
    const animal = await Animal.findByPk(animalId);
    if (!user) {
      res.status(StatusCode.NOT_FOUND).send("the user does not exist").end();
    }
    if (!animal) {
      res.status(StatusCode.NOT_FOUND).send("the animal does not exist").end();
    }
    if (!animal || !user) {
      return false;
    }
    return true;
  }

  public create = async (req: Request, res: Response): Promise<void> => {
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
      res.json(healsBookCreate).status(StatusCode.CREATED);
    } catch (err) {
      console.error(err);
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };

  public updateOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        AnimalHealthBook,
        Animal,
        User,
      } = await SequelizeManager.getInstance();
      const healsId = Number(req.params.id);
      const previousHealthBook = await AnimalHealthBook.findByPk(healsId);
      if (previousHealthBook === null) {
        res.status(StatusCode.NOT_FOUND).end();
        return;
      }
      const healthEntry = req.body;
      healthEntry.date = healthEntry.date || previousHealthBook.date;
      healthEntry.description =
        healthEntry.description || previousHealthBook.description;
      healthEntry.userId = healthEntry.userId || previousHealthBook.userId;
      healthEntry.animalId =
        healthEntry.animalId || previousHealthBook.animalId;

      const isValid = await this.validate(healthEntry, res);
      if (isValid === false) {
        return;
      }
      const isUpadatable = await this.checkFKError(
        res,
        Animal,
        User,
        healthEntry.userId,
        healthEntry.animalId
      );
      if (isUpadatable === false) {
        res.send(StatusCode.NOT_FOUND).end();
        return;
      }
      const animalHealsBookUpdated = await previousHealthBook.update(
        healthEntry
      );

      res.json(animalHealsBookUpdated);
    } catch (err) {
      console.error(err);
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };

  public deleteOne = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    try {
      const { AnimalHealthBook } = await SequelizeManager.getInstance();
      const isDestroyed = await AnimalHealthBook.destroy({ where: { id } });
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

  public getAllByAnimal = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const limit = Number(req.query.limit) || 2000;
    const offset = Number(req.query.offset) || 0;
    const animalId = Number(req.params.animalId);
    try {
      const { AnimalHealthBook, Animal } = await SequelizeManager.getInstance();
      const animal = await Animal.findByPk(animalId);
      if (!animal) {
        res
          .status(StatusCode.NOT_FOUND)
          .send("the animal does not exist")
          .end();
        return;
      }
      const healthBook = await AnimalHealthBook.findAll({
        where: { animalId },
        limit,
        offset,
      });
      res.json(healthBook);
    } catch (err) {
      console.error(err);
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };
}

export default new AnimalsHealsBookController();
