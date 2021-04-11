import * as yup from "yup";
import { SequelizeManager } from "../../utils/db";
import { ErrorCode } from "../../utils/errorCode";
import { Response, Request } from "express";

export class UserController {
  userSchema = yup.object().shape({
    lastName: yup.string().required(),
    firstName: yup.string().required(),
    email: yup.string().email().required(),
    birthdate: yup.date(),
    userRole: yup.number(),
  });

  async me() {
    throw new Error("Not implemented !");
    // get user By cookie
  }
  async getOne() {
    throw new Error("Not implemented !");
    // get user By params.io
  }
  async create() {
    throw new Error("Not implemented !");
    // create user (the admin way)
  }
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
  async update() {
    throw new Error("Not implemented !");
    // update user
  }
  async changePassword() {
    throw new Error("Not implemented !");
    // change password of a user
  }
  async deleteOne() {
    throw new Error("Not implemented !");
    // delete a user
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
