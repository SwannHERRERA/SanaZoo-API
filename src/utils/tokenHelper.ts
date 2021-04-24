import { IUser_Instance } from "../models";
import { SequelizeManager } from "./db";

export function getToken(bearerToken: string): string {
  const token = bearerToken.split(" ")[1];
  if (token) {
    return token;
  }
  return "";
}

export async function findUserByToken(
  token: string
): Promise<IUser_Instance | null> {
  const { User, Session } = await SequelizeManager.getInstance();
  // TODO take expire date in request
  const session = await Session.findOne({ where: { token } });
  if (session === null) {
    return null;
  }
  const user = await User.findByPk(session.userId);
  return user;
}
