import {ModelCtor} from "sequelize";
import {
    IAnimal_Instance, IEnclosure_Creation_Props, IEnclosure_Image_Instance,
    IEnclosure_Instance, IEnclosure_Service_Book_Instance,
    IEnclosure_Type_Instance,
    IEntry_Instance,
    IPass_Enclosure_Access_Instance
} from "../../models";
import {SequelizeManager} from "../../utils/db";

export interface IEnclosure_Get_All_Params {
    offset: number;
    limit: number;
}

export class Enclosure_Controller {
    Enclosure: ModelCtor<IEnclosure_Instance>;
    Entry: ModelCtor<IEntry_Instance>;
    PassEnclosureAccess: ModelCtor<IPass_Enclosure_Access_Instance>;
    EnclosureType: ModelCtor<IEnclosure_Type_Instance>;
    EnclosureServiceBook: ModelCtor<IEnclosure_Service_Book_Instance>;
    Animal: ModelCtor<IAnimal_Instance>;
    EnclosureImage: ModelCtor<IEnclosure_Image_Instance>;

    private static  instance: Enclosure_Controller;

    public static async getInstance():Promise<Enclosure_Controller> {
        if (Enclosure_Controller.instance === undefined) {
            const {Enclosure, Entry, PassEnclosureAccess, EnclosureType,
                EnclosureServiceBook, Animal, EnclosureImage} = await SequelizeManager.getInstance();
            Enclosure_Controller.instance = new Enclosure_Controller(Enclosure, Entry, PassEnclosureAccess, EnclosureType,
            EnclosureServiceBook, Animal, EnclosureImage);
        }
        return Enclosure_Controller.instance;
    }

    private constructor(Enclosure: ModelCtor<IEnclosure_Instance>,
                        Entry: ModelCtor<IEntry_Instance>,
                        PassEnclosureAccess: ModelCtor<IPass_Enclosure_Access_Instance>,
                        EnclosureType: ModelCtor<IEnclosure_Type_Instance>,
                        EnclosureServiceBook: ModelCtor<IEnclosure_Service_Book_Instance>,
                        Animal: ModelCtor<IAnimal_Instance>,
                        EnclosureImage: ModelCtor<IEnclosure_Image_Instance>) {
        this.Enclosure = Enclosure;
        this.Entry = Entry;
        this.PassEnclosureAccess = PassEnclosureAccess;
        this.EnclosureType = EnclosureType;
        this.EnclosureServiceBook = EnclosureServiceBook;
        this.Animal = Animal;
        this.EnclosureImage = EnclosureImage;
    }

    public async add(props: IEnclosure_Creation_Props): Promise<IEnclosure_Instance | null> {
        return this.Enclosure.create({
            ...props
        });
    }

    public async remove(id: number): Promise<number> {
        return this.Enclosure.destroy({
            where: {
                id
            }
        });
    }

    public async update(id: number, props: IEnclosure_Creation_Props): Promise<IEnclosure_Instance | null> {
        await this.Enclosure.update(props, {
            where: {
                id
            }
        });

        return this.Enclosure.findOne({
            where: {
                id
            }
        });
    }

    public async getOne(id: number): Promise<IEnclosure_Instance | null> {
        return this.Enclosure.findOne({
            where: {
                id
            }
        });
    }

    public async getAll(params? : IEnclosure_Get_All_Params ): Promise<IEnclosure_Instance[] | null> {
        const limit = params?.limit || 20;
        const offset = params?.offset || 0;

        return this.Enclosure.findAll({
            limit,
            offset
        });
    }

    public async getImages(id: number): Promise<IEnclosure_Image_Instance[] | null> {
        return this.EnclosureImage.findAll({
            where: {
                enclosureId: id
            }
        });
    }

    public async getServiceBook(id: number): Promise<IEnclosure_Service_Book_Instance[] | null> {
        return this.EnclosureServiceBook.findAll({
            where: {
                enclosureId: id
            }
        });
    }
}