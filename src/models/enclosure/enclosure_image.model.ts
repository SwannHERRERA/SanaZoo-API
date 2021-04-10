import {
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    DataTypes,
    Model,
    ModelCtor,
    Optional,
    Sequelize,
} from "sequelize";
import {IEnclosure_Instance} from "./enclosure.model";

export interface IEnclosure_Image_Props {
    id: number;
    title: string;
    path: string;
    enclosureId: number;
}

export interface IEnclosure_Image_Creation_Props extends Optional<IEnclosure_Image_Props, "id"> {
}

export interface IEnclosure_Image_Instance
    extends Model<IEnclosure_Image_Props, IEnclosure_Image_Creation_Props>,
        IEnclosure_Image_Props {
    setEnclosure: BelongsToSetAssociationMixin<IEnclosure_Instance, "id">;
    getEnclosure: BelongsToGetAssociationMixin<IEnclosure_Instance>;
}

export function enclosureImageCreator(sequelize: Sequelize): ModelCtor<IEnclosure_Image_Instance> {
    return sequelize.define<IEnclosure_Image_Instance>("Enclosure_Image", {
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
        enclosureId: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "Enclosure",
                key: "id"
            }
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true,
    });
}
