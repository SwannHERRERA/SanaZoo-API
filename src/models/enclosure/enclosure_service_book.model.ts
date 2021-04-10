import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin,
} from "sequelize";
import {IEnclosure_Instance} from "..";
import {IUser_Instance} from "..";

export interface IEnclosure_Service_Book_Props {
    id: number;
    date: Date;
    description: string;
    enclosureId: number;
    employeeId: number;
}

export interface IEnclosure_Service_Book_Creation_Props extends Optional<IEnclosure_Service_Book_Props, "id"> {
}

export interface IEnclosure_Service_Book_Instance
    extends Model<IEnclosure_Service_Book_Props, IEnclosure_Service_Book_Creation_Props>, IEnclosure_Service_Book_Props {
    setEnclosure: BelongsToSetAssociationMixin<IEnclosure_Instance, "id">;
    getEnclosure: BelongsToGetAssociationMixin<IEnclosure_Instance>;

    setUser: BelongsToSetAssociationMixin<IUser_Instance, "id">;
    getUser: BelongsToGetAssociationMixin<IUser_Instance>;
}

export function enclosureServiceBookCreator(sequelize: Sequelize): ModelCtor<IEnclosure_Service_Book_Instance> {
    return sequelize.define<IEnclosure_Service_Book_Instance>(
        "Enclosure_Service_Book",
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            date: {
                type: DataTypes.DATE,
                unique: true,
            },
            description: {
                type: DataTypes.TEXT,
            },
            enclosureId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: "Enclosure",
                    key: "id"
                }
            },
            employeeId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                references: {
                    model: "User",
                    key: "id"
                }
            }
        },
        {
            freezeTableName: true,
            underscored: true,
            paranoid: true,
            timestamps: true,
        }
    );
}
