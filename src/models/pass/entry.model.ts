import {DataTypes, Model, ModelCtor, Sequelize} from "sequelize/types";

export interface IEntry_Props {
    id: number;
}

export interface IEntry_Instance extends Model<IEntry_Props>, IEntry_Props {
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