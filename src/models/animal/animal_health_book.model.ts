import {
  ModelCtor,
  Optional,
  Sequelize,
  Model,
  DataTypes,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
} from "sequelize";
import { IAnimal_Instance } from "..";
import { IUser_Instance } from "..";

export interface IAnimal_Health_Book_Props {
  id: number;
  description: string;
  date: string;
  animalId: string;
  userId: string;
}

export interface IAnimal_Health_Book_Creation_Props
  extends Optional<IAnimal_Health_Book_Props, "id"> {}

export interface IAnimal_Health_Book_Instance
  extends Model<IAnimal_Health_Book_Props, IAnimal_Health_Book_Creation_Props>,
    IAnimal_Health_Book_Props {
  setAnimal: BelongsToSetAssociationMixin<IAnimal_Instance, "id">;
  getAnimal: BelongsToGetAssociationMixin<IAnimal_Instance>;
  setUser: BelongsToSetAssociationMixin<IUser_Instance, "id">;
  getUser: BelongsToGetAssociationMixin<IUser_Instance>;
}

export function animalHealthBookCreator(
  sequelize: Sequelize
): ModelCtor<IAnimal_Health_Book_Instance> {
  return sequelize.define<IAnimal_Health_Book_Instance>(
    "Animal_Health_Book",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATE,
      },
      animalId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "Animal",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "User",
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
