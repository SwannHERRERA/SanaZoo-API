import {IEnclosure_Service_Book_Creation_Props, IEnclosure_Service_Book_Instance, IEntry_Instance} from "../../models";
import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../../utils/db";

export interface IEnclosure_Service_Book_Get_All_Params {
    offset: number;
    limit: number;
}

export class Enclosure_Service_Book_Controller {
    enclosure_service_book: ModelCtor<IEnclosure_Service_Book_Instance>;

    private static instance: Enclosure_Service_Book_Controller;

    public static async getInstance():Promise<Enclosure_Service_Book_Controller> {
        if (Enclosure_Service_Book_Controller.instance === undefined) {
            const {EnclosureServiceBook, Entry} = await SequelizeManager.getInstance();
            Enclosure_Service_Book_Controller.instance = new Enclosure_Service_Book_Controller(EnclosureServiceBook);
        }

        return Enclosure_Service_Book_Controller.instance;
    }

    private constructor(enclosure_service_book: ModelCtor<IEnclosure_Service_Book_Instance>) {
        this.enclosure_service_book = enclosure_service_book;
    }

    public async add(props: IEnclosure_Service_Book_Creation_Props):Promise<IEnclosure_Service_Book_Instance | null> {
        return this.enclosure_service_book.create({
            ...props
        });
    }

    public async update(id: number, props: IEnclosure_Service_Book_Creation_Props):Promise<IEnclosure_Service_Book_Instance | null> {
        await this.enclosure_service_book.update({
            ...props
        }, {
            where: {
                id
            }
        });

        return this.enclosure_service_book.findByPk(id);
    }

    public async remove(id: number):Promise<number> {
        return this.enclosure_service_book.destroy({
            where: {
                id
            }
        });
    }

    public async getOne(id: number):Promise<IEnclosure_Service_Book_Instance | null> {
        return this.enclosure_service_book.findByPk(id);
    }

    public async getAllFromEnclosure(id: number):Promise<IEnclosure_Service_Book_Instance[] | null> {
        return this.enclosure_service_book.findAll({
            where: {
                enclosureId: id
            }
        });
    }

    public async getAllFromEmployee(id: number): Promise<IEnclosure_Service_Book_Instance[] | null> {
        return this.enclosure_service_book.findAll({
            where: {
                userId: id
            }
        });
    }

    public async getAll(param?: IEnclosure_Service_Book_Get_All_Params): Promise<IEnclosure_Service_Book_Instance[] | null> {
        const offset = param?.offset || 0;
        const limit = param?.limit || 20;

        return this.enclosure_service_book.findAll({
            limit,
            offset
        });
    }

    public async removeFromEmployee(id: number): Promise<number> {
        return this.enclosure_service_book.destroy({
            where: {
                userId: id
            }
        });
    }

    public async removeFromEnclosure(id: number): Promise<number> {
        return this.enclosure_service_book.destroy({
            where: {
                enclosureId: id
            }
        });
    }
}