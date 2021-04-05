  import {
    DataTypes,
    Model,
    ModelCtor,
    Optional,
    Sequelize,
    HasManyAddAssociationMixin,
    HasManyGetAssociationsMixin, BelongsToSetAssociationMixin, BelongsToGetAssociationMixin,
} from "sequelize/types";
import {Entry_Instance, Pass_Enclosure_Access_Instance, Pass_Type_Instance} from "..";

  export interface IPass_Props {
  id: number;
  validDate: Date;
}

export interface IPass_Creation_Props
  extends Optional<IPass_Props, "id"> {}

export interface Pass_Instance
  extends Model<IPass_Props, IPass_Creation_Props>,
    IPass_Props {
    setPassType: BelongsToSetAssociationMixin<Pass_Type_Instance, "id">;
    getPassType: BelongsToGetAssociationMixin<Pass_Type_Instance>;
    getEntry: HasManyGetAssociationsMixin<Entry_Instance>;
    addEntry: HasManyAddAssociationMixin<Entry_Instance, "id">;
    getPassEnclosureAccess: HasManyGetAssociationsMixin<Pass_Enclosure_Access_Instance>;
    addPassEnclosureAccess: HasManyAddAssociationMixin<Pass_Enclosure_Access_Instance, "id">;
}

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
