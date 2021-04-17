import {SequelizeManager} from "../../utils/db";
import {ModelCtor, Op, Sequelize} from "sequelize";
import {IAnimal_Instance, IEnclosure_Instance, IEntry_Instance, IPass_Instance, IUser_Instance} from "../../models";
import {Request, Response} from "express";
import * as dateFns from 'date-fns';

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

    public async dailyAffluence(req: Request, res: Response): Promise<void> {
        const argDate = new Date(req.body.date);
        let date = new Date();
        if (argDate) {
            date = argDate;
        }
        const count: number = await this.Entry.count({
            where: Sequelize.where(
                Sequelize.fn('date', Sequelize.col('created_at')),
                '=',
                Sequelize.fn('date', date))
        });
        res.status(200).json({
            'day': this.dayOfWeek[dateFns.getISODay(date) - 1],
            'affuence': count
        }).end();
    }

    public async dailyEnclosureAffluence(req: Request, res: Response): Promise<void> {
        const argDate = new Date(req.body.date);
        let date = new Date();
        if (argDate) {
            date = argDate;
        }
        const enclosureId = req.params.id;
        const count: number = await this.Entry.count({
            where: {
                [Op.and]: [
                    {enclosureId},
                    Sequelize.where(
                        Sequelize.fn('date', Sequelize.col('created_at')),
                        '=',
                        Sequelize.fn('date', date)
                    )
                ]
            }
        });
        res.status(200).json({
            'enclosureId': enclosureId,
            'day': this.dayOfWeek[dateFns.getISODay(date) - 1],
            'affluence': count
        }).end();
    }

    public async weeklyAffluence(res: Response): Promise<void> {
        let date = new Date();
        const fromDate = dateFns.startOfISOWeek(date);
        const toDate = dateFns.endOfISOWeek(date);
        const count: number = await this.Entry.count({
            where: {
                [Op.and]: [
                    Sequelize.where(
                        Sequelize.col('created_at'),
                        '>=',
                        fromDate.toISOString()
                    ),
                    Sequelize.where(
                        Sequelize.col('created_at'),
                        '<=',
                        toDate.toISOString()
                    )
                ]
            }
        });
        res.status(200).json({
            'week': dateFns.getISOWeek(date),
            'affluence': count
        }).end();
    }

    public async weeklyEnclosureAffluence(req: Request, res: Response): Promise<void> {
        const enclosureId = req.params.id;
        let date = new Date();
        const fromDate = dateFns.startOfISOWeek(date);
        const toDate = dateFns.endOfISOWeek(date);
        const count: number = await this.Entry.count({
            where: {
                [Op.and]: [
                    {enclosureId},
                    Sequelize.where(
                        Sequelize.col('created_at'),
                        '>=',
                        fromDate.toISOString()
                    ),
                    Sequelize.where(
                        Sequelize.col('created_at'),
                        '<=',
                        toDate.toISOString()
                    )
                ]
            }
        });
        res.status(200).json({
            'enclosureId': enclosureId,
            'week': dateFns.getISOWeek(date),
            'thisWeekAffuence': count
        }).end();
    }

    public async monthlyAffluence(req: Request, res: Response): Promise<void> {
        const month: number = Number.parseInt(req.params.month);
        let date = new Date();
        if (!isNaN(month)) {
            date = dateFns.setMonth(date, Math.min(12, Math.max(1, month)));
        }
        const fromDate = dateFns.startOfMonth(date);
        const toDate = dateFns.endOfMonth(date);
        const count: number = await this.Entry.count({
            where: {
                [Op.and]: [
                    Sequelize.where(
                        Sequelize.col('created_at'),
                        '>=',
                        fromDate.toISOString()
                    ),
                    Sequelize.where(
                        Sequelize.col('created_at'),
                        '<=',
                        toDate.toISOString()
                    )
                ]
            }
        });
        res.status(200).json({
            'month': this.months[dateFns.getMonth(date) - 1],
            'affluence': count
        }).end();
    }

    public async monthlyEnclosureAffluence(req: Request, res: Response): Promise<void> {
        const enclosureId = req.params.id;
        const month: number = Number.parseInt(req.params.month);
        let date = new Date();
        if (!isNaN(month)) {
            date = dateFns.setMonth(date, Math.min(12, Math.max(1, month)));
        }
        const fromDate = dateFns.startOfMonth(date);
        const toDate = dateFns.startOfMonth(date);
        const count: number = await this.Entry.count({
            where: {
                [Op.and]: [
                    {enclosureId},
                    Sequelize.where(
                        Sequelize.col('created_at'),
                        '>=',
                        fromDate.toISOString()
                    ),
                    Sequelize.where(
                        Sequelize.col('created_at'),
                        '<=',
                        toDate.toISOString()
                    )
                ]
            }
        });
        res.status(200).json({
            'month': this.months[dateFns.getMonth(date) - 1],
            'enclosureId': enclosureId,
            'affluence': count
        }).end();
    }

    public async yearlyAffluence(req: Request, res: Response): Promise<void> {
        const year = Number.parseInt(req.params.year);
        let currYear = new Date();
        if (!isNaN(year)) {
            currYear = dateFns.setYear(currYear, Math.min(1990, year));
        }

        const months: { month: string, affluence: number; }[] = [];
        for (let i = 0; i < 12; i++) {
            let month: Date = dateFns.setMonth(currYear, i)
            const fromDate = dateFns.startOfMonth(month);
            const toDate = dateFns.endOfMonth(month);
            const count: number = await this.Entry.count({
                where: {
                    [Op.and]: [
                        Sequelize.where(
                            Sequelize.col('created_at'),
                            '>=',
                            fromDate.toString()
                        ),
                        Sequelize.where(
                            Sequelize.col('created_at'),
                            '<=',
                            toDate.toString()
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
            'year': dateFns.getYear(year),
            'totalAffluence': totalCount,
            'details': months
        })
    }

    public async yearlyEnclosureAffluence(req: Request, res: Response): Promise<void> {
        const year = Number.parseInt(req.params.year);
        let currYear = new Date();
        if (!isNaN(year)) {
            currYear = dateFns.setYear(currYear, Math.min(1990, year));
        }
        const enclosureId = req.params.id;
        const months: { month: string, affluence: number }[] = [];
        for (let i = 0; i < 12; i++) {
            let month: Date = dateFns.setMonth(currYear, i)
            const fromDate = dateFns.startOfMonth(month);
            const toDate = dateFns.endOfMonth(month);
            const count: number = await this.Entry.count({
                where: {
                    [Op.and]: [
                        {enclosureId},
                        Sequelize.where(
                            Sequelize.col('created_at'),
                            '>=',
                            fromDate.toISOString()
                        ),
                        Sequelize.where(
                            Sequelize.col('created_at'),
                            '<=',
                            toDate.toISOString()
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
            'year': dateFns.getYear(year),
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
        const now = new Date();
        const fromDate = dateFns.subMinutes(now, enclosure.visitDuration);
        const count: number = await this.Entry.count({
            where: {
                [Op.and]: [
                    {enclosureId},
                    Sequelize.where(
                        Sequelize.col('created_at'),
                        '>=',
                        fromDate.toString()
                    ),
                    Sequelize.where(
                        Sequelize.col('created_at'),
                        '<=',
                        now.toString()
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