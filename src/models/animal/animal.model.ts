import {
  ModelCtor,
  Optional,
  Sequelize,
  Model,
  DataTypes,
  BelongsToSetAssociationMixin,
  BelongsToGetAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationsMixin,
} from "sequelize";
import { IEnclosure_Instance } from "../enclosure/enclosure.model";
import { ISpecie_Instance } from "./specie.model";
import { IAnimal_Health_Book_Instance } from "./animal_health_book.model";

export interface IAnimal_Props {
  id: number;
  name: string;
  description: string;
  birthdate: string;
  image: string;
  specieId: number;
  enclosureId: number;
}

export type IAnimal_Creation_Props = Optional<IAnimal_Props, "id">;

export interface IAnimal_Instance
  extends Model<IAnimal_Props, IAnimal_Creation_Props>,
    IAnimal_Props {
  setSpecie: BelongsToSetAssociationMixin<ISpecie_Instance, "id">;
  getSpecie: BelongsToGetAssociationMixin<ISpecie_Instance>;
  setEnclosure: BelongsToSetAssociationMixin<IEnclosure_Instance, "id">;
  getEnclosure: BelongsToGetAssociationMixin<IEnclosure_Instance>;
  getAnimalHealthBookList: HasManyGetAssociationsMixin<IAnimal_Health_Book_Instance>;
  addAnimalHealthBookList: HasManyAddAssociationsMixin<
    IAnimal_Health_Book_Instance,
    "id"
  >;
}

export function animalCreator(
  sequelize: Sequelize
): ModelCtor<IAnimal_Instance> {
  return sequelize.define<IAnimal_Instance>(
    "Animal",
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
      birthdate: {
        type: DataTypes.DATE,
      },
      image: {
        type: DataTypes.STRING,
      },
      specieId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "Specie",
          key: "id",
        },
      },
      enclosureId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "Enclosure",
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
