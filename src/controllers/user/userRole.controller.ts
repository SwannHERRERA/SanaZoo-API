import { Request, Response } from "express";
import * as yup from "yup";
import { IUser_Role_Instance } from "../../models";
import { SequelizeManager } from "../../utils/db";
import { ErrorCode } from "../../utils/errorCode";
export class UserRoleController {
  userRoleScheme = yup.object().shape({
    name: yup.string().required(),
  });
  async validate(role: unknown, res: Response): Promise<boolean> {
    return this.userRoleScheme
      .validate(role)
      .then(() => true)
      .catch((err) => {
        res.status(ErrorCode.BAD_REQUEST).json(err.message).end();
        return false;
      });
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const { UserRole } = await SequelizeManager.getInstance();
      const roles = await UserRole.findAll();
      res.json(roles);
    } catch (err) {
      res.status(ErrorCode.SERVER_ERROR).end();
    }
  }

  private async findOne(id: number): Promise<IUser_Role_Instance | ErrorCode> {
    try {
      const { UserRole } = await SequelizeManager.getInstance();
      const user = await UserRole.findByPk(id);
      if (!user) {
        return ErrorCode.NOT_FOUND;
      }
      return user;
    } catch (err) {
      return ErrorCode.SERVER_ERROR;
    }
  }

  getOne = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const find = await this.findOne(id);
    if (typeof find === "number") {
      res.status(find).end();
      return;
    }
    res.json(find).end();
    // get user By params.io
  };
  create = async (req: Request, res: Response): Promise<void> => {
    const role = req.body;
    const isValid = await this.validate(role, res);
    if (isValid === false) return;
    try {
      const { UserRole } = await SequelizeManager.getInstance();
      const userRoleCreate = await UserRole.create(role);
      res.json(userRoleCreate).status(ErrorCode.CREATED).end();
    } catch (err) {
      console.error(err);
      res.status(ErrorCode.SERVER_ERROR).end();
    }
  };
  update = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    const newRole = req.body;
    const isValid = await this.validate(newRole, res);
    if (isValid === false) return;
    try {
      const { UserRole } = await SequelizeManager.getInstance();
      const role = await UserRole.findByPk(id);
      if (role === null) {
        res.status(ErrorCode.NOT_FOUND).end();
        return;
      }
      const roleUpdated = await role.update(newRole);
      res.json(roleUpdated);
    } catch (err) {
      console.error(err);
      res.status(ErrorCode.SERVER_ERROR).end();
    }
  };
  async deleteOne(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    try {
      const { User, UserRole } = await SequelizeManager.getInstance();
      const user = await User.findOne({ where: { userRoleId: id } });
      if (user !== null) {
        res
          .status(ErrorCode.CONFLICT)
          .json({ message: "this role has user you can't remove it" })
          .end();
        return;
      }
      const isDestroyed = await UserRole.destroy({ where: { id } });
      if (isDestroyed) {
        res.status(ErrorCode.DELETED).end();
      } else {
        res.status(ErrorCode.NOT_FOUND).end();
      }
    } catch (err) {
      res.status(ErrorCode.SERVER_ERROR).end();
    }
  }
  async affectUser(req: Request, res: Response): Promise<void> {
    const userId = Number(req.params.userId);
    const roleId = Number(req.params.id);
    try {
      const { User, UserRole } = await SequelizeManager.getInstance();
      const user = await User.findByPk(userId);
      const role = await UserRole.findByPk(roleId);
      if (user === null || role === null) {
        res.status(ErrorCode.BAD_REQUEST).end();
        return;
      }
      user.userRoleId = role.id;
      await user.save();
      const updatedUser = await User.findByPk(user.id);
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(ErrorCode.SERVER_ERROR).end();
    }
  }
}

export default new UserRoleController();
