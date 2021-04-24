import faker from "faker";
import { SequelizeManager } from "../utils/db";
import { hash } from "argon2";
import { Op } from "sequelize";

export async function initFaker(): Promise<void> {
  // await createUser();
  // await createEncosureType();
  // await createEnclosure();
  // await createEnclosureImage();
  // await createEnclosureServiceBook();
  // await createSpecies();
  // await createAnimals();
  // await createAnimalHealthBook();
}

function nextInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

async function createUser(): Promise<void> {
  await createVeteriaires();
  await createVisitors();
  await createEmployee();
}

async function createVeteriaires() {
  for (let i = 0; i < 10; i++) {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      birthdate: faker.date.past().toISOString(),
      password: await hash(faker.internet.password()),
      userRoleId: 5,
    };
    const { User } = await SequelizeManager.getInstance();
    await User.create(user);
  }
}

async function createVisitors() {
  for (let i = 0; i < 100; i++) {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      birthdate: faker.date.past().toISOString(),
      password: await hash(faker.internet.password()),
      userRoleId: 6,
    };
    const { User } = await SequelizeManager.getInstance();
    await User.create(user);
  }
}

async function createEmployee() {
  for (let i = 0; i < 50; i++) {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      birthdate: faker.date.past().toISOString(),
      password: await hash(faker.internet.password()),
      userRoleId: faker.datatype.number(4) + 1,
    };
    const { User } = await SequelizeManager.getInstance();
    await User.create(user);
  }
}

async function createEncosureType() {
  for (let i = 0; i < 5; i++) {
    const enclosureType = {
      name: faker.commerce.productName(),
    };
    const { EnclosureType } = await SequelizeManager.getInstance();
    await EnclosureType.create(enclosureType);
  }
}

async function createEnclosure() {
  const { Enclosure, EnclosureType } = await SequelizeManager.getInstance();
  const enclosureTypes = await EnclosureType.findAll();
  for (let i = 0; i < 30; i++) {
    const enclosureType = enclosureTypes[nextInt(enclosureTypes.length - 1)];
    const enclosure = {
      name: faker.system.fileName(),
      description: faker.commerce.productDescription(),
      capacity: faker.datatype.number(),
      visitDuration: faker.datatype.number(),
      handicapAccess: true,
      maintenance: false,
      enclosureTypeId: enclosureType.id,
      openHour: "8:20",
      closeHour: "17:40",
    };
    await Enclosure.create(enclosure);
  }
}

async function createEnclosureImage() {
  const { Enclosure, EnclosureImage } = await SequelizeManager.getInstance();
  const enclosures = await Enclosure.findAll();

  for (let i = 0; i < 100; i++) {
    const enclosure = enclosures[nextInt(enclosures.length) - 1];
    const enclosureImage = {
      title: faker.lorem.word(),
      path: faker.image.animals(),
      enclosureId: enclosure.id,
    };
    await EnclosureImage.create(enclosureImage);
  }
}

async function createEnclosureServiceBook() {
  const {
    User,
    EnclosureServiceBook,
    Enclosure,
  } = await SequelizeManager.getInstance();
  const employees = await User.findAndCountAll({
    where: { userRoleId: { [Op.ne]: 6 } },
  });
  const enclosures = await Enclosure.findAndCountAll();

  for (let i = 0; i < 200; i++) {
    const employee = employees.rows[nextInt(employees.count - 1)];
    const enclosure = enclosures.rows[nextInt(enclosures.count) - 1];
    const enclosureServiceBook = {
      date: faker.date.past(),
      description: faker.lorem.paragraph(),
      enclosureId: enclosure.id,
      userId: employee.id,
    };
    await EnclosureServiceBook.create(enclosureServiceBook);
  }
}

async function createSpecies() {
  const species = [
    "dog",
    "cat",
    "snake",
    "bear",
    "lion",
    "cetacean",
    "horse",
    "bird",
    "cow",
    "fish",
    "crocodilia",
    "insect",
    "rabbit",
    "type",
  ];
  const { Specie } = await SequelizeManager.getInstance();
  species.forEach(async (name) => {
    await Specie.create({
      name,
      description: faker.lorem.paragraph(),
      origin: faker.lorem.word(),
    });
  });
}

async function createAnimals() {
  const { Specie, Animal, Enclosure } = await SequelizeManager.getInstance();
  const enclosures = await Enclosure.findAll();
  const species = await Specie.findAll();
  for (let i = 0; i < 200; i++) {
    const specie = species[nextInt(species.length - 1)];
    const enclosure = enclosures[nextInt(enclosures.length - 1)];
    const animal = {
      name: faker.name.findName(),
      description: faker.lorem.paragraph(),
      birthdate: faker.date.past().toISOString(),
      image: faker.image.animals(),
      enclosureId: enclosure.id,
      specieId: specie.id,
    };
    await Animal.create(animal);
  }
}

async function createAnimalHealthBook() {
  const {
    Animal,
    AnimalHealthBook,
    User,
  } = await SequelizeManager.getInstance();
  const animals = await Animal.findAll();
  const verterinaires = await User.findAll({ where: { userRoleId: 5 } });
  for (let i = 0; i < 200; i++) {
    const animal = animals[nextInt(animals.length - 1)];
    const verterinaire = verterinaires[nextInt(verterinaires.length - 1)];
    const healthBook = {
      description: faker.lorem.paragraph(),
      date: faker.date.past().toISOString(),
      animalId: animal.id,
      userId: verterinaire.id,
    };
    await AnimalHealthBook.create(healthBook);
  }
}
