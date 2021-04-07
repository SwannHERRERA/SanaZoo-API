import { Request, Response } from "express";
import { SequelizeManager } from "../utils/db";
import * as yup from "yup";

export class AnimalsController {
  animalSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string(),
    birthdate: yup.date().required(),
    image: yup.string(),
    specie_id: yup.number().required(),
    enclosure_id: yup.number().required(),
  });

  async getOneById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const { Animal } = await SequelizeManager.getInstance();
      const animal = await Animal.findOne({ where: { id } });
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
    const isValid = await this.animalSchema.isValid(animalPost);
    if (isValid === false) {
      res.status(400).end();
      return;
    }
    try {
      const { Animal } = await SequelizeManager.getInstance();
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
    const isValid = await this.animalSchema.isValid(animalPost);
    if (isValid === false) {
      res.status(400).end();
      return;
    }
    try {
      const { Animal } = await SequelizeManager.getInstance();
      const [idUpdate] = await Animal.update(animalPost, { where: { id } });
      if (idUpdate === 0) {
        throw new Error("update fail");
      }
      res.json(animalPost);
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
      res.json(isDestroyed);
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  }
}

export default new AnimalsController();
