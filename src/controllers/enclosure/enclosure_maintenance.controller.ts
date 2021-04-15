import {ModelCtor, QueryTypes} from "sequelize";
import {IEnclosure_Service_Book_Instance, IEntry_Instance} from "../../models";
import {SequelizeManager} from "../../utils/db";
import {Sequelize} from "sequelize";


export class Enclosure_Maintenance_Controller {
    entry: ModelCtor<IEntry_Instance>;

    private static instance: Enclosure_Maintenance_Controller;

    public static async getInstance():Promise<Enclosure_Maintenance_Controller> {
        if (Enclosure_Maintenance_Controller.instance === undefined) {
            const {Entry} = await SequelizeManager.getInstance();
            Enclosure_Maintenance_Controller.instance = new Enclosure_Maintenance_Controller(Entry);
        }

        return Enclosure_Maintenance_Controller.instance;
    }

    private constructor(entry: ModelCtor<IEntry_Instance>) {
        this.entry = entry;
    }

    public async getBestMonth(id: number): Promise<any> {
        const manager = await SequelizeManager.getInstance();
        const result = await manager.sequelize.query("SELECT DATE_FORMAT(Entry.created_at,'%M') as month, count(*) as attendance FROM Entry WHERE CURDATE() - INTERVAL 1 YEAR < Entry.created_at GROUP BY month ORDER BY attendance ASC LIMIT 1", {type: QueryTypes.SELECT});
        return result;
    }
}