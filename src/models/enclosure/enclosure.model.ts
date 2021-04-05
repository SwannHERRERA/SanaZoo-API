import {
  ModelCtor,
  Optional,
  Sequelize,
  Model,
  DataTypes,
  BelongsToSetAssociationMixin,
  BelongsToGetAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
} from "sequelize";
import { IAnimal_Instance } from "../animal/animal.model";
import { IEnclosure_image_Instance as IEnclosure_image_Instance } from "./enclosure_image.model";
import { IEnclosure_Type_Instance } from "./enclosure_type.model";

export interface IEnclosure_Props {
  id: number;
  name: string;
  capacity: number;
  description: string;
  type: number;
  visit_duration: string;
  handicap_access: boolean;
  maintenance: boolean;
}

export interface IEnclosure_Creation_Props
  extends Optional<IEnclosure_Props, "id"> {}

export interface IEnclosure_Instance
  extends Model<IEnclosure_Props, IEnclosure_Creation_Props>,
    IEnclosure_Props {
  setEnclosureType: BelongsToSetAssociationMixin<
    IEnclosure_Type_Instance,
    "id"
  >;
  getEnclosureType: BelongsToGetAssociationMixin<IEnclosure_Type_Instance>;

  getAnimalList: HasManyGetAssociationsMixin<IAnimal_Instance>;
  addAnimal: HasManyAddAssociationMixin<IAnimal_Instance, "id">;

  getEnclosureImageList: HasManyGetAssociationsMixin<IEnclosure_image_Instance>;
  addEnclosureImage: HasManyAddAssociationMixin<
    IEnclosure_image_Instance,
    "id"
  >;
}

export default function (sequelize: Sequelize): ModelCtor<IEnclosure_Instance> {
  return sequelize.define<IEnclosure_Instance>(
    "Enclosure",
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
      description: {
        type: DataTypes.STRING,
      },
      capacity: {
        type: DataTypes.INTEGER,
      },
      type: {
        type: DataTypes.INTEGER,
      },
      visit_duration: {
        type: DataTypes.DATE,
      },
      handicap_access: {
        type: DataTypes.BOOLEAN,
      },
      maintenance: {
        type: DataTypes.BOOLEAN,
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
