import {
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
  Model,
  ModelCtor,
  Optional,
  Sequelize,
} from "sequelize";
import { IPass_Instance } from "./pass.model";
import { IPass_Night_Availability_Instance } from "./pass_night_availability.model";

export interface IPass_Type_Props {
  id: number;
  name: string;
  price: number;
}

export type IPass_Type_Creation_Props = Optional<IPass_Type_Props, "id">;

export interface IPass_Type_Instance
  extends Model<IPass_Type_Props, IPass_Type_Creation_Props>,
    IPass_Type_Props {
  getPassList: HasManyGetAssociationsMixin<IPass_Instance>;
  addPass: HasManyAddAssociationMixin<IPass_Instance, "id">;

  getPassNightList: HasManyGetAssociationsMixin<IPass_Night_Availability_Instance>;
  addPassNight: HasManyAddAssociationMixin<
    IPass_Night_Availability_Instance,
    "id"
  >;
}

export function passTypeCreator(
  sequelize: Sequelize
): ModelCtor<IPass_Type_Instance> {
  return sequelize.define<IPass_Type_Instance>(
    "Pass_Type",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      price: {
        type: DataTypes.REAL,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: true,
    }
  );
}

export enum PassType {
  DAY = 1,
  WEEKEND = 2,
  ANNUAL = 3,
  ONEDAYMONTH = 4,
  ESCAPE_GAME = 5,
  NIGHT = 6,
}
