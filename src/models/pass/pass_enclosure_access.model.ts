import {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  Model,
  ModelCtor,
  Sequelize
} from "sequelize/types";
import {Pass_Instance} from "./pass.model";
import {IEnclosure_Instance} from "../enclosure/enclosure.model";

export interface IPass_Enclosure_Access_Props {
  id: number;
}

export interface Pass_Enclosure_Access_Instance
  extends Model<IPass_Enclosure_Access_Props>,
    IPass_Enclosure_Access_Props {
  setPass: BelongsToSetAssociationMixin<Pass_Instance, "id">;
  getPass: BelongsToGetAssociationMixin<Pass_Instance>;
  setEnclosure: BelongsToSetAssociationMixin<IEnclosure_Instance, "id">;
  getEnclosure: BelongsToGetAssociationMixin<IEnclosure_Instance>;
}

const initEntry = (
  sequelize: Sequelize
): ModelCtor<Pass_Enclosure_Access_Instance> => {
  return sequelize.define<Pass_Enclosure_Access_Instance>(
    "Pass_Enclosure_Access",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
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

export default initEntry;
