import {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  Model,
  ModelCtor,
  Sequelize,
} from "sequelize/types";
import { Pass_Type_Instance } from "./pass_type.model";

export interface IPass_Night_Availability_Props {
  id: number;
  date: Date;
}

export interface Pass_Night_Availability_Instance
  extends Model<IPass_Night_Availability_Props>,
    IPass_Night_Availability_Props {
  setPassNight: BelongsToSetAssociationMixin<Pass_Type_Instance, "id">;
  getPassNight: BelongsToGetAssociationMixin<Pass_Type_Instance>;
}

const initPassNight = (
  sequelize: Sequelize
): ModelCtor<Pass_Night_Availability_Instance> => {
  return sequelize.define<Pass_Night_Availability_Instance>(
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
