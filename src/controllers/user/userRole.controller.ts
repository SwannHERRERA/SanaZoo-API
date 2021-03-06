import { Request, Response } from "express";
import * as yup from "yup";
import { Controller } from "../../core/controller";
import { IUser_Role_Instance } from "../../models";
import { SequelizeManager } from "../../utils/db";
import { StatusCode } from "../../utils/statusCode";
export class UserRoleController extends Controller {
  schema = yup.object().shape({
    name: yup.string().max(50).required(),
  });

  public getAll = async (req: Request, res: Response): Promise<void> => {
    const limit = Number(req.query.limit) || 2000;
    const offset = Number(req.query.offset) || 0;
    try {
      const { UserRole } = await SequelizeManager.getInstance();
      const roles = await UserRole.findAll({ limit, offset });
      res.json(roles);
    } catch (err) {
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };

  private findOne = async (
    id: number
  ): Promise<IUser_Role_Instance | StatusCode> => {
    try {
      const { UserRole } = await SequelizeManager.getInstance();
      const user = await UserRole.findByPk(id);
      if (!user) {
        return StatusCode.NOT_FOUND;
      }
      return user;
    } catch (err) {
      return StatusCode.SERVER_ERROR;
    }
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

  public create = async (req: Request, res: Response): Promise<void> => {
    const role = req.body;
    const isValid = await this.validate(role, res);
    if (isValid === false) return;
    try {
      const { UserRole } = await SequelizeManager.getInstance();
      const userRoleCreate = await UserRole.create(role);
      res.json(userRoleCreate).status(StatusCode.CREATED).end();
    } catch (err) {
      console.error(err);
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const newRole = req.body;
      const { UserRole } = await SequelizeManager.getInstance();
      const previousRole = await UserRole.findByPk(id);
      if (previousRole === null) {
        res.status(StatusCode.NOT_FOUND).end();
        return;
      }
      const isValid = await this.validate(newRole, res);
      if (isValid === false) return;

      const roleUpdated = await previousRole.update(newRole);
      res.json(roleUpdated);
    } catch (err) {
      console.error(err);
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };

  public deleteOne = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    try {
      const { User, UserRole } = await SequelizeManager.getInstance();
      const user = await User.findOne({ where: { userRoleId: id } });
      if (user !== null) {
        res
          .status(StatusCode.CONFLICT)
          .json({ message: "this role has user you can't remove it" })
          .end();
        return;
      }
      const isDestroyed = await UserRole.destroy({ where: { id } });
      if (isDestroyed) {
        res.status(StatusCode.DELETED).end();
      } else {
        res.status(StatusCode.NOT_FOUND).end();
      }
    } catch (err) {
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };

  public affectUser = async (req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.userId);
    const roleId = Number(req.params.id);
    try {
      const { User, UserRole } = await SequelizeManager.getInstance();
      const user = await User.findByPk(userId);
      const role = await UserRole.findByPk(roleId);
      if (user === null || role === null) {
        res.status(StatusCode.BAD_REQUEST).end();
        return;
      }
      user.userRoleId = role.id;
      await user.save();
      const updatedUser = await User.findByPk(user.id);
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(StatusCode.SERVER_ERROR).end();
    }
  };
}

export default new UserRoleController();
