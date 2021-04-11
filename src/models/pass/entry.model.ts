import {IEnclosure_Instance, IPass_Instance} from "..";
import {
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    DataTypes,
    Model,
    ModelCtor, Optional,
    Sequelize
} from "sequelize";

export interface IEntry_Props {
    id: number;
    enclosureId: number;
    passId: number;
}

export interface IEntry_Creation_Props extends Optional<IEntry_Props, "id"> {
}

export interface IEntry_Instance extends Model<IEntry_Props, IEntry_Creation_Props>, IEntry_Props {
    setPass: BelongsToSetAssociationMixin<IPass_Instance, "id">;
    getPass: BelongsToGetAssociationMixin<IPass_Instance>;

    setEnclosure: BelongsToSetAssociationMixin<IEnclosure_Instance, "id">;
    getEnclosure: BelongsToGetAssociationMixin<IEnclosure_Instance>;
}

export function entryCreator(sequelize: Sequelize): ModelCtor<IEntry_Instance> {
    return sequelize.define<IEntry_Instance>(
        "Entry",
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            enclosureId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'Enclosure',
                    key: 'id',
                }
            },
            passId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: 'Pass',
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