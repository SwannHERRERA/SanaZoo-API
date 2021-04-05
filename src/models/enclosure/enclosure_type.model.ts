import {ModelCtor, Optional, Sequelize, Model, DataTypes} from "sequelize";


export interface IEnclosure_Type_Props {
    id: number;
    name: string;
}

export interface IEnclosure_Type_Creation_Props extends Optional<IEnclosure_Type_Props, "id"> {
}

export interface IEnclosure_Type_Instance extends Model<IEnclosure_Type_Props, IEnclosure_Type_Creation_Props>, IEnclosure_Type_Props {

}

export function enclosureTypeCreator(sequelize: Sequelize): ModelCtor<IEnclosure_Type_Instance> {
    return sequelize.define<IEnclosure_Type_Instance>("Enclosure_Type", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}