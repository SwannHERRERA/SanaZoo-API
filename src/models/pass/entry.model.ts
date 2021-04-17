import { IEnclosure_Instance, IPass_Instance } from "..";
import {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  Model,
  ModelCtor,
  Optional,
  Sequelize,
} from "sequelize";

export interface IEntry_Props {
  id: number;
  enclosureId: number;
  passId: number;
  createdAt: Date;
}

export type IEntry_Creation_Props = Optional<IEntry_Props, "id" | "createdAt">;

export interface IEntry_Instance
  extends Model<IEntry_Props, IEntry_Creation_Props>,
    IEntry_Props {
  setPass: BelongsToSetAssociationMixin<IPass_Instance, "id">;
  getPass: BelongsToGetAssociationMixin<IPass_Instance>;

  setEnclosure: BelongsToSetAssociationMixin<IEnclosure_Instance, "id">;
  getEnclosure: BelongsToGetAssociationMixin<IEnclosure_Instance>;
}

export function entryCreator(sequelize: Sequelize): ModelCtor<IEntry_Instance> {
  return sequelize.define<IEntry_Instance>(
    "Entry",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      enclosureId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "Enclosure",
          key: "id",
        },
      },
      passId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "Pass",
          key: "id",
        },
      },
      createdAt: {
        type: DataTypes.DATE,
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
