import {
    DataTypes,
    Model,
    ModelCtor,
    Optional,
    Sequelize,
} from "sequelize";

export interface IEnclosure_Image_Props {
    id: number;
    title: string;
    path: string;
}

export interface IEnclosure_Image_Creation_Props extends Optional<IEnclosure_Image_Props, "id"> {
}

export interface IEnclosure_Image_instance extends Model<IEnclosure_Image_Props, IEnclosure_Image_Creation_Props>,
    IEnclosure_Image_Props {
}

export function enclosureImageCreator(sequelize: Sequelize): ModelCtor<IEnclosure_Image_instance> {
    return sequelize.define<IEnclosure_Image_instance>("Enclosure_Image", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        path: {
            type: DataTypes.STRING,
        },
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true,
    });
}
