import {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  Model,
  ModelCtor,
  Optional,
  Sequelize,
} from "sequelize";
import { IUser_Instance } from "..";

export interface IPlaning_Result {
  start_time: Date;
  user_role_id: number;
}

export interface IEmployee_Planning_Props {
  id: number;
  userId: number;
  day_of_week: string;
  start_time: Date;
  end_time: Date;
}

export type IEmployee_Planning_Creation_Props = Optional<
  IEmployee_Planning_Props,
  "id"
>;

export interface IEmployee_Planning_Instance
  extends Model<IEmployee_Planning_Props, IEmployee_Planning_Creation_Props>,
    IEmployee_Planning_Props {
  setUser: BelongsToSetAssociationMixin<IUser_Instance, "id">;
  getUser: BelongsToGetAssociationMixin<IUser_Instance>;
}

export function employeePlanningCreator(
  sequelize: Sequelize
): ModelCtor<IEmployee_Planning_Instance> {
  return sequelize.define<IEmployee_Planning_Instance>(
    "Employee_Planning",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      day_of_week: {
        type: DataTypes.STRING,
      },
      start_time: {
        type: DataTypes.DATE,
      },
      end_time: {
        type: DataTypes.DATE,
      },
      userId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      timestamps: true,
    }
  );
}
