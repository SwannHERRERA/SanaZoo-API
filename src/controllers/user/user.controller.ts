import * as yup from "yup";
import { SequelizeManager } from "../../utils/db";
import { StatusCode } from "../../utils/statusCode";
import { Response, Request } from "express";
import { IUser_Creation_Props, IUser_Instance } from "../../models";
import { Controller } from "../../core/controller";

export class UserController extends Controller {
  schema = yup.object().shape({
    lastName: yup.string().max(120).required(),
    firstName: yup.string().max(120).required(),
    email: yup.string().email().required(),
    birthdate: yup.date(),
    userRoleId: yup.number().required(),
  });

  public findOne = async (id: number): Promise<IUser_Instance | StatusCode> => {
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
  };

  public me = async (): Promise<void> => {
    throw new Error("Not implemented !");
    // get user By cookie
  };
  public getOne = async (req: Request, res: Response): Promise<void> => {
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

  public create = async (req: Request, res: Response): Promise<void> => {
    const user = req.body;
    const isValid = await this.validate(user, res);
    if (isValid === false) return;
    this.insert(user, res);
  };

  public register = async (req: Request, res: Response): Promise<void> => {
    const newUser = req.body;
    const { UserRole } = await SequelizeManager.getInstance();
    const clientRole = await UserRole.findOne({ where: { name: "CLIENT" } });
    if (clientRole === null) {
      res.status(StatusCode.SERVER_ERROR).end();
      return;
    }
    newUser.UserRoleId = clientRole.id;
    const isValid = await this.validate(newUser, res);
    if (isValid === false) return;
    this.insert(newUser, res);
  };

  public login = async (): Promise<never> => {
    throw new Error("Not implemented !");
    // login user
  };

  public logout = async (): Promise<never> => {
    throw new Error("Not implemented !");
    // logout user
  };

  public changePassword = async (): Promise<never> => {
    throw new Error("Not implemented !");
    // change password of a user
  };

  public updateClient = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const newUser = req.body;
      const isValid = await this.validate(newUser, res);
      if (isValid === false) return;
      const { User, UserRole } = await SequelizeManager.getInstance();
      const user = await User.findByPk(id);
      if (user === null) {
        res.status(StatusCode.NOT_FOUND).end();
        return;
      }

      const userRole = await UserRole.findByPk(user?.userRoleId);
      if (userRole === null) {
        res.status(StatusCode.SERVER_ERROR).end();
        return;
      }
      if (userRole.name !== "CLIENT") {
        res.status(StatusCode.FORBIDDEN).end();
        return;
      }
      const userUpdated = await user.update(newUser);
      res.json(userUpdated);
    } catch (err) {
      console.error(err);
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
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

  public deleteOne = async (req: Request, res: Response): Promise<void> => {
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
  };

  public getAll = async (req: Request, res: Response): Promise<void> => {
    const limit = Number(req.query.limit) || 5000;
    const offset = Number(req.query.offset) || 0;
    try {
      const { User } = await SequelizeManager.getInstance();
      const users = await User.findAll({ limit, offset });
      res.json(users);
    } catch (err) {
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };
}
export default new UserController();
