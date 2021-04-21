import {SequelizeManager} from "../../utils/db";
import {ModelCtor, Op, Sequelize} from "sequelize";
import {
    IAnimal_Instance,
    IEnclosure_Instance,
    IEntry_Instance,
    IPass_Instance,
    IPass_Type_Instance,
    IUser_Instance
} from "../../models";
import {Request, Response} from "express";
import * as dateFns from 'date-fns';


export class StatisticController {
    Pass: ModelCtor<IPass_Instance>;
    PassType: ModelCtor<IPass_Type_Instance>;
    User: ModelCtor<IUser_Instance>;
    Entry: ModelCtor<IEntry_Instance>;
    Animal: ModelCtor<IAnimal_Instance>;
    Enclosure: ModelCtor<IEnclosure_Instance>;

    private static instance: StatisticController;

    public static async getInstance(): Promise<StatisticController> {
        if (StatisticController.instance === undefined) {
            const manager = await SequelizeManager.getInstance();
            StatisticController.instance = new StatisticController(manager.Pass, manager.User, manager.Entry, manager.Animal, manager.Enclosure, manager.PassType);
        }
        return StatisticController.instance;
    }

    public async userCount(res: Response): Promise<void> {
        const count: number = await this.User.count();
        res.status(200).json({
            'userCount': count
        }).end();
    }

    public async animalCount(res: Response): Promise<void> {
        const count: number = await this.Animal.count();
        res.status(200).json({
            'animalCount': count
        }).end();
    }

    public async enclosureAnimalCount(req: Request, res: Response): Promise<void> {
        const enclosureId = req.params.enclosureId;
        const count: number = await this.Animal.count({where: {enclosureId}});
        res.status(200).json({
            'enclosureId': enclosureId,
            'animalCount': count
        }).end();
    }

    public async enclosureCount(res: Response): Promise<void> {
        const count: number = await this.Enclosure.count();
        res.status(200).json({
            'enclosureCount': count
        }).end();
    }

    public async validPassStats(res: Response): Promise<void> {
        const today = dateFns.startOfToday();
        const count:number = await this.Pass.count({where: Sequelize.where(Sequelize.col('valid_date'), '>=', today.toISOString())});
        res.status(200).json({
            'validPass': count
        }).end();
    }

    public async expiredPassStats(res: Response): Promise<void> {
        const yesterday = dateFns.endOfYesterday()
        const count:number = await this.Pass.count({where: Sequelize.where(Sequelize.col('valid_date'), '<=', yesterday.toISOString())});
        res.status(200).json({
            'expiredPass': count
        }).end();
    }

    public async allPassStats(res: Response): Promise<void> {
        const count:number = await this.Pass.count();
        res.status(200).json({
            'totalPass': count
        }).end();

    }

    public async validPassStatsByType(res: Response): Promise<void> {
        const today = dateFns.startOfToday();
        const passTypeList: IPass_Type_Instance[] = await this.PassType.findAll();
        const result: { passType: string, count: number; }[] = [];
        for (const passType of passTypeList) {
            const count: number = await this.Pass.count({
                where: {
                    [Op.and]: [
                        Sequelize.where(Sequelize.col('valid_date'), '>=', today.toISOString()),
                        {passTypeId: passType.id}
                    ]
                }
            });
            result.push({
                passType: passType.name,
                count
            });
        }
        res.status(200).json(result).end();
    }

    public async allPassStatsByType(res: Response): Promise<void> {
        const passTypeList: IPass_Type_Instance[] = await this.PassType.findAll();
        const result: { passType: string, count: number; }[] = [];
        for (const passType of passTypeList) {
            const count: number = await this.Pass.count({
                where: {passTypeId: passType.id}
            });
            result.push({
                passType: passType.name,
                count
            });
        }
        res.status(200).json(result).end();
    }


    constructor(Pass: ModelCtor<IPass_Instance>, User: ModelCtor<IUser_Instance>, Entry: ModelCtor<IEntry_Instance>, Animal: ModelCtor<IAnimal_Instance>, Enclosure: ModelCtor<IEnclosure_Instance>, PassType: ModelCtor<IPass_Type_Instance>) {
        this.Pass = Pass;
        this.PassType = PassType;
        this.User = User;
        this.Entry = Entry;
        this.Animal = Animal;
        this.Enclosure = Enclosure;
    }
}