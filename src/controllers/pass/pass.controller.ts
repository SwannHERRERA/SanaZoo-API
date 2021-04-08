import {ModelCtor} from "sequelize";
import {
    IEntry_Instance,
    IPass_Creation_Props,
    IPass_Enclosure_Access_Instance,
    IPass_Instance,
    IPass_Type_Instance,
    IUser_Instance
} from "../../models";
import {SequelizeManager} from "../../utils/db";

export interface PassGetAllOptions {
    limit?: number;
    offset?: number;
}

export class PassController {
    PassType: ModelCtor<IPass_Type_Instance>
    Pass: ModelCtor<IPass_Instance>;
    User: ModelCtor<IUser_Instance>;
    Entry: ModelCtor<IEntry_Instance>;
    PassEnclosureAccess: ModelCtor<IPass_Enclosure_Access_Instance>;

    private static instance: PassController;

    public static async getInstance(): Promise<PassController> {
        if (this.instance === undefined) {
            const manager = await SequelizeManager.getInstance();
            PassController.instance = new PassController(manager.PassType, manager.Pass, manager.User, manager.Entry, manager.PassEnclosureAccess);
        }
        return PassController.instance;
    }

    public async getAllPass(options?: PassGetAllOptions): Promise<IPass_Instance[]> {
        const limit = options?.limit || 20;
        const offset = options?.offset || 0;

        return await this.Pass.findAll({
            order: [
                ['valid_date', 'ASC']
            ],
            limit, offset
        });
    }

    public async createPass(passProps: IPass_Creation_Props, EnclosureEntries: number[] = []): Promise<IPass_Instance | null> {
        return await this.Pass.create(passProps);
    }

    constructor(PassType: ModelCtor<IPass_Type_Instance>, Pass: ModelCtor<IPass_Instance>, User: ModelCtor<IUser_Instance>, Entry: ModelCtor<IEntry_Instance>, PassEnclosureAccess: ModelCtor<IPass_Enclosure_Access_Instance>) {
        this.PassType = PassType;
        this.Pass = Pass;
        this.User = User;
        this.Entry = Entry;
        this.PassEnclosureAccess = PassEnclosureAccess;
    }
}