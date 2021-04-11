import {ModelCtor} from "sequelize";
import {IEnclosure_Image_Creation_Props, IEnclosure_Image_Instance} from "../../models";
import {SequelizeManager} from "../../utils/db";

export interface IEnclosure_Image_Get_All_Params {
    offset?: number;
    limit?: number;
}

export class Enclosure_Image_Controller {
    EnclosureImage: ModelCtor<IEnclosure_Image_Instance>;

    private static instance: Enclosure_Image_Controller;

    private constructor(Enclosure_Image: ModelCtor<IEnclosure_Image_Instance>) {
        this.EnclosureImage = Enclosure_Image;
    }

    public static async getInstance(): Promise<Enclosure_Image_Controller> {
        if (Enclosure_Image_Controller.instance === undefined) {
            const {EnclosureImage} = await SequelizeManager.getInstance();
            Enclosure_Image_Controller.instance = new Enclosure_Image_Controller(EnclosureImage);
        }

        return Enclosure_Image_Controller.instance;
    }

    public async add(props: IEnclosure_Image_Creation_Props): Promise<IEnclosure_Image_Instance | null> {
        return this.EnclosureImage.create({
            ...props
        });
    }

    public async update(id: number, props: IEnclosure_Image_Creation_Props): Promise<IEnclosure_Image_Instance | null> {
        await this.EnclosureImage.update({
            ...props
        }, {
            where: {
                id
            }
        });

        return this.EnclosureImage.findByPk(id);
    }

    public async remove(id: number): Promise<number> {
        return this.EnclosureImage.destroy({
            where: {
                id
            }
        });
    }

    public async getOne(id: number): Promise<IEnclosure_Image_Instance | null> {
        return this.EnclosureImage.findByPk(id);
    }

    public async getAll(params?: IEnclosure_Image_Get_All_Params): Promise<IEnclosure_Image_Instance[] | null> {
        const limit = params?.limit || 20;
        const offset = params?.offset || 0;

        return this.EnclosureImage.findAll({
            limit,
            offset
        });
    }

    public async getAllFromImage(id: number): Promise<IEnclosure_Image_Instance[] | null> {
        return this.EnclosureImage.findAll({
            where: {
                enclosureId: id
            }
        });
    }
}