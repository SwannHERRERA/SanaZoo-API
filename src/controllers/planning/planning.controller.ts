import {ModelCtor} from "sequelize";
import {IEmployee_Planning_Creation_Props, IEmployee_Planning_Instance} from "../../models";
import {SequelizeManager} from "../../utils/db";
import {GetAllOptions} from "../../utils/sequelize_options";


export class Planning_Controller {
    EmployeePlanning: ModelCtor<IEmployee_Planning_Instance>;

    private static instance: Planning_Controller;


    private constructor(EmployeePlanning: ModelCtor<IEmployee_Planning_Instance>) {
        this.EmployeePlanning = EmployeePlanning;
    }

    public static async getInstance(): Promise<Planning_Controller> {
        if (Planning_Controller.instance === undefined) {
            const {EmployeePlanning} = await SequelizeManager.getInstance();
            Planning_Controller.instance = new Planning_Controller(EmployeePlanning);
        }

        return Planning_Controller.instance;
    }

    public async add(props: IEmployee_Planning_Creation_Props): Promise<IEmployee_Planning_Instance | null> {
        return this.EmployeePlanning.create({
            ...props
        });
    }

    public async remove(id: number):Promise<number> {
        return this.EmployeePlanning.destroy({
            where: {
                id
            }
        });
    }

    public async update(id: number, props: IEmployee_Planning_Creation_Props) {
        await this.EmployeePlanning.update({
            ...props
        },
            {
                where: {id}
            });
        return this.EmployeePlanning.findByPk(id);
    }

    public async getOne(id: number): Promise<IEmployee_Planning_Instance | null> {
        return this.EmployeePlanning.findByPk(id);
    }

    public async getAll(params?: GetAllOptions): Promise<IEmployee_Planning_Instance[] | null> {
        const limit = params?.limit || 20;
        const offset = params?.offset || 0;

        return this.EmployeePlanning.findAll({
            offset,
            limit
        });
    }

    public async getAllFromEmployee(id: number): Promise<IEmployee_Planning_Instance[] | null> {
        return this.EmployeePlanning.findAll({
            where: {
                userId: id
            }
        });
    }

    //TODO
    //public async getOpenDate()
}