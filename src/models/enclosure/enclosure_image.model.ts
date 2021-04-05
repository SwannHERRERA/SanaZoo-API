import {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  Model,
  ModelCtor,
  Optional,
  Sequelize,
} from "sequelize";
import { IEnclosure_Instance } from "./enclosure.model";

export interface IEnclosure_image_Props {
  id: number;
  title: string;
  path: string;
}

export interface IEnclosure_image_creation_props
  extends Optional<IEnclosure_image_Props, "id"> {}

export interface IEnclosure_image_Instance
  extends Model<IEnclosure_image_Props, IEnclosure_image_creation_props>,
    IEnclosure_image_Props {
  setEnclosure: BelongsToSetAssociationMixin<IEnclosure_Instance, "id">;
  getEnclosure: BelongsToGetAssociationMixin<IEnclosure_Instance>;
}

const initEnclosureImage = (
  sequelize: Sequelize
): ModelCtor<IEnclosure_image_Instance> => {
  return sequelize.define<IEnclosure_image_Instance>(
    "Enclosure_Image",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      path: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      paranoid: true,
      timestamps: true,
    }
  );
};

export default initEnclosureImage;
