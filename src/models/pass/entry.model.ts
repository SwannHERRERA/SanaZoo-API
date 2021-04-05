import { DataTypes, Model, ModelCtor, Sequelize, BelongsToSetAssociationMixin, BelongsToGetAssociationMixin } from "sequelize/types";
import {IEnclosure_Instance} from "..";
import {Pass_Instance} from "..";

export interface IEntry_Props {
  id: number;
}

export interface Entry_Instance extends Model<IEntry_Props>, IEntry_Props {
  setPass: BelongsToSetAssociationMixin<Pass_Instance, "id">;
  getPass: BelongsToGetAssociationMixin<Pass_Instance>;
  setEnclosure: BelongsToSetAssociationMixin<IEnclosure_Instance, "id">;
  getEnclosure: BelongsToGetAssociationMixin<IEnclosure_Instance>;
}

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
