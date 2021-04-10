import {ModelCtor} from "sequelize";
import {
    IEnclosure_Instance,
    IEntry_Instance,
    IPass_Creation_Props,
    IPass_Enclosure_Access_Instance,
    IPass_Instance,
    IPass_Type_Instance,
    IUser_Instance
} from "../../models";
import {SequelizeManager} from "../../utils/db";
import {Request, Response} from "express";
import * as yup from "yup";


export class PassController {
    PassType: ModelCtor<IPass_Type_Instance>
    Pass: ModelCtor<IPass_Instance>;
    Enclosure: ModelCtor<IEnclosure_Instance>;
    Entry: ModelCtor<IEntry_Instance>;
    PassEnclosureAccess: ModelCtor<IPass_Enclosure_Access_Instance>;

    private static instance: PassController;

    public static async getInstance(): Promise<PassController> {
        if (this.instance === undefined) {
            const manager = await SequelizeManager.getInstance();
            PassController.instance = new PassController(manager.Enclosure, manager.PassType, manager.Pass, manager.Entry, manager.PassEnclosureAccess);
        }
        return PassController.instance;
    }

    public async getAllEntries(req: Request, res: Response): Promise<void> {
        const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : 20;
        const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : 0;

        const result = await this.Entry.findAll({
            order: [
                ['valid_date', 'ASC']
            ],
            limit, offset
        });

        if (!result) {
            res.status(404).end();
            return;
        }
        res.json(result);
    }

    public async getEntriesByUserId(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;
        const entries: IEntry_Instance[] = [];
        const passList: IPass_Instance[] = await this.Pass.findAll({where: {userId}});

        for (let pass of passList) {
            let foundEntries: IEntry_Instance[] = await this.Entry.findAll();
            for (let entry of foundEntries) {
                entries.push(entry);
            }
        }
        res.status(200).json(entries).end();
    }

    public async getPassEntries(req: Request, res: Response): Promise<void> {
        const passId = req.params.id;
        const entries: IEntry_Instance[] = await this.Entry.findAll({where: {passId}});

        res.status(200).json(entries).end();
    }

    constructor(Enclosure: ModelCtor<IEnclosure_Instance>, PassType: ModelCtor<IPass_Type_Instance>, Pass: ModelCtor<IPass_Instance>, Entry: ModelCtor<IEntry_Instance>, PassEnclosureAccess: ModelCtor<IPass_Enclosure_Access_Instance>) {
        this.PassType = PassType;
        this.Pass = Pass;
        this.Entry = Entry;
        this.PassEnclosureAccess = PassEnclosureAccess;
        this.Enclosure = Enclosure;
    }
}