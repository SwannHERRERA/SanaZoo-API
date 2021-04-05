import {
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    DataTypes,
    Model,
    ModelCtor,
    Sequelize,
} from "sequelize";
import {IPass_Type_Instance} from "./pass_type.model";

export interface IPass_Night_Availability_Props {
    id: number;
    date: Date;
}

export interface IPass_Night_Availability_Instance extends Model<IPass_Night_Availability_Props>,
    IPass_Night_Availability_Props {

    setPassType: BelongsToSetAssociationMixin<IPass_Type_Instance, "id">;
    getPassType: BelongsToGetAssociationMixin<IPass_Type_Instance>;
}

export function passNightAvailabilityCreator(sequelize: Sequelize): ModelCtor<IPass_Night_Availability_Instance> {
    return sequelize.define<IPass_Night_Availability_Instance>(
        "Pass_Night_Availability",
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        });
}
