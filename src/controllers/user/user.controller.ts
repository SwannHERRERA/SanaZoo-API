import * as yup from "yup";
import { SequelizeManager } from "../../utils/db";
import { StatusCode } from "../../utils/statusCode";
import { Response, Request } from "express";
import { IUser_Creation_Props, IUser_Instance } from "../../models";
import { Controller } from "../../core/controller";

export class UserController extends Controller {
  schema = yup.object().shape({
    lastName: yup.string().required(),
    firstName: yup.string().required(),
    email: yup.string().email().required(),
    birthdate: yup.date(),
    userRoleId: yup.number().required(),
  });

  private async findOne(id: number): Promise<IUser_Instance | StatusCode> {
    try {
      const { User } = await SequelizeManager.getInstance();
      const user = await User.findByPk(id);
      if (!user) {
        return StatusCode.NOT_FOUND;
      }
      return user;
    } catch (err) {
      return StatusCode.SERVER_ERROR;
    }
  }

  async me() {
    throw new Error("Not implemented !");
    // get user By cookie
  }
  getOne = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const find = await this.findOne(id);
    if (typeof find === "number") {
      res.status(find).end();
      return;
    }
    res.json(find).end();
  };

  private insert = async (
    user: IUser_Creation_Props,
    res: Response
  ): Promise<void> => {
    try {
      const { User } = await SequelizeManager.getInstance();
      const userCreate = await User.create(user);
      res.json(userCreate).status(StatusCode.CREATED).end();
    } catch (err) {
      console.error(err);
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const user = req.body;
    const isValid = await this.validate(user, res);
    if (isValid === false) return;
    this.insert(user, res);
  };

  async register() {
    throw new Error("Not implemented !");
    // create user (the user way)
  }

  async login() {
    throw new Error("Not implemented !");
    // login user
  }

  async logout() {
    throw new Error("Not implemented !");
    // logout user
  }

  async changePassword() {
    throw new Error("Not implemented !");
    // change password of a user
  }

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const newUser = req.body;
      const isValid = await this.validate(newUser, res);
      if (isValid === false) return;
      const { User } = await SequelizeManager.getInstance();
      const user = await User.findByPk(id);
      if (user === null) {
        res.status(StatusCode.NOT_FOUND).end();
        return;
      }
      const userUpdated = await user.update(newUser);
      res.json(userUpdated);
    } catch (err) {
      console.error(err);
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };

  async deleteOne(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const { User } = await SequelizeManager.getInstance();
      const isDestroyed = await User.destroy({ where: { id } });
      if (isDestroyed) {
        res.status(StatusCode.DELETED).end();
      } else {
        res.status(StatusCode.NOT_FOUND).end();
      }
    } catch (err) {
      res.status(StatusCode.SERVER_ERROR).end();
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { User } = await SequelizeManager.getInstance();
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      res.status(StatusCode.SERVER_ERROR).end();
    }
  }
}
export default new UserController();
