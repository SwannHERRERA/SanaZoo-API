import {SequelizeManager} from "../../utils/db";
import {ModelCtor, Op} from "sequelize";
import {IPass_Instance, IPass_Night_Availability_Instance, PassType} from "../../models";
import {Request, Response} from "express";


export class PassNightController {
    Pass: ModelCtor<IPass_Instance>;
    PassNightAvailability: ModelCtor<IPass_Night_Availability_Instance>;


    constructor(Pass: ModelCtor<IPass_Instance>, PassNightAvailability: ModelCtor<IPass_Night_Availability_Instance>) {
        this.Pass = Pass;
        this.PassNightAvailability = PassNightAvailability;
    }

    private static instance: PassNightController;

    public static async getInstance(): Promise<PassNightController> {
        if (PassNightController.instance === undefined) {
            const manager = await SequelizeManager.getInstance();
            PassNightController.instance = new PassNightController(manager.Pass, manager.PassNightAvailability);
        }
        return PassNightController.instance;
    }

    public async getAllPassNightsAvailabilities(req: Request, res: Response): Promise<void> {
        const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : 20;
        const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : 0;

        const availabilities: IPass_Night_Availability_Instance[] = await this.PassNightAvailability.findAll({
            order: [
                ['date', 'DESC']
            ],
            limit, offset
        });
        res.status(200).json(availabilities).end();
    }

    public async getAvailablePassNightsAvailabilities(req: Request, res: Response): Promise<void> {
        const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : 20;
        const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : 0;
        const date = new Date();
        date.setUTCHours(0, 0, 0);
        const availabilities: IPass_Night_Availability_Instance[] = await this.PassNightAvailability.findAll({
            where: {
                date: {
                    [Op.gte]: date
                }
            },
            order: [
                ['date', 'ASC']
            ],
            limit, offset
        });
        res.status(200).json(availabilities).end();
    }

    public async getPassNighAvailability(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const passNightAvailability: IPass_Night_Availability_Instance | null = await this.PassNightAvailability.findByPk(id);
        if (!passNightAvailability) {
            res.status(404).end();
            return;
        }
        res.status(200).json(passNightAvailability).end();
    }

    public async createPassNightAvailability(req: Request, res: Response): Promise<void> {
        const date: Date | null = new Date(req.body.date);
        if (isNaN(date.getTime())) {
            res.status(400).json('You must provide a valid date').end();
            return;
        }
        date.setUTCHours(0, 0, 0,0);
        console.log(date)
        const today = new Date();
        today.setUTCHours(0, 0, 0,0);
        console.log(today);
        if (date < today) {
            res.status(400).json('Date must be minimum today').end();
            return;
        }

        const passNightAvailability: IPass_Night_Availability_Instance = await this.PassNightAvailability.create({
            date,
            passTypeId: PassType.NIGHT
        });

        res.status(200).json(passNightAvailability).end();
    }

    public async updatePassNightAvailability(req: Request, res: Response): Promise<void> {
        const date: Date | null = new Date(req.body.date);
        const id = req.params.id;

        const passNightAvailability: IPass_Night_Availability_Instance | null = await this.PassNightAvailability.findByPk(id);
        if (!passNightAvailability) {
            res.status(404).end();
            return;
        }

        if (isNaN(date.getTime())) {
            res.status(400).json('You must provide a valid date').end();
            return;
        }
        date.setUTCHours(0, 0, 0,0);
        const today = new Date();
        today.setUTCHours(0, 0, 0,0);
        if (date < today) {
            res.status(400).json('Date must be minimum today').end();
            return;
        }

        passNightAvailability.date = date;
        await passNightAvailability.save();

        res.status(200).json(passNightAvailability).end();

    }

    public async deletePassNightAvailability(req: Request, res: Response): Promise<void> {
        const id = req.params.id;

        const isDeleted = await this.PassNightAvailability.destroy({where: {id}});
        console.log(isDeleted)
        if (isDeleted) {
            res.status(204).end();
        } else {
            res.status(404).end();
        }
    }
}