import {Dialect, Sequelize} from "sequelize";
import {ModelCtor} from "sequelize";
import {
    animalCreator,
    animalHealthBookCreator,
    employeePlanningCreator,
    enclosureCreator,
    enclosureImageCreator,
    enclosureServiceBookCreator,
    enclosureTypeCreator,
    entryCreator,
    IAnimal_Health_Book_Instance,
    IAnimal_Instance,
    IEmployee_Planning_Instance,
    IEnclosure_Image_Instance,
    IEnclosure_Instance,
    IEnclosure_Service_Book_Instance,
    IEnclosure_Type_Instance,
    IEntry_Instance,
    IPass_Enclosure_Access_Instance,
    IPass_Instance,
    IPass_Night_Availability_Instance,
    IPass_Type_Instance,
    ISession_Instance,
    ISpecie_Instance,
    IUser_Instance,
    IUser_Role_Instance,
    passCreator,
    passEnclosureCreator,
    passNightAvailabilityCreator,
    passTypeCreator,
    sessionCreator,
    specieCreator, userCreator, userRoleCreator
} from "../models";

export interface SequelizeManagerProps {
    sequelize: Sequelize;
    //Animal package
    Animal: ModelCtor<IAnimal_Instance>;
    AnimalHealthBook: ModelCtor<IAnimal_Health_Book_Instance>;
    Specie: ModelCtor<ISpecie_Instance>;
    //Enclosure package
    Enclosure: ModelCtor<IEnclosure_Instance>;
    EnclosureImage: ModelCtor<IEnclosure_Image_Instance>;
    EnclosureServiceBook: ModelCtor<IEnclosure_Service_Book_Instance>;
    EnclosureType: ModelCtor<IEnclosure_Type_Instance>;
    //Pass
    Entry: ModelCtor<IEntry_Instance>;
    Pass: ModelCtor<IPass_Instance>;
    PassEnclosureAccess: ModelCtor<IPass_Enclosure_Access_Instance>;
    PassNightAvailability: ModelCtor<IPass_Night_Availability_Instance>;
    Pass_Type: ModelCtor<IPass_Type_Instance>;
    //Planning
    EmployeePlanning: ModelCtor<IEmployee_Planning_Instance>;
    //User
    Session: ModelCtor<ISession_Instance>;
    User: ModelCtor<IUser_Instance>;
    UserRole: ModelCtor<IUser_Role_Instance>;
}

export class SequelizeManager implements SequelizeManagerProps {
    private static instance?: SequelizeManager;

    sequelize: Sequelize;
    //Animal package
    Animal: ModelCtor<IAnimal_Instance>;
    AnimalHealthBook: ModelCtor<IAnimal_Health_Book_Instance>;
    Specie: ModelCtor<ISpecie_Instance>;
    //Enclosure package
    Enclosure: ModelCtor<IEnclosure_Instance>;
    EnclosureImage: ModelCtor<IEnclosure_Image_Instance>;
    EnclosureServiceBook: ModelCtor<IEnclosure_Service_Book_Instance>;
    EnclosureType: ModelCtor<IEnclosure_Type_Instance>;
    //Pass
    Entry: ModelCtor<IEntry_Instance>;
    Pass: ModelCtor<IPass_Instance>;
    PassEnclosureAccess: ModelCtor<IPass_Enclosure_Access_Instance>;
    PassNightAvailability: ModelCtor<IPass_Night_Availability_Instance>;
    Pass_Type: ModelCtor<IPass_Type_Instance>;
    //Planning
    EmployeePlanning: ModelCtor<IEmployee_Planning_Instance>;
    //User
    Session: ModelCtor<ISession_Instance>;
    User: ModelCtor<IUser_Instance>;
    UserRole: ModelCtor<IUser_Role_Instance>;

    public static async getInstance(): Promise<SequelizeManager> {
        if (SequelizeManager.instance === undefined) {
            SequelizeManager.instance = await SequelizeManager.initialize();
        }
        return SequelizeManager.instance;
    }

    private static async initialize(): Promise<SequelizeManager> {
        const sequelize = new Sequelize({
            dialect: process.env.DB_DRIVER as Dialect,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: Number.parseInt(process.env.DB_PORT as string),
        });

        await sequelize.authenticate();
        const managerProps: SequelizeManagerProps = {
            sequelize,
            Animal: animalCreator(sequelize),
            AnimalHealthBook: animalHealthBookCreator(sequelize),
            Specie: specieCreator(sequelize),
            //Enclosure package
            Enclosure: enclosureCreator(sequelize),
            EnclosureImage: enclosureImageCreator(sequelize),
            EnclosureServiceBook: enclosureServiceBookCreator(sequelize),
            EnclosureType: enclosureTypeCreator(sequelize),
            //Pass
            Entry: entryCreator(sequelize),
            Pass: passCreator(sequelize),
            PassEnclosureAccess: passEnclosureCreator(sequelize),
            PassNightAvailability: passNightAvailabilityCreator(sequelize),
            Pass_Type: passTypeCreator(sequelize),
            //Planning
            EmployeePlanning: employeePlanningCreator(sequelize),
            Session: sessionCreator(sequelize),
            User: userCreator(sequelize),
            UserRole: userRoleCreator(sequelize),
        };
        SequelizeManager.associate(managerProps);
        await sequelize.sync({
            force: true
        });
        return new SequelizeManager(managerProps);
    }

    private static associate(props: SequelizeManagerProps): void {
        const {Animal, AnimalHealthBook, Specie, Enclosure} = props;
        Animal.hasMany(AnimalHealthBook);
        Animal.belongsTo(Specie);
        Animal.belongsTo(Enclosure);
    }

    private constructor(props: SequelizeManagerProps) {
        this.sequelize = props.sequelize;
        this.Animal = props.Animal;
        this.AnimalHealthBook = props.AnimalHealthBook;
        this.Specie = props.Specie;
        //Enclosure package
        this.Enclosure = props.Enclosure;
        this.EnclosureImage = props.EnclosureImage;
        this.EnclosureServiceBook = props.EnclosureServiceBook;
        this.EnclosureType = props.EnclosureType;
        //Pass
        this.Entry = props.Entry;
        this.Pass = props.Pass;
        this.PassEnclosureAccess = props.PassEnclosureAccess;
        this.PassNightAvailability = props.PassNightAvailability;
        this.Pass_Type = props.Pass_Type;
        //Planning
        this.EmployeePlanning = props.EmployeePlanning;
        //User
        this.Session = props.Session;
        this.User = props.User;
        this.UserRole = props.UserRole;
    }
}
