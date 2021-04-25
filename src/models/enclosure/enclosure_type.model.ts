import {
  ModelCtor,
  Optional,
  Sequelize,
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
} from "sequelize";
import { IEnclosure_Instance } from "./enclosure.model";

export interface IEnclosure_Type_Props {
  id: number;
  name: string;
}

export type IEnclosure_Type_Creation_Props = Optional<
  IEnclosure_Type_Props,
  "id"
>;

export interface IEnclosure_Type_Instance
  extends Model<IEnclosure_Type_Props, IEnclosure_Type_Creation_Props>,
    IEnclosure_Type_Props {
  getEnclosureList: HasManyGetAssociationsMixin<IEnclosure_Instance>;
  addEnclosure: HasManyAddAssociationMixin<IEnclosure_Instance, "id">;
}

export function enclosureTypeCreator(
  sequelize: Sequelize
): ModelCtor<IEnclosure_Type_Instance> {
  return sequelize.define<IEnclosure_Type_Instance>(
    "Enclosure_Type",
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
      timestamps: true,
    }
  );
}
