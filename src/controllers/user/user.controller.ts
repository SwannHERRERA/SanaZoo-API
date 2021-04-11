import * as yup from "yup";

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
  async getAll() {
    throw new Error("Not implemented !");
    // get all users
  }
}
export default new UserController();
