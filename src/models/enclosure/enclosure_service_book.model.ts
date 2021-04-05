import {Sequelize, Optional, Model, DataTypes, ModelCtor} from "sequelize";

export interface IEnclosure_Service_Book_Props {
    id: number;
    date: Date;
    description: string;
}

export interface IEnclosure_Service_Book_Creation_Props extends Optional<IEnclosure_Service_Book_Props, "id"> {
}

export interface IEnclosure_Service_Book_Instance extends Model<IEnclosure_Service_Book_Props, IEnclosure_Service_Book_Creation_Props>,
    IEnclosure_Service_Book_Props {
}

export function enclosureServiceBookCreator(sequelize: Sequelize): ModelCtor<IEnclosure_Service_Book_Instance> {
    return sequelize.define<IEnclosure_Service_Book_Instance>(
        "Enclosure_Service",
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            date: {
                type: DataTypes.DATE,
                unique: true,
            },
            description: {
                type: DataTypes.TEXT,
            },
        },
        {
            freezeTableName: true,
            underscored: true,
            paranoid: true,
            timestamps: true,
        }
    );
}
