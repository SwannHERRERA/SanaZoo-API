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

    public async dailyAffluence(res: Response): Promise<void> {
        const count: number = await this.Entry.count({
            where: Sequelize.where(
                Sequelize.fn('date', Sequelize.col('created_at')),
                '=',
                Sequelize.fn('current_date')
            )
        });
        res.status(200).json({
            'todayAffuence': count
        }).end();
    }

    public async dailyEnclosureAffluence(req: Request, res: Response): Promise<void> {
        const enclosureId = req.params.id;
        const count: number = await this.Entry.count({
            where: {
                [Op.and]: [
                    {enclosureId},
                    Sequelize.where(
                        Sequelize.fn('date', Sequelize.col('created_at')),
                        '=',
                        Sequelize.fn('current_date')
                    )
                ]
            }
        });
        res.status(200).json({
            'enclosureId': enclosureId,
            'todayAffuence': count
        }).end();
    }

    public async weeklyAffluence(): Promise<void> {

    }

    public async weeklyEnclosureAffluence(): Promise<void> {

    }

    public async monthlyAffluence(): Promise<void> {

    }

    public async monthlyEnclosureAffluence(): Promise<void> {

    }

    public async validPassStats(): Promise<void> {

    }

    public async allPassStats(): Promise<void> {

    }

    public async currentEnclosureAffluence(): Promise<void> {

    }


    constructor(Pass: ModelCtor<IPass_Instance>, User: ModelCtor<IUser_Instance>, Entry: ModelCtor<IEntry_Instance>, Animal: ModelCtor<IAnimal_Instance>, Enclosure: ModelCtor<IEnclosure_Instance>) {
        this.Pass = Pass;
        this.User = User;
        this.Entry = Entry;
        this.Animal = Animal;
        this.Enclosure = Enclosure;
    }
}