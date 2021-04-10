import {
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    DataTypes,
    HasManyAddAssociationMixin,
    HasManyGetAssociationsMixin,
    Model,
    ModelCtor,
    Optional,
    Sequelize,
} from "sequelize";
import {IEntry_Instance, IPass_Enclosure_Access_Instance, IPass_Type_Instance, IUser_Instance} from "..";

export interface IPass_Props {
    id: number;
    validDate: Date;
    userId: number;
    passTypeId: number;
}

export interface IPass_Creation_Props extends Optional<IPass_Props, "id"> {
}

export interface IPass_Instance extends Model<IPass_Props, IPass_Creation_Props>, IPass_Props {
    setPassType: BelongsToSetAssociationMixin<IPass_Type_Instance, "id">;
    getPassType: BelongsToGetAssociationMixin<IPass_Type_Instance>;

    setUser: BelongsToSetAssociationMixin<IUser_Instance, "id">;
    getUser: BelongsToGetAssociationMixin<IUser_Instance>;

    getEntryList: HasManyGetAssociationsMixin<IEntry_Instance>;
    addEntry: HasManyAddAssociationMixin<IEntry_Instance, "id">;

    getPassEnclosureAccessList: HasManyGetAssociationsMixin<IPass_Enclosure_Access_Instance>;
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
            passTypeId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'PassType',
                    key: 'id',
                }
            },
            userId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'User',
                    key: 'id',
                }
            }
        },
        {
            freezeTableName: true,
            underscored: true,
            paranoid: true,
            timestamps: true,
        });
}