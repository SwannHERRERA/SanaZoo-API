import {ModelCtor, Optional, Sequelize, Model, DataTypes} from "sequelize";


export interface IAnimal_Health_Book_Props {
    id: number;
    animal: number;
    user: number;
    description: string;
    date: string;

}

export interface IAnimal_Health_Book_Creation_Props extends Optional<IAnimal_Health_Book_Props, "id"> {}

export interface IAnimal_Health_Book_Instance extends Model<IAnimal_Health_Book_Props, IAnimal_Health_Book_Creation_Props>, IAnimal_Health_Book_Props {

}

export default function(sequelize: Sequelize): ModelCtor<IAnimal_Health_Book_Instance> {
    return sequelize.define<IAnimal_Health_Book_Instance>("Animal_Health_Book", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING
        },
        animal: {
            type: DataTypes.BIGINT
        },
        user: {
            type: DataTypes.BIGINT
        },
        date: {
            type: DataTypes.DATE
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}