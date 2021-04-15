import {SequelizeManager} from "../../utils/db";
import {ModelCtor, Op, Sequelize} from "sequelize";
import {IAnimal_Instance, IEnclosure_Instance, IEntry_Instance, IPass_Instance, IUser_Instance} from "../../models";
import {Request, Response} from "express";
import moment, {Moment} from "moment";

export class StatisticController {
    Pass: ModelCtor<IPass_Instance>;
    User: ModelCtor<IUser_Instance>;
    Entry: ModelCtor<IEntry_Instance>;
    Animal: ModelCtor<IAnimal_Instance>;
    Enclosure: ModelCtor<IEnclosure_Instance>;

    dayOfWeek: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    private static instance: StatisticController;

    public static async getInstance(): Promise<StatisticController> {
        if (StatisticController.instance === undefined) {
            const manager = await SequelizeManager.getInstance();
            StatisticController.instance = new StatisticController(manager.Pass, manager.User, manager.Entry, manager.Animal, manager.Enclosure);
        }
        return StatisticController.instance;
    }

    public async dailyAffluence(res: Response): Promise<void> {
        const today = moment();
        const count: number = await this.Entry.count({
            where: Sequelize.where(
                Sequelize.fn('date', Sequelize.col('created_at')),
                '=',
                Sequelize.fn('current_date')
            )
        });
        res.status(200).json({
            'day': this.dayOfWeek[today.isoWeekday() - 1],
            'affuence': count
        }).end();
    }

