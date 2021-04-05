import {ModelCtor, Optional, Sequelize, Model, DataTypes} from "sequelize";


export interface IEnclosure_Props {
    id: number;
    name: string;
    capacity: number;
    description: string;
    type: number;
    visit_duration: string;
    handicap_access: boolean;
    maintenance: boolean;
}

export interface IEnclosure_Creation_Props extends Optional<IEnclosure_Props, "id"> {}

export interface IEnclosure_Instance extends Model<IEnclosure_Props, IEnclosure_Creation_Props>, IEnclosure_Props {

}

export default function(sequelize: Sequelize): ModelCtor<IEnclosure_Instance> {
    return sequelize.define<IEnclosure_Instance>("Enclosure", {
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
        capacity: {
            type: DataTypes.INTEGER
        },
        type: {
            type: DataTypes.INTEGER
        },
        visit_duration: {
            type: DataTypes.DATE
        },
        handicap_access: {
            type: DataTypes.BOOLEAN
        },
        maintenance: {
            type: DataTypes.BOOLEAN
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}