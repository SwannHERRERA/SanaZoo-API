import {IEnclosure_Instance, IPass_Instance} from "..";
import {
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    DataTypes,
    Model,
    ModelCtor,
    Sequelize
} from "sequelize";

export interface IEntry_Props {
    id: number;
}

export interface IEntry_Instance extends Model<IEntry_Props>, IEntry_Props {
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
        },
        {
            freezeTableName: true,
            underscored: true,
            paranoid: true,
            timestamps: true,
        });
}