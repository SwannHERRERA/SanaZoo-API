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
        enclosureAccessList: yup.array().of(yup.number().required()).min(1).required()
    });
    passUpdateSchema = yup.object().shape({
        validDate: yup.date().optional(),
        passTypeId: yup.number().optional().min(1),
        userId: yup.number().optional().min(1),
    });

    passEnclosureAccessSchema = yup.object().shape({
        passId: yup.number().min(1).required(),
        enclosureId: yup.number().min(1).required(),
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
        const enclosureAccessList = req.body.enclosureAccessList
        this.passCreateSchema.validate({
            validDate,
            passTypeId,
            userId,
            enclosureAccessList
        }).then(async () => {
            //create
            const pass: IPass_Instance = await this.Pass.create({passTypeId, validDate, userId});
            const enclosureAccess = [];
            for (let enclosureId of enclosureAccessList) {
                const access = await this.PassEnclosureAccess.create({passId: pass.id, enclosureId})
                enclosureAccess.push(access);
            }
            res.status(200).json({pass, enclosureAccess}).end();
        }).catch((err) => {
            res.status(400).json(err.message).end();
        });
    }

    public async getPassById(req: Request, res: Response): Promise<void> {
        const passId = req.params.id;
        const pass: IPass_Instance | null = await this.Pass.findByPk(passId);
        if (!pass) {
            res.status(404).end();
            return;
        }
        const enclosureAccess: IPass_Enclosure_Access_Instance[] = await this.PassEnclosureAccess.findAll({where: {passId}});
        const enclosureEntries: IPass_Enclosure_Access_Instance[] = await this.Entry.findAll({where: {passId}});

        res.status(200).json({pass, enclosureAccess, enclosureEntries}).end();
    }

    public async getPassByUserId(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;
        const result: IPass_Instance[] = await this.Pass.findAll({where: {userId}});
        res.status(200).json(result).end();
    }

    public async addPassEnclosureAccess(req: Request, res: Response): Promise<void> {
        const passId = Number.parseInt(req.params.id);
        const enclosureId = Number.parseInt(req.params.id);
        this.passEnclosureAccessSchema.validate({
            passId,
            enclosureId
        }).then(async () => {
            const enclosureAccess = await this.PassEnclosureAccess.create({
                passId,
                enclosureId
            });
            res.status(200).json(enclosureAccess).end();
        }).catch((err) => {
            res.status(400).json(err).end();
        })

    }

    public async removePassEnclosureAccess(req: Request, res: Response): Promise<void> {
        const passId = req.params.passId;
        const enclosureId = req.params.enclosureId;
        this.passEnclosureAccessSchema.validate({
            passId,
            enclosureId
        }).then(async () => {
            await this.PassEnclosureAccess.destroy({
                where: {
                    passId,
                    enclosureId
                }
            });
            res.status(204).json('deleted').end();
        }).catch((err) => {
            res.status(400).json(err).end();
        })
    }

    public async updatePass(req: Request, res: Response): Promise<void> {
        const id = req.body.id;
        const previous: IPass_Instance | null = await this.Pass.findByPk(id);
        if (!previous) {
            res.status(404).end();
            return;
        }
        const validDate = req.body.validDate || previous.validDate;
        const passTypeId = req.body.passTypeId || previous.passTypeId;
        const userId = req.body.userId || previous.userId;

        this.passUpdateSchema.validate({
            validDate,
            passTypeId,
            userId
        }).then(async () => {
            await this.Pass.update({validDate, passTypeId, userId}, {
                where: {id}
            });
            const updatedPass = await this.Pass.findByPk(id);
            res.status(200).json(updatedPass).end();
        }).catch((err) => {
            res.status(400).json(err).end();
        })
    }

    public async deletePass(req: Request, res: Response): Promise<void> {
        const passId = req.params.id;
        const pass: IPass_Instance | null = await this.Pass.findByPk(passId);
        if (!pass) {
            res.status(404).end();
            return;
        }
        await this.PassEnclosureAccess.destroy({where: {passId}});
        await this.Entry.destroy({where: {passId}});
        await pass.destroy();
        res.status(204).json('deleted').end();
    }


    constructor(PassType: ModelCtor<IPass_Type_Instance>, Pass: ModelCtor<IPass_Instance>, User: ModelCtor<IUser_Instance>, Entry: ModelCtor<IEntry_Instance>, PassEnclosureAccess: ModelCtor<IPass_Enclosure_Access_Instance>) {
        this.PassType = PassType;
        this.Pass = Pass;
        this.User = User;
        this.Entry = Entry;
        this.PassEnclosureAccess = PassEnclosureAccess;
    }
}