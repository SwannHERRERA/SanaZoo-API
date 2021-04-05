import { DataTypes, Model, ModelCtor, Optional, Sequelize } from "sequelize";

export interface IPass_Props {
  id: number;
  validDate: Date;
}

export interface IPass_Creation_Props extends Optional<IPass_Props, "id"> {}

export interface Pass_Instance
  extends Model<IPass_Props, IPass_Creation_Props>,
    IPass_Props {}

const initPass = (sequelize: Sequelize): ModelCtor<Pass_Instance> => {
  return sequelize.define<Pass_Instance>(
    "Pass",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      validDate: {
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
};

export default initPass;
