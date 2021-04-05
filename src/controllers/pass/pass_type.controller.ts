import {ModelCtor} from "sequelize";
import {IPass_Instance, IPass_Type_Instance} from "../../models";
import {SequelizeManager} from "../../utils/db";

export class PassTypeController {
    PassType: ModelCtor<IPass_Type_Instance>;
    Pass: ModelCtor<IPass_Instance>;

    private static instance: PassTypeController;

    public static async getInstance(): Promise<PassTypeController> {
        if (this.instance === undefined) {
            const manager = await SequelizeManager.getInstance();
            PassTypeController.instance = new PassTypeController(manager.PassType, manager.Pass);
        }
        return this.instance;
    }

    public async getAllPassTypes(): Promise<IPass_Type_Instance[]> {
        return this.PassType.findAll();
    }

    public async getPassTypes(id: string): Promise<IPass_Type_Instance | null> {
        return this.PassType.findOne({
            where: {
                id
            }
        });
    }

    constructor(PassType: ModelCtor<IPass_Type_Instance>, Pass: ModelCtor<IPass_Instance>) {
        this.PassType = PassType;
        this.Pass = Pass;
    }
}