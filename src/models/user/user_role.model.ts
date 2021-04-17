import {
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  Model,
  ModelCtor,
  Optional,
  Sequelize,
} from "sequelize";
import { IUser_Instance } from "./user.model";

export interface IUser_Role_Props {
  id: number;
  name: string;
}

export interface IUser_Role_Creation_Props
  extends Optional<IUser_Role_Props, "id"> {}

export interface IUser_Role_Instance
  extends Model<IUser_Role_Props, IUser_Role_Creation_Props>,
    IUser_Role_Props {
  getUserList: HasManyGetAssociationsMixin<IUser_Instance>;
  addUser: HasManyAddAssociationMixin<IUser_Instance, "id">;
}

export function userRoleCreator(
  sequelize: Sequelize
): ModelCtor<IUser_Role_Instance> {
  return sequelize.define<IUser_Role_Instance>(
    "User_Role",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      paranoid: true,
      timestamps: true,
    }
  );
}
