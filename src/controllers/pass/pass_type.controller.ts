import {ModelCtor, Op, ValidationErrorItem} from "sequelize";
import {IPass_Instance, IPass_Type_Creation_Props, IPass_Type_Instance} from "../../models";
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
        return PassTypeController.instance;
    }

    public async getAllPassTypes(): Promise<IPass_Type_Instance[]> {
        return await this.PassType.findAll();
    }

    public async getPassTypes(id: string): Promise<IPass_Type_Instance | null> {
        return await this.PassType.findByPk(id);
    }

    public async addPassType(passType: IPass_Type_Creation_Props): Promise<IPass_Type_Instance | null> {
        return await this.PassType.create(passType).catch((err) => {
            console.error(err.errors.map((err: ValidationErrorItem) => err.message));
            return null;
        });
    }

    public async updatePassType(passType: IPass_Type_Creation_Props): Promise<IPass_Type_Instance | null> {
        return await this.PassType.update(passType, {where: {id: passType.id}}).catch((err) => {
            console.error(err.errors.map((err: ValidationErrorItem) => err.message));
            return null;
        }).then(() => {
            return this.PassType.findOne({where: {id: passType.id}});
        });
    }

    public async deletePassType(id: string): Promise<boolean> {
        const passType = await this.PassType.findByPk(id);
        if (!passType) {
            return false;
        }
        await passType.destroy();
        return true;
    }

    public async setPassType(passId: number, passTypeId: string): Promise<IPass_Instance | null> {
        const passType = await this.PassType.findByPk(passTypeId);
        const pass = await this.Pass.findByPk(passId)
        if (!passType || !pass) {
            return null;
        }

        await passType.addPass(pass);
        return pass;
    }

    constructor(PassType: ModelCtor<IPass_Type_Instance>, Pass: ModelCtor<IPass_Instance>) {
        this.PassType = PassType;
        this.Pass = Pass;
    }
}