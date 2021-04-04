import { Sequelize, Optional, Model, DataTypes, ModelCtor } from "sequelize";

export interface Enclosure_Service_Props {
  id: number;
  date: Date;
  description: string;
}

export interface Enclosure_Service_Creation_Props
  extends Optional<Enclosure_Service_Props, "id"> {}

export interface Enclosure_Service_Instance
  extends Model<Enclosure_Service_Props, Enclosure_Service_Creation_Props>,
    Enclosure_Service_Props {}

export default function (
  sequelize: Sequelize
): ModelCtor<Enclosure_Service_Instance> {
  return sequelize.define<Enclosure_Service_Instance>(
    "Enclosure_Service",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.DATE,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
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
