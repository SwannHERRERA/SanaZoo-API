import {IEnclosure_Instance} from "..";
import {Pass_Instance} from "..";
import { DataTypes, Model, ModelCtor, Sequelize, BelongsToSetAssociationMixin, BelongsToGetAssociationMixin } from "sequelize/types";

export interface IEntry_Props {
    id: number;
}

export interface IEntry_Instance extends Model<IEntry_Props>, IEntry_Props {
  setPass: BelongsToSetAssociationMixin<Pass_Instance, "id">;
  getPass: BelongsToGetAssociationMixin<Pass_Instance>;
  setEnclosure: BelongsToSetAssociationMixin<IEnclosure_Instance, "id">;
  getEnclosure: BelongsToGetAssociationMixin<IEnclosure_Instance>;
}

export function entryCreator(sequelize: Sequelize): ModelCtor<IEntry_Instance> {
    return sequelize.define<IEntry_Instance>(
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
        });
}