import {
    DataTypes, HasManyAddAssociationMixin, HasManyGetAssociationsMixin,
    Model,
    ModelCtor,
    Optional,
    Sequelize,
} from "sequelize/types";
import {Entry_Instance} from "./entry.model";
import {Pass_Instance} from "./pass.model";
import {Pass_Night_Availability_Instance} from "./pass_night_availability.model";

export interface IPass_Type_Props {
  id: number;
  name: string;
  price: number;
}

export interface IPass_Type_Creation_Props
  extends Optional<IPass_Type_Props, "id"> {
    getPass: HasManyGetAssociationsMixin<Pass_Instance>;
    addPass: HasManyAddAssociationMixin<Pass_Instance, "id">;
    getPassNight: HasManyGetAssociationsMixin<Pass_Night_Availability_Instance>;
    addPassNight: HasManyAddAssociationMixin<Pass_Night_Availability_Instance, "id">;
}

export interface Pass_Type_Instance
  extends Model<IPass_Type_Props, IPass_Type_Creation_Props>,
    IPass_Type_Props {}

const initPassType = (sequelize: Sequelize): ModelCtor<Pass_Type_Instance> => {
  return sequelize.define<Pass_Type_Instance>(
    "Pass_Type",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      price: {
        type: DataTypes.REAL,
      },
    },
    {
      freezeTableName: true,
      underscored: true,
      paranoid: true,
      timestamps: true,
    }
  );
};

export default initPassType;
