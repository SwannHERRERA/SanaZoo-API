import {
    DataTypes,
    Model,
    ModelCtor,
    Optional,
    Sequelize,
} from "sequelize/types";

export interface IPass_Type_Props {
    id: number;
    name: string;
    price: number;
}

export interface IPass_Type_Creation_Props extends Optional<IPass_Type_Props, "id"> {
}

export interface IPass_Type_Instance extends Model<IPass_Type_Props, IPass_Type_Creation_Props>,
    IPass_Type_Props {
}

export function passTypeCreator(sequelize: Sequelize): ModelCtor<IPass_Type_Instance> {
    return sequelize.define<IPass_Type_Instance>(
        "Pass_Type",
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            price: {
                type: DataTypes.REAL,
            },
        },
        {
            freezeTableName: true,
            underscored: true,
            paranoid: true,
            timestamps: true,
        });
}
