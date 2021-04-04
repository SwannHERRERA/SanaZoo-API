import {
  Sequelize,
  Optional,
  Model,
  DataTypes,
  ModelCtor,
  BelongsToSetAssociationMixin,
  BelongsToGetAssociationMixin,
} from "sequelize";
import { IUser_Instance } from "./user.model";

export interface Session_Props {
  id: number;
  token: string;
  expireDate: Date;
}

export interface Session_Creation_Props extends Optional<Session_Props, "id"> {}

export interface Session_Instance
  extends Model<Session_Props, Session_Creation_Props>,
    Session_Props {
  setUser: BelongsToSetAssociationMixin<IUser_Instance, "id">;
  getUser: BelongsToGetAssociationMixin<IUser_Instance>;
}

export default function (sequelize: Sequelize): ModelCtor<Session_Instance> {
  return sequelize.define<Session_Instance>(
    "Session",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: DataTypes.STRING,
        unique: true,
      },
      expireDate: {
        type: DataTypes.DATE,
        allowNull: false,
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
