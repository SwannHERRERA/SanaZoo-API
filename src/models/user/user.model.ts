import {
    ModelCtor,
    Optional,
    Sequelize,
    Model,
    DataTypes,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin
} from "sequelize";
import {Entry_Instance} from "../pass/entry.model";
import {IEmployee_Planning_Instance} from "../planning/employee_planning.model";
import {Session_Instance} from "./session.model";
import {IUser_Role_Instance} from "./user_role.model";


export interface IUser_Props {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    birthdate: string;
    password: string;
    role: number;

}

export interface IUser_Creation_Props extends Optional<IUser_Props, "id"> {}

export interface IUser_Instance extends Model<IUser_Props, IUser_Creation_Props>, IUser_Props {
    getEmployeePlanning: HasManyGetAssociationsMixin<IEmployee_Planning_Instance>;
    addEmployeePlanning: HasManyAddAssociationMixin<IEmployee_Planning_Instance, "id">;
    getSession: HasManyGetAssociationsMixin<Session_Instance>;
    addSession: HasManyAddAssociationMixin<Session_Instance, "id">;
    getUserRole: HasManyGetAssociationsMixin<IUser_Role_Instance>;
    addUserRole: HasManyAddAssociationMixin<IUser_Role_Instance, "id">;
}

export default function(sequelize: Sequelize): ModelCtor<IUser_Instance> {
    return sequelize.define<IUser_Instance>("User", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: DataTypes.STRING,
            unique: true
        },
        last_name: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.BIGINT
        },
        email: {
            type: DataTypes.STRING
        },
        birthdate: {
            type: DataTypes.DATE
        },
        password: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}