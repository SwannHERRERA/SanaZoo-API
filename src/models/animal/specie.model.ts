import {
  ModelCtor,
  Optional,
  Sequelize,
  Model,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyGetAssociationsMixin,
} from "sequelize";
import { IAnimal_Instance } from "./animal.model";

export interface ISpecie_Props {
  id: number;
  name: string;
  origin: string;
  description: string;
}

export interface ISpecie_Creation_Props extends Optional<ISpecie_Props, "id"> {
}

export interface ISpecie_Instance
  extends Model<ISpecie_Props, ISpecie_Creation_Props>,
    ISpecie_Props {
  getAnimalList: HasManyGetAssociationsMixin<IAnimal_Instance>;
  addAnimal: HasManyAddAssociationMixin<IAnimal_Instance, "id">;
}

export function specieCreator(sequelize: Sequelize): ModelCtor<ISpecie_Instance> {
    return sequelize.define<ISpecie_Instance>("Specie", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        origin: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}