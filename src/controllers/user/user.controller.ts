import * as yup from "yup";
import { SequelizeManager } from "../../utils/db";
import { StatusCode } from "../../utils/statusCode";
import { Response, Request } from "express";
import {
  ISession_Instance,
  IUser_Creation_Props,
  IUser_Instance,
} from "../../models";
import { Controller } from "../../core/controller";
import { verify, hash } from "argon2";
import { addDays } from "date-fns";
import { AnyObject } from "yup/lib/object";
import { getToken } from "../../utils/tokenHelper";

const PASSWORD_MIN_LENGTH = 6;
export class UserController extends Controller {
  schema: yup.ObjectSchema<AnyObject> | null = null;
  registerSchema = yup.object().shape({
    lastName: yup.string().max(120).required(),
    firstName: yup.string().max(120).required(),
    email: yup.string().email().required(),
    password: yup.string().min(PASSWORD_MIN_LENGTH).required(),
    birthdate: yup.date(),
  });
  creationSchema = yup.object().shape({
    lastName: yup.string().max(120).required(),
    firstName: yup.string().max(120).required(),
    email: yup.string().email().required(),
    password: yup.string().min(PASSWORD_MIN_LENGTH).required(),
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

  public me = async (req: Request, res: Response): Promise<void> => {
    const authorization = req.headers.authorization;
    if (!authorization) {
      res.status(StatusCode.UNAUTHORIZED).end();
      return;
    }
    const { User, Session } = await SequelizeManager.getInstance();

    const token = getToken(authorization);
    const session = await Session.findOne({ where: { token } });
    if (!session) {
      res.status(StatusCode.UNAUTHORIZED).end();
      return;
    }
    const user = await User.findByPk(session.userId, {
      attributes: ["firstName", "lastName", "email", "birthdate", "createdAt"],
    });
    if (!user) {
      res.status(StatusCode.BAD_REQUEST).end();
    }
    res.json(user).end();
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
      user.password = await hash(user.password);
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
    this.schema = this.creationSchema;
    const isValid = await this.validate(user, res);
    if (isValid === false) return;
    this.insert(user, res);
  };

  public register = async (req: Request, res: Response): Promise<void> => {
    const newUser = req.body;
    this.schema = this.registerSchema;
    const { UserRole } = await SequelizeManager.getInstance();
    const clientRole = await UserRole.findOne({ where: { name: "CLIENT" } });
    if (clientRole === null) {
      res.status(StatusCode.SERVER_ERROR).end();
      return;
    }
    newUser.userRoleId = clientRole.id;
    const isValid = await this.validate(newUser, res);
    if (isValid === false) return;
    this.insert(newUser, res);
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const isValidRequest = await this.loginValidationRequest(
      email,
      password,
      res
    );

    if (isValidRequest === false) return;

    const { User } = await SequelizeManager.getInstance();
    const user = await User.findOne({ where: { email } });

    const isValidUser = await this.loginUserValidation(user, password, res);
    if (isValidUser === false) return;

    if (user) {
      const session = await this.createSession(user);
      res.json(session).end();
      return;
    }
    res.status(StatusCode.SERVER_ERROR).end();
  };

  private async loginUserValidation(
    user: IUser_Instance | null,
    password: string,
    res: Response
  ): Promise<boolean> {
    if (user === null) {
      res.status(StatusCode.BAD_REQUEST).send("incorrect information").end();
      return false;
    }
    const isPasswordCorrect = await verify(user.password, password);
    if (isPasswordCorrect === false) {
      res.status(StatusCode.BAD_REQUEST).send("incorrect information").end();
      return false;
    }
    return true;
  }

  private async loginValidationRequest(
    email: unknown,
    password: unknown,
    res: Response
  ): Promise<boolean> {
    const loginSchema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().min(PASSWORD_MIN_LENGTH).required(),
    });

    return await loginSchema
      .validate({ email, password })
      .then(() => true)
      .catch((err) => {
        res.status(StatusCode.BAD_REQUEST).json(err.message).end();
        return false;
      });
  }

  private async createSession(
    user: IUser_Instance
  ): Promise<ISession_Instance> {
    const { Session } = await SequelizeManager.getInstance();
    const DURATION_OF_THE_SESSION_IN_DAYS = 1;
    const now = Date.now();
    const token = await hash(now.toString() + user.email);
    const expireDate = addDays(now, DURATION_OF_THE_SESSION_IN_DAYS);
    return await Session.create({
      token,
      expireDate,
      userId: user.id,
    });
  }

  public logout = async (req: Request, res: Response): Promise<void> => {
    const authorization = req.headers.authorization;
    if (!authorization) {
      res.status(StatusCode.UNAUTHORIZED).end();
      return;
    }
    const token = getToken(authorization);
    const { Session } = await SequelizeManager.getInstance();
    Session.destroy({ where: { token } });
    res.status(StatusCode.DELETED).end();
  };

  public changePassword = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const changePasswordSchema = yup.object().shape({
      actualPassword: yup.string().required(),
      newPassword: yup.string().min(PASSWORD_MIN_LENGTH).required(),
      newPasswordConfirm: yup
        .string()
        .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
    });
    const { actualPassword, newPassword, newPasswordConfirm } = req.body;
    const isValid = await changePasswordSchema.validate({
      actualPassword,
      newPassword,
      newPasswordConfirm,
    });

    if (!isValid) return;

    const authorization = req.headers.authorization;
    if (!authorization) {
      res.status(StatusCode.UNAUTHORIZED).end();
      return;
    }
    const { User, Session } = await SequelizeManager.getInstance();

    const token = getToken(authorization);
    const session = await Session.findOne({ where: { token } });
    if (!session) {
      res.status(StatusCode.UNAUTHORIZED).end();
      return;
    }
    const newPasswordHash = await hash(newPassword);
    const user = await User.findByPk(session.userId);
    if (!user) {
      res.status(StatusCode.SERVER_ERROR).end();
      return;
    }
    const isActualPasswordCorrect = await verify(user.password, actualPassword);
    if (isActualPasswordCorrect === false) {
      res
        .status(StatusCode.BAD_REQUEST)
        .json({ message: "Actual password is incorrect" })
        .end();
      return;
    }
    await User.update(
      { password: newPasswordHash },
      { where: { id: user.id } }
    );
    res.json({ message: "Password updated" }).end();
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
