import {
    ModelCtor,
    Optional,
    Sequelize,
    Model,
    DataTypes,
    BelongsToSetAssociationMixin,
    BelongsToGetAssociationMixin
} from "sequelize";
import {Pass_Type_Instance} from "../pass/pass_type.model";
import {IUser_Instance} from "../user/user.model";


export interface IEmployee_Planning_Props {
    id: number;
    user: number;
    day_of_week: string;
    enclosure: number;
    start_time: string;
    end_time: string;

}

export interface IEmployee_Planning_Creation_Props extends Optional<IEmployee_Planning_Props, "id"> {
}

export interface IEmployee_Planning_Instance extends Model<IEmployee_Planning_Props, IEmployee_Planning_Creation_Props>, IEmployee_Planning_Props {
    setUser: BelongsToSetAssociationMixin<IUser_Instance, "id">;
    getUser: BelongsToGetAssociationMixin<IUser_Instance>;
}

export function employeePlanningCreator(sequelize: Sequelize): ModelCtor<IEmployee_Planning_Instance> {
    return sequelize.define<IEmployee_Planning_Instance>("Employee_Planning", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        day_of_week: {
            type: DataTypes.STRING
        },
        user: {
            type: DataTypes.BIGINT
        },
        enclosure: {
            type: DataTypes.BIGINT
        },
        start_time: {
            type: DataTypes.DATE
        },
        end_time: {
            type: DataTypes.DATE
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}