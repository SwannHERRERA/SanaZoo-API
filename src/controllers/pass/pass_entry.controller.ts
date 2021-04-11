import {ModelCtor} from "sequelize";
import {
    IEnclosure_Instance,
    IEntry_Instance,
    IPass_Enclosure_Access_Instance,
    IPass_Instance,
    IPass_Type_Instance
} from "../../models";
import {SequelizeManager} from "../../utils/db";
import {Request, Response} from "express";

enum PassType {
    ESCAPE_GAME = 5,
    NIGHT = 6
}


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

    public async addEntry(req: Request, res: Response): Promise<void> {
        const passId = req.body.passId;
        const enclosureId = req.body.enclosureId;

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

        if (pass.validDate < date) {
            res.status(403).json("Pass is expired").end();
            return;
        }

        if (pass.passTypeId == PassType.ESCAPE_GAME) {
            await this.escapeGameEntry(res, pass, enclosure, passEnclosureAccessList);
            return;
        }

        if (pass.passTypeId == PassType.NIGHT) {
            //TODO night (verify pas date is valid with pass night availability)
            console.log("Pass night");
        }

        const entry: IEntry_Instance = await this.Entry.create({passId, enclosureId});
        res.status(200).json(entry).end();
    }

    public async escapeGameEntry(res: Response, pass: IPass_Instance, enclosure: IEnclosure_Instance, passEnclosureAccessList: IPass_Enclosure_Access_Instance[]) {
        //Normalement, toute les autres vérification de validité ont été vérifié
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

        if (enclosureAccess.order > 1) {
            const previousEnclosure: IPass_Enclosure_Access_Instance | undefined = passEnclosureAccessList.find((e) => {
                return e.order && enclosureAccess.order && e.order == enclosureAccess.order - 1;
            });
            if (!previousEnclosure) {
                res.status(404).json('Can\'t find previous enclosure access in this escape pass');
                return;
            }
            const previousEntry: IEntry_Instance | null = await this.Entry.findOne({where: {enclosureId: previousEnclosure?.enclosureId}});
            if (!previousEntry) {
                res.status(403).json('You must enter enclosure by order ! Missing entry for previous enclosure').end();
                return;
            }
        }

        const entry: IEntry_Instance = await this.Entry.create({passId: pass.id, enclosureId: enclosure.id});
        res.status(200).json(entry).end();
    }

    constructor(Enclosure: ModelCtor<IEnclosure_Instance>, PassType: ModelCtor<IPass_Type_Instance>, Pass: ModelCtor<IPass_Instance>, Entry: ModelCtor<IEntry_Instance>, PassEnclosureAccess: ModelCtor<IPass_Enclosure_Access_Instance>) {
        this.PassType = PassType;
        this.Pass = Pass;
        this.Entry = Entry;
        this.PassEnclosureAccess = PassEnclosureAccess;
        this.Enclosure = Enclosure;
    }
}