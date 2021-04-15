import {SequelizeManager} from "../../utils/db";
import {ModelCtor, Op, Sequelize} from "sequelize";
import {IAnimal_Instance, IEnclosure_Instance, IEntry_Instance, IPass_Instance, IUser_Instance} from "../../models";
import {Request, Response} from "express";

export class StatisticController {
    Pass: ModelCtor<IPass_Instance>;
    User: ModelCtor<IUser_Instance>;
    Entry: ModelCtor<IEntry_Instance>;
    Animal: ModelCtor<IAnimal_Instance>;
    Enclosure: ModelCtor<IEnclosure_Instance>;

    private static instance: StatisticController;

    public static async getInstance(): Promise<StatisticController> {
        if (StatisticController.instance === undefined) {
            const manager = await SequelizeManager.getInstance();
            StatisticController.instance = new StatisticController(manager.Pass, manager.User, manager.Entry, manager.Animal, manager.Enclosure);
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
        const enclosureId = req.params.id;
        const count: number = await this.Animal.count({where: {enclosureId}});
        res.status(200).json({
            'enclosureId': enclosureId,
            'animalCount': count
        });
    }

    public async enclosureCount(res: Response): Promise<void> {
        const count: number = await this.Enclosure.count();
        res.status(200).json({
            'enclosureCount': count
        }).end();
    }

    public async validPassStats(res: Response): Promise<void> {

    }

    public async allPassStats(res: Response): Promise<void> {

    }

    public async validPassStatsByType(req: Request, res: Response): Promise<void> {

    }

    public async allPassStatsByType(req: Request, res: Response): Promise<void> {

    }


    constructor(Pass: ModelCtor<IPass_Instance>, User: ModelCtor<IUser_Instance>, Entry: ModelCtor<IEntry_Instance>, Animal: ModelCtor<IAnimal_Instance>, Enclosure: ModelCtor<IEnclosure_Instance>) {
        this.Pass = Pass;
        this.User = User;
        this.Entry = Entry;
        this.Animal = Animal;
        this.Enclosure = Enclosure;
    }
}