import * as yup from "yup";
import { SequelizeManager } from "../../utils/db";
import { ErrorCode } from "../../utils/errorCode";
import { Response, Request } from "express";
import { IUser_Creation_Props, IUser_Instance } from "../../models";

export class UserController {
  userSchema = yup.object().shape({
    lastName: yup.string().required(),
    firstName: yup.string().required(),
    email: yup.string().email().required(),
    birthdate: yup.date(),
    userRoleId: yup.number().required(),
  });

  async validate(user: unknown, res: Response): Promise<boolean> {
    return this.userSchema
      .validate(user)
      .then(() => true)
      .catch((err) => {
        res.status(ErrorCode.BAD_REQUEST).json(err.message).end();
        return false;
      });
  }

  private async findOne(id: number): Promise<IUser_Instance | ErrorCode> {
    try {
      const { User } = await SequelizeManager.getInstance();
      const user = await User.findByPk(id);
      if (!user) {
        return ErrorCode.NOT_FOUND;
      }
      return user;
    } catch (err) {
      return ErrorCode.SERVER_ERROR;
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
      res.json(userCreate).status(ErrorCode.CREATED).end();
    } catch (err) {
      console.error(err);
      res.status(ErrorCode.SERVER_ERROR).end();
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
        res.status(ErrorCode.NOT_FOUND).end();
        return;
      }
      const userUpdated = await user.update(newUser);
      res.json(userUpdated);
    } catch (err) {
      console.error(err);
      res.status(ErrorCode.SERVER_ERROR).end();
    }
  };

  async deleteOne(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      const { User } = await SequelizeManager.getInstance();
      const isDestroyed = await User.destroy({ where: { id } });
      if (isDestroyed) {
        res.status(ErrorCode.DELETED).end();
      } else {
        res.status(ErrorCode.NOT_FOUND).end();
      }
    } catch (err) {
      res.status(ErrorCode.SERVER_ERROR).end();
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { User } = await SequelizeManager.getInstance();
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      res.status(ErrorCode.SERVER_ERROR).end();
    }
  }
}
export default new UserController();
