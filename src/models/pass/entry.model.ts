import { DataTypes, Model, ModelCtor, Sequelize } from "sequelize";

export interface IEntry_Props {
  id: number;
}

export interface Entry_Instance extends Model<IEntry_Props>, IEntry_Props {}

const initEntry = (sequelize: Sequelize): ModelCtor<Entry_Instance> => {
  return sequelize.define<Entry_Instance>(
    "Entry",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
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

export default initEntry;
