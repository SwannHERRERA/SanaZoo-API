import {DataTypes, Model, ModelCtor, Sequelize} from "sequelize/types";

export interface IPass_Enclosure_Access_Props {
    id: number;
}

export interface IPass_Enclosure_Access_Instance extends Model<IPass_Enclosure_Access_Props>,
    IPass_Enclosure_Access_Props {
}

export function passEnclosureCreator(sequelize: Sequelize): ModelCtor<IPass_Enclosure_Access_Instance> {
    return sequelize.define<IPass_Enclosure_Access_Instance>(
        "Pass_Enclosure_Access",
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
