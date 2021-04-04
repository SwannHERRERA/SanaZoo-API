import {ModelCtor, Optional, Sequelize, Model, DataTypes} from "sequelize";


export interface IAnimal_Props {
    id: number;
    name: string;
    specie: number;
    description: string;
    enclosure: number;
    birthdate: string;
    image: string;

}

export interface IAnimal_Creation_Props extends Optional<IAnimal_Props, "id"> {}

export interface IAnimal_Instance extends Model<IAnimal_Props, IAnimal_Creation_Props>, IAnimal_Props {

}

export default function(sequelize: Sequelize): ModelCtor<IAnimal_Instance> {
    return sequelize.define<IAnimal_Instance>("Animal", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true
        },
        description: {
            type: DataTypes.STRING
        },
        specie: {
            type: DataTypes.BIGINT
        },
        enclosure: {
            type: DataTypes.BIGINT
        },
        birthdate: {
            type: DataTypes.DATE
        },
        image: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}