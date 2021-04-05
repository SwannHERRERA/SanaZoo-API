import {
    DataTypes,
    Model,
    ModelCtor,
    Optional,
    Sequelize,
    HasManyAddAssociationMixin,
    HasManyGetAssociationsMixin, BelongsToSetAssociationMixin, BelongsToGetAssociationMixin,
} from "sequelize";
import {IEntry_Instance, IPass_Enclosure_Access_Instance, IPass_Type_Instance} from "..";

export interface IPass_Props {
    id: number;
    validDate: Date;
}

export interface IPass_Creation_Props extends Optional<IPass_Props, "id"> {
}

export interface IPass_Instance extends Model<IPass_Props, IPass_Creation_Props>,
    IPass_Props {
    setPassType: BelongsToSetAssociationMixin<IPass_Type_Instance, "id">;
    getPassType: BelongsToGetAssociationMixin<IPass_Type_Instance>;
    getEntry: HasManyGetAssociationsMixin<IEntry_Instance>;
    addEntry: HasManyAddAssociationMixin<IEntry_Instance, "id">;
    getPassEnclosureAccess: HasManyGetAssociationsMixin<IPass_Enclosure_Access_Instance>;
    addPassEnclosureAccess: HasManyAddAssociationMixin<IPass_Enclosure_Access_Instance, "id">;
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