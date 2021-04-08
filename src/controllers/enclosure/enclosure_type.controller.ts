import {ModelCtor} from "sequelize";
import {IEnclosure_Instance, IEnclosure_Type_Creation_Props, IEnclosure_Type_Instance} from "../../models";
import {SequelizeManager} from "../../utils/db";
import {IEnclosure_Get_All_Params} from "./enclosure.controller";

export interface IGetAllParams {
    limit: number;
    offset: number;
}

export class Enclosure_Type_Controller {
    Enclosure: ModelCtor<IEnclosure_Instance>;
    EnclosureType: ModelCtor<IEnclosure_Type_Instance>;

    private static instance: Enclosure_Type_Controller;


    private constructor(Enclosure: ModelCtor<IEnclosure_Instance>, EnclosureType: ModelCtor<IEnclosure_Type_Instance>) {
        this.Enclosure = Enclosure;
        this.EnclosureType = EnclosureType;
    }

    public static async getInstance():Promise<Enclosure_Type_Controller> {
        if (Enclosure_Type_Controller.instance === undefined) {
            const {Enclosure, EnclosureType} = await SequelizeManager.getInstance();
            Enclosure_Type_Controller.instance = new Enclosure_Type_Controller(Enclosure, EnclosureType);
        }
        return Enclosure_Type_Controller.instance;
    }

    public async add(props: IEnclosure_Type_Creation_Props): Promise<IEnclosure_Type_Instance | null> {
        return this.EnclosureType.create({
            ...props
        });
    }

    public async remove(id: number): Promise<number> {
        return this.EnclosureType.destroy({
            where: {
                id
            }
        });
    }

    public async update(id: number, props: IEnclosure_Type_Creation_Props): Promise<IEnclosure_Type_Instance | null> {
        await this.EnclosureType.update(props, {
            where: {
                id
            }
        });

        return this.EnclosureType.findByPk(id);
    }

    public async getOne(id: number): Promise<IEnclosure_Type_Instance | null> {
        return this.EnclosureType.findByPk(id);
    }

    public async getAll(params? : IGetAllParams ): Promise<IEnclosure_Type_Instance[] | null> {
        const limit = params?.limit || 20;
        const offset = params?.offset || 0;

        return this.EnclosureType.findAll({
            limit,
            offset
        });
    }

    public async getEnclosureByType(id: number): Promise<IEnclosure_Instance[] | null> {
        return this.Enclosure.findAll({
            where: {
                enclosureTypeId: id
            }
        });
    }
}