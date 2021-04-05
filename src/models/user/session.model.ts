import {
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
    DataTypes,
    Model,
    ModelCtor,
    Optional,
    Sequelize,
} from "sequelize";
import {IUser_Instance} from "./user.model";

export interface ISession_Props {
    id: number;
    token: string;
    expireDate: Date;
}

export interface ISession_Creation_Props extends Optional<ISession_Props, "id"> {
}

export interface ISession_Instance extends Model<ISession_Props, ISession_Creation_Props>,
    ISession_Props {
    setUser: BelongsToSetAssociationMixin<IUser_Instance, "id">;
    getUser: BelongsToGetAssociationMixin<IUser_Instance>;
}

export function sessionCreator(sequelize: Sequelize): ModelCtor<ISession_Instance> {
    return sequelize.define<ISession_Instance>(
        "Session",
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            token: {
                type: DataTypes.STRING,
                unique: true,
            },
            expireDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
            underscored: true,
            paranoid: true,
            timestamps: true,
        }
    );
}
