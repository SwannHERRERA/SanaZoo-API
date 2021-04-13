import {ModelCtor} from "sequelize";
import {
    IEnclosure_Instance,
    IEntry_Instance,
    IPass_Enclosure_Access_Instance,
    IPass_Instance,
    IPass_Type_Instance,
    PassType
} from "../../models";
import {SequelizeManager} from "../../utils/db";
import {Request, Response} from "express";


export class EntryController {
    PassType: ModelCtor<IPass_Type_Instance>
    Pass: ModelCtor<IPass_Instance>;
    Enclosure: ModelCtor<IEnclosure_Instance>;
    Entry: ModelCtor<IEntry_Instance>;
    PassEnclosureAccess: ModelCtor<IPass_Enclosure_Access_Instance>;

    private static instance: EntryController;

    public static async getInstance(): Promise<EntryController> {
        if (this.instance === undefined) {
            const manager = await SequelizeManager.getInstance();
            EntryController.instance = new EntryController(manager.Enclosure, manager.PassType, manager.Pass, manager.Entry, manager.PassEnclosureAccess);
        }
        return EntryController.instance;
    }

    public async getAllEntries(req: Request, res: Response): Promise<void> {
        const limit = req.query.limit ? Number.parseInt(req.query.limit as string) : 20;
        const offset = req.query.offset ? Number.parseInt(req.query.offset as string) : 0;

        const result = await this.Entry.findAll({
            order: [
                ['created_at', 'DESC']
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
        const passList: IPass_Instance[] = await this.Pass.findAll({
            where: {userId},
        });

        for (let pass of passList) {
            let foundEntries: IEntry_Instance[] = await this.Entry.findAll({
                order: [
                    ['created_at', 'DESC']
                ]
            });
            for (let entry of foundEntries) {
                entries.push(entry);
            }
        }
        res.status(200).json(entries).end();
    }

    public async getPassEntries(req: Request, res: Response): Promise<void> {
        const passId = req.params.id;
        const entries: IEntry_Instance[] = await this.Entry.findAll({
            where: {passId},
            order: [
                ['created_at', 'DESC']
            ]
        });

        res.status(200).json(entries).end();
    }

    public async getEnclosureEntries(req: Request, res: Response): Promise<void> {
        const enclosureId = req.params.id;
        const entries: IEntry_Instance[] = await this.Entry.findAll({
            where: {enclosureId},
            order: [
                ['created_at', 'DESC']
            ]
        });

        res.status(200).json(entries).end();
    }

    public async addEntry(req: Request, res: Response): Promise<void> {
        const passId = req.body.passId;
        const enclosureId = req.body.enclosureId;

        if (!passId || !enclosureId) {
            res.status(400).end();
            return;
        }

        const pass: IPass_Instance | null = await this.Pass.findByPk(passId);
        const enclosure: IEnclosure_Instance | null = await this.Enclosure.findByPk(enclosureId);
        const passEnclosureAccessList: IPass_Enclosure_Access_Instance[] = await this.PassEnclosureAccess.findAll({where: {passId}});
        const date: Date = new Date();

        if (!pass || !enclosure || !passEnclosureAccessList.length) {
            res.status(404).end();
            return;
        }

        if (!passEnclosureAccessList.find((e) => {
            return e.enclosureId == enclosureId;
        })) {
            res.status(403).json("Your pass don't allow access to this enclosure").end();
            return;
        }

        if (pass.validDate > date) {
            res.status(403).json("Pass is not yet active").end();
            return;
        }

        switch (pass.passTypeId) {
            case PassType.DAY:
                await this.dayEntry(res, date, pass, enclosure);
                break;
            case PassType.WEEKEND:
                await this.weekendEntry(res, date, pass, enclosure);
                break;
            case PassType.ANNUAL:
                await this.yearEntry(res, date, pass, enclosure);
                break;
            case PassType.ONEDAYMONTH:
                await this.oneDayMonthEntry(res, date, pass, enclosure);
                break;
            case PassType.ESCAPE_GAME:
                await this.escapeGameEntry(res, date, pass, enclosure, passEnclosureAccessList);
                break;
            case PassType.NIGHT:
                //TODO night (verify pas date is valid with pass night availability)
                console.log("Pass night");
                break;
            default:
                res.status(500).json('unknown pass type !').end();
        }

        // const entry: IEntry_Instance = await this.Entry.create({passId, enclosureId});
        // res.status(200).json(entry).end();
    }

    private async dayEntry(res: Response, currentDate: Date, pass: IPass_Instance, enclosure: IEnclosure_Instance) {
        if (currentDate.getDate() != pass.validDate.getDate() ||
            currentDate.getMonth() != pass.validDate.getMonth() ||
            currentDate.getFullYear() != pass.validDate.getFullYear()) {
            res.status(403).json('invalid pass valid date').end();
            return;
        }
        await this.createEntry(pass.id, enclosure.id, res);
    }

    private async weekendEntry(res: Response, currentDate: Date, pass: IPass_Instance, enclosure: IEnclosure_Instance) {
        //Test if valid date is below 7 days
        if ((currentDate.getTime() - pass.validDate.getTime()) / (1000 * 60 * 60 * 24) > 7) {
            res.status(403).json('Your week-end pass is not longer valid').end();
            return;
        }
        if (currentDate.getDay() != 0 && currentDate.getDay() != 6) {
            res.status(403).json('Your pass is only valid for a week-end !');
            return;
        }

        await this.createEntry(pass.id, enclosure.id, res);
    }

    private async yearEntry(res: Response, currentDate: Date, pass: IPass_Instance, enclosure: IEnclosure_Instance) {
        //Test if valid date is below 365 days
        if ((currentDate.getTime() - pass.validDate.getTime()) / (1000 * 60 * 60 * 24) > 365) {
            res.status(403).json('Your year pass is not longer valid').end();
        }

        await this.createEntry(pass.id, enclosure.id, res);
    }

    private async oneDayMonthEntry(res: Response, currentDate: Date, pass: IPass_Instance, enclosure: IEnclosure_Instance) {
        //Test if valid date is below 365 days
        if ((currentDate.getTime() - pass.validDate.getTime()) / (1000 * 60 * 60 * 24) > 365) {
            res.status(403).json('Your one day month pass is not longer valid').end();
        }
        const passEntries: IEntry_Instance[] = await this.Entry.findAll({
            where: {
                passId: pass.id,
            }
        });

        if (passEntries.find((e) => {
            return e.createdAt.getMonth() == currentDate.getMonth() &&
                e.createdAt.getFullYear() == currentDate.getFullYear() &&
                e.createdAt.getDate() != currentDate.getDate();
        })) {
            res.status(403).json('Your already have an entry for this month at another day').end();
            return;
        }
        await this.createEntry(pass.id, enclosure.id, res);
    }

    private async escapeGameEntry(res: Response, currentDate: Date, pass: IPass_Instance, enclosure: IEnclosure_Instance, passEnclosureAccessList: IPass_Enclosure_Access_Instance[]) {
        //Normalement, toute les autres vérification de validité ont été vérifié
        if (currentDate.getDate() != pass.validDate.getDate() ||
            currentDate.getMonth() != pass.validDate.getMonth() ||
            currentDate.getFullYear() != pass.validDate.getFullYear()) {
            res.status(403).json('invalid pass valid date').end();
            return;
        }

        // TODO check if already composed or none
        const enclosureAccess: IPass_Enclosure_Access_Instance | undefined = passEnclosureAccessList.find((e) => {
            return e.enclosureId == enclosure.id;
        });
        if (enclosureAccess === undefined) {
            res.status(404).json('can\'t find enclosureAccess').end();
            return;
        }

        if (!enclosureAccess.order) {
            res.status(403).json('This is escape pass but enclosure access don\'t have order').end();
            return;
        }

        const alreadyEntry: IEntry_Instance | null = await this.Entry.findOne({
            where: {
                passId: pass.id,
                enclosureId: enclosure.id
            }
        });
        if (alreadyEntry) {
            res.status(403).json('You already entered in this enclosure').end();
            return;
        }

        if (enclosureAccess.order > 1) {
            const previousEnclosure: IPass_Enclosure_Access_Instance | undefined = passEnclosureAccessList.find((e) => {
                return e.order && enclosureAccess.order && e.order == enclosureAccess.order - 1;
            });
            if (!previousEnclosure) {
                res.status(404).json('Can\'t find previous enclosure access in this escape pass');
                return;
            }
            const previousEntry: IEntry_Instance | null = await this.Entry.findOne({
                where: {
                    passId: pass.id,
                    enclosureId: previousEnclosure?.enclosureId
                }
            });
            if (!previousEntry) {
                res.status(403).json('You must enter enclosure by order ! Missing entry for previous enclosure').end();
                return;
            }
        }

        await this.createEntry(pass.id, enclosure.id, res);
    }

    private async createEntry(passId: number, enclosureId: number, res: Response) {
        const entry: IEntry_Instance = await this.Entry.create({passId, enclosureId});
        res.status(200).json(entry).end();
    }

    public async deleteEntry(req: Request, res: Response) {
        const entryId = req.params.id;
        const entry: IEntry_Instance | null = await this.Entry.findByPk(entryId);
        if (!pass) {
            res.status(404).end();
            return;
        }
        await entry?.destroy();
        res.status(204).json('deleted').end();
    }

    constructor(Enclosure: ModelCtor<IEnclosure_Instance>, PassType: ModelCtor<IPass_Type_Instance>, Pass: ModelCtor<IPass_Instance>, Entry: ModelCtor<IEntry_Instance>, PassEnclosureAccess: ModelCtor<IPass_Enclosure_Access_Instance>) {
        this.PassType = PassType;
        this.Pass = Pass;
        this.Entry = Entry;
        this.PassEnclosureAccess = PassEnclosureAccess;
        this.Enclosure = Enclosure;
    }
}