    public async dailyEnclosureAffluence(req: Request, res: Response): Promise<void> {
        const today = moment();
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
            'day': this.dayOfWeek[today.isoWeekday() - 1],
            'affluence': count
        }).end();
    }

    public async weeklyAffluence(res: Response): Promise<void> {
        const today = moment();
        const fromDate = today.startOf('isoWeek');
        const toDate = today.endOf('isoWeek');
        const count: number = await this.Entry.count({
            where: {
                [Op.and]: [
                    Sequelize.where(
                        Sequelize.col('created_at'),
                        '>=',
                        fromDate
                    ),
                    Sequelize.where(
                        Sequelize.col('created_at'),
                        '<=',
                        toDate
                    )
                ]
            }
        });
        res.status(200).json({
            'week': today.isoWeek(),
            'affluence': count
        }).end();
    }

    public async weeklyEnclosureAffluence(req: Request, res: Response): Promise<void> {
        const enclosureId = req.params.id;
        const today = moment();
        const fromDate = today.startOf('isoWeek');
        const toDate = today.endOf('isoWeek');
        const count: number = await this.Entry.count({
            where: {
                [Op.and]: [
                    {enclosureId},
                    Sequelize.where(
                        Sequelize.col('created_at'),
                        '>=',
                        fromDate
                    ),
                    Sequelize.where(
                        Sequelize.col('created_at'),
                        '<=',
                        toDate
                    )
                ]
            }
        });
        res.status(200).json({
            'enclosureId': enclosureId,
            'thisWeekAffuence': count
        }).end();
    }

    public async monthlyAffluence(res: Response): Promise<void> {
        const today = moment();
        const fromDate = today.startOf('month');
        const toDate = today.endOf('month');
        const count: number = await this.Entry.count({
            where: {
                [Op.and]: [
                    Sequelize.where(
                        Sequelize.col('created_at'),
                        '>=',
                        fromDate
                    ),
                    Sequelize.where(
                        Sequelize.col('created_at'),
                        '<=',
                        toDate
                    )
                ]
            }
        });
        res.status(200).json({
            'month': this.months[today.month() - 1],
            'affluence': count
        }).end();
    }

    public async monthlyEnclosureAffluence(req: Request, res: Response): Promise<void> {
        const enclosureId = req.params.id;
        const today = moment();
        const fromDate = today.startOf('month');
        const toDate = today.endOf('month');
        const count: number = await this.Entry.count({
            where: {
                [Op.and]: [
                    {enclosureId},
                    Sequelize.where(
                        Sequelize.col('created_at'),
                        '>=',
                        fromDate
                    ),
                    Sequelize.where(
                        Sequelize.col('created_at'),
                        '<=',
                        toDate
                    )
                ]
            }
        });
        res.status(200).json({
            'month': this.months[today.month() - 1],
            'enclosureId': enclosureId,
            'affluence': count
        }).end();
    }

    public async yearlyAffluence(res: Response): Promise<void> {
        const months: { month: string, affluence: number }[] = [];
        for (let i = 0; i < 12; i++) {
            let month: Moment = moment().month(i + 1);
            const fromDate = month.startOf('month');
            const toDate = month.endOf('month');
            const count: number = await this.Entry.count({
                where: {
                    [Op.and]: [
                        Sequelize.where(
                            Sequelize.col('created_at'),
                            '>=',
                            fromDate
                        ),
                        Sequelize.where(
                            Sequelize.col('created_at'),
                            '<=',
                            toDate
                        )
                    ]
                }
            });
            months.push({
                month: this.months[i],
                affluence: count
            })
        }
        const totalCount = months.reduce((c, m) => c + m.affluence, 0);
        res.status(200).json({
            'year': moment().year,
            'totalAffluence': totalCount,
            'details': months
        })
    }

    public async yearlyEnclosureAffluence(req: Request, res: Response): Promise<void> {
        const enclosureId = req.params.id;
        const months: { month: string, affluence: number }[] = [];
        for (let i = 0; i < 12; i++) {
            let month: Moment = moment().month(i + 1);
            const fromDate = month.startOf('month');
            const toDate = month.endOf('month');
            const count: number = await this.Entry.count({
                where: {
                    [Op.and]: [
                        {enclosureId},
                        Sequelize.where(
                            Sequelize.col('created_at'),
                            '>=',
                            fromDate
                        ),
                        Sequelize.where(
                            Sequelize.col('created_at'),
                            '<=',
                            toDate
                        )
                    ]
                }
            });
            months.push({
                month: this.months[i],
                affluence: count
            })
        }
        const totalCount = months.reduce((c, m) => c + m.affluence, 0);
        res.status(200).json({
            'year': moment().year,
            'enclosureId': enclosureId,
            'totalAffluence': totalCount,
            'details': months
        })
    }

    public async totalAffluence(res: Response): Promise<void> {
        const count = this.Entry.count();
        res.status(200).json({
            'totalAffluence': count
        })

    }

    public async totalEnclosureAffluence(req: Request, res: Response): Promise<void> {
        const enclosureId = req.params.id;
        const count = this.Entry.count({where: {enclosureId}});
        res.status(200).json({
            'enclosureId': enclosureId,
            'totalAffluence': count
        }).end();
    }

    public async currentEnclosureAffluence(req: Request, res: Response): Promise<void> {
        const enclosureId = req.params.id;
        const enclosure: IEnclosure_Instance | null = await this.Enclosure.findByPk(enclosureId);
        if (enclosure === null) {
            res.status(404).end();
            return;
        }
        const now = moment();
        const fromDate = moment().subtract(enclosure.visitDuration, "minutes");
        const count: number = await this.Entry.count({
            where: {
                [Op.and]: [
                    {enclosureId},
                    Sequelize.where(
                        Sequelize.col('created_at'),
                        '>=',
                        fromDate
                    ),
                    Sequelize.where(
                        Sequelize.col('created_at'),
                        '<=',
                        now
                    )
                ]
            }
        });
        res.status(200).json({
            'enclosureId': enclosureId,
            'currentAffluence': count
        }).end();
    }


    constructor(Pass: ModelCtor<IPass_Instance>, User: ModelCtor<IUser_Instance>, Entry: ModelCtor<IEntry_Instance>, Animal: ModelCtor<IAnimal_Instance>, Enclosure: ModelCtor<IEnclosure_Instance>) {
        this.Pass = Pass;
        this.User = User;
        this.Entry = Entry;
        this.Animal = Animal;
        this.Enclosure = Enclosure;
    }
}