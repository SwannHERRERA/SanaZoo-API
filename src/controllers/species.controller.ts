import { Request, Response } from "express";
import { SequelizeManager } from "../utils/db";
import * as yup from "yup";

export class SpeciesController {
  specieSchema = yup.object().shape({
    name: yup.string().required(),
    origin: yup.string().required(),
    description: yup.string(),
  });

  async getOneById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const { Specie } = await SequelizeManager.getInstance();
      const result = await Specie.findOne({ where: { id } });
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const { Specie } = await SequelizeManager.getInstance();
      const result = await Specie.findAll();
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  }

  create = async (req: Request, res: Response) => {
    const speciePost = req.body;
    const isValid = await this.specieSchema.isValid(speciePost);
    if (isValid === false) {
      res.status(400).end();
    }
    try {
      const { Specie } = await SequelizeManager.getInstance();
      const specieCreate = await Specie.create(speciePost);
      res.json(specieCreate).status(201);
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  };

  updateOne = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const speciePost = req.body;
    const isValid = await this.specieSchema.isValid(speciePost);
    if (isValid === false) {
      res.status(400).end();
    }
    try {
      const { Specie } = await SequelizeManager.getInstance();
      const [idUpdate, _] = await Specie.update(speciePost, {
        where: { id },
      });
      if (idUpdate === 0) {
        throw new Error("update fail");
      }
      res.json(speciePost);
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  };
  async deleteOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    try {
      const { Specie } = await SequelizeManager.getInstance();
      const isDestroyed = await Specie.destroy({ where: { id } });
      res.json(isDestroyed);
    } catch (err) {
      console.error(err);
      res.status(500).end();
    }
  }
}

export default new SpeciesController();
