import {
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    DataTypes,
    Model,
    ModelCtor,
    Sequelize,
} from "sequelize/types";
import {IPass_Type_Instance} from "./pass_type.model";

export interface IPass_Night_Availability_Props {
    id: number;
    date: Date;
}

export interface IPass_Night_Availability_Instance extends Model<IPass_Night_Availability_Props>,
    IPass_Night_Availability_Props {
    setPassNight: BelongsToSetAssociationMixin<IPass_Type_Instance, "id">;
    getPassNight: BelongsToGetAssociationMixin<IPass_Type_Instance>;
}

const initPassNight = (
    sequelize: Sequelize
): ModelCtor<IPass_Night_Availability_Instance> => {
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
        }
    );
};

export default initPassNight;
