import {
    DataTypes,
    Model,
    ModelCtor,
    Optional,
    Sequelize,
} from "sequelize/types";

export interface IPass_Props {
    id: number;
    validDate: Date;
}

export interface IPass_Creation_Props extends Optional<IPass_Props, "id"> {
}

export interface IPass_Instance extends Model<IPass_Props, IPass_Creation_Props>,
    IPass_Props {
}

export function passCreator(sequelize: Sequelize): ModelCtor<IPass_Instance> {
    return sequelize.define<IPass_Instance>(
        "Pass",
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            validDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
            underscored: true,
            paranoid: true,
            timestamps: true,
        });
}