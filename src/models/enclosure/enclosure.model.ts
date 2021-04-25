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
import { IEnclosure_Image_Instance } from "./enclosure_image.model";
import { IEnclosure_Type_Instance } from "./enclosure_type.model";
import { IAnimal_Instance, IEnclosure_Service_Book_Instance } from "..";
import { IEntry_Instance } from "..";
import { IPass_Enclosure_Access_Instance } from "..";

export interface IEnclosure_Props {
  id: number;
  name: string;
  capacity: number;
  description: string;
  openHour: string;
  closeHour: string;
  visitDuration: number;
  handicapAccess: boolean;
  maintenance: boolean;
  enclosureTypeId: number;
}

export type IEnclosure_Creation_Props = Optional<IEnclosure_Props, "id">;

export interface IEnclosure_Instance
  extends Model<IEnclosure_Props, IEnclosure_Creation_Props>,
    IEnclosure_Props {
  getEntryList: HasManyGetAssociationsMixin<IEntry_Instance>;
  addEntry: HasManyAddAssociationMixin<IEntry_Instance, "id">;

  getPassEnclosureAccessList: HasManyGetAssociationsMixin<IPass_Enclosure_Access_Instance>;
  addPassEnclosureAccess: HasManyAddAssociationMixin<
    IPass_Enclosure_Access_Instance,
    "id"
  >;

  setEnclosureType: BelongsToSetAssociationMixin<
    IEnclosure_Type_Instance,
    "id"
  >;
  getEnclosureType: BelongsToGetAssociationMixin<IEnclosure_Type_Instance>;

  getEnclosureServiceBookList: HasManyGetAssociationsMixin<IEnclosure_Service_Book_Instance>;
  addEnclosureServiceBook: HasManyAddAssociationMixin<
    IEnclosure_Service_Book_Instance,
    "id"
  >;

  getAnimalList: HasManyGetAssociationsMixin<IAnimal_Instance>;
  addAnimal: HasManyAddAssociationMixin<IAnimal_Instance, "id">;

  getEnclosureImageList: HasManyGetAssociationsMixin<IEnclosure_Image_Instance>;
  addEnclosureImage: HasManyAddAssociationMixin<
    IEnclosure_Image_Instance,
    "id"
  >;
}

export function enclosureCreator(
  sequelize: Sequelize
): ModelCtor<IEnclosure_Instance> {
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
      visitDuration: {
        type: DataTypes.INTEGER,
      },
      handicapAccess: {
        type: DataTypes.BOOLEAN,
      },
      maintenance: {
        type: DataTypes.BOOLEAN,
      },
      openHour: {
        type: DataTypes.STRING,
      },
      closeHour: {
        type: DataTypes.STRING,
      },
      enclosureTypeId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "Enclosure_Type",
          key: "id",
        },
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: true,
    }
  );
}
