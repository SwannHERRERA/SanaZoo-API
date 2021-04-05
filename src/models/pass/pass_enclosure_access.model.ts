import {
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    DataTypes,
    Model,
    ModelCtor,
    Sequelize
} from "sequelize";
import {IPass_Instance} from "./pass.model";
import {IEnclosure_Instance} from "..";

export interface IPass_Enclosure_Access_Props {
    id: number;
    order?: number;
}

export interface IPass_Enclosure_Access_Instance
    extends Model<IPass_Enclosure_Access_Props>, IPass_Enclosure_Access_Props {
    setPass: BelongsToSetAssociationMixin<IPass_Instance, "id">;
    getPass: BelongsToGetAssociationMixin<IPass_Instance>;

    setEnclosure: BelongsToSetAssociationMixin<IEnclosure_Instance, "id">;
    getEnclosure: BelongsToGetAssociationMixin<IEnclosure_Instance>;
}

export function passEnclosureCreator(sequelize: Sequelize): ModelCtor<IPass_Enclosure_Access_Instance> {
    return sequelize.define<IPass_Enclosure_Access_Instance>(
        "Pass_Enclosure_Access",
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            order: {
                type: DataTypes.INTEGER,
            },
        },
        {
            freezeTableName: true,
            underscored: true,
            paranoid: true,
            timestamps: true,
        });
}
