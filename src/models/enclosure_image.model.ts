import {
  DataTypes,
  Model,
  ModelCtor,
  Optional,
  Sequelize,
} from "sequelize/types";

export interface IEnclosure_image_Props {
  id: number;
  title: string;
  path: string;
}

export interface IEnclosure_image_creation_props
  extends Optional<IEnclosure_image_Props, "id"> {}

export interface Enclosure_image_instance
  extends Model<IEnclosure_image_Props, IEnclosure_image_creation_props>,
    IEnclosure_image_Props {}

const initEnclosureImage = (
  sequelize: Sequelize
): ModelCtor<Enclosure_image_instance> => {
  return sequelize.define<Enclosure_image_instance>(
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
