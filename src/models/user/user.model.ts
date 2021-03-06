import {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  Model,
  ModelCtor,
  Optional,
  Sequelize,
} from "sequelize";
import {
  IAnimal_Health_Book_Instance,
  IEmployee_Planning_Instance,
  IEnclosure_Service_Book_Instance,
  IPass_Instance,
} from "..";
import { ISession_Instance } from "./session.model";
import { IUser_Role_Instance } from "./user_role.model";

export interface IUser_Props {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthdate: string;
  password: string;
  userRoleId: number;
}

export type IUser_Creation_Props = Optional<IUser_Props, "id">;

export interface IUser_Instance
  extends Model<IUser_Props, IUser_Creation_Props>,
    IUser_Props {
  getPassList: HasManyGetAssociationsMixin<IPass_Instance>;
  addPass: HasManyAddAssociationMixin<IPass_Instance, "id">;

  getAnimalHealthBookList: HasManyGetAssociationsMixin<IAnimal_Health_Book_Instance>;
  addAnimalHealthBook: HasManyAddAssociationMixin<
    IAnimal_Health_Book_Instance,
    "id"
  >;

  getEnclosureServiceBookList: HasManyGetAssociationsMixin<IEnclosure_Service_Book_Instance>;
  addEnclosureServiceBook: HasManyAddAssociationMixin<
    IEnclosure_Service_Book_Instance,
    "id"
  >;

  getEmployeePlanningList: HasManyGetAssociationsMixin<IEmployee_Planning_Instance>;
  addEmployeePlanning: HasManyAddAssociationMixin<
    IEmployee_Planning_Instance,
    "id"
  >;

  getSessionList: HasManyGetAssociationsMixin<ISession_Instance>;
  addSession: HasManyAddAssociationMixin<ISession_Instance, "id">;

  getUserRole: BelongsToGetAssociationMixin<IUser_Role_Instance>;
  setUserRole: BelongsToSetAssociationMixin<IUser_Role_Instance, "id">;
}

export function userCreator(sequelize: Sequelize): ModelCtor<IUser_Instance> {
  return sequelize.define<IUser_Instance>(
    "User",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      birthdate: {
        type: DataTypes.DATE,
      },
      password: {
        type: DataTypes.STRING,
      },
      userRoleId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "UserRole",
          key: "id",
        },
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
