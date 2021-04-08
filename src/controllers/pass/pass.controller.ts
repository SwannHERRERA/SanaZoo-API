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
import {Request, Response} from "express";
import * as yup from "yup";


export class PassController {
    PassType: ModelCtor<IPass_Type_Instance>
    Pass: ModelCtor<IPass_Instance>;
    User: ModelCtor<IUser_Instance>;
    Entry: ModelCtor<IEntry_Instance>;
    PassEnclosureAccess: ModelCtor<IPass_Enclosure_Access_Instance>;

    passCreateSchema = yup.object().shape({
        validDate: yup.date().required(),
        passTypeId: yup.number().required().min(1),
        userId: yup.number().required().min(1),
        entries: yup.array().of(yup.number().required()).min(1).required()
    });

    private static instance: PassController;

    public static async getInstance(): Promise<PassController> {
        if (this.instance === undefined) {
            const manager = await SequelizeManager.getInstance();
            PassController.instance = new PassController(manager.PassType, manager.Pass, manager.User, manager.Entry, manager.PassEnclosureAccess);
        }
        return PassController.instance;
    }

    public async getAllPass(req: Request, res: Response): Promise<void> {
        const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : 20;
        const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : 0;

        const result = await this.Pass.findAll({
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

    public async createPass(req: Request, res: Response): Promise<void> {
        const validDate = req.body.validDate
        const passTypeId = req.body.passTypeId
        const userId = req.body.userId
        const entries = req.body.entries
        this.passCreateSchema.validate({
            validDate,
            passTypeId,
            userId,
            entries
        }).then(async () => {
            //create
            const pass: IPass_Instance = await this.Pass.create({passTypeId, validDate, userId});
            const entryList = [];
            for (let enclosureId of entries) {
                const entry = await this.Entry.create({passId: pass.id, enclosureId: enclosureId})
                entryList.push(entry);
            }
            res.status(200).json({pass, entryList}).end();
        }).catch((err) => {
            res.status(400).json(err.message).end();
        });
    }

    public async getPassById(req: Request, res: Response): Promise<void> {

    }

    public async getPassByUserId(req: Request, res: Response): Promise<void> {

    }

    public async addPassEntry(req: Request, res: Response): Promise<void> {

    }

    public async updatePass(req: Request, res: Response): Promise<void> {

    }

    public async deletePass(req: Request, res: Response): Promise<void> {

    }


    constructor(PassType: ModelCtor<IPass_Type_Instance>, Pass: ModelCtor<IPass_Instance>, User: ModelCtor<IUser_Instance>, Entry: ModelCtor<IEntry_Instance>, PassEnclosureAccess: ModelCtor<IPass_Enclosure_Access_Instance>) {
        this.PassType = PassType;
        this.Pass = Pass;
        this.User = User;
        this.Entry = Entry;
        this.PassEnclosureAccess = PassEnclosureAccess;
    }
}