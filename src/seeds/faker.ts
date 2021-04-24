import faker from "faker";
import { SequelizeManager } from "../utils/db";
import { hash } from "argon2";
import { Op } from "sequelize";
import { IUser_Instance } from "../models";

export async function initFaker(): Promise<void> {
  // await createUser();
  // await createEncosureType();
  // await createEncosures();
  // await createEnclosureImage();
  await createEnclosureServiceBook();
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

async function createEncosures() {
  for (let i = 0; i < 30; i++) {
    const enclosure = {
      name: faker.system.fileName(),
      description: faker.commerce.productDescription(),
      capacity: faker.datatype.number(),
      visitDuration: faker.datatype.number(),
      handicapAccess: true,
      maintenance: false,
      enclosureTypeId: faker.datatype.number(5) + 1,
      openHour: "8:20",
      closeHour: "17:40",
    };
    const { Enclosure } = await SequelizeManager.getInstance();
    await Enclosure.create(enclosure);
  }
}

async function createEnclosureImage() {
  for (let i = 0; i < 100; i++) {
    const enclosureImage = {
      title: faker.lorem.word(),
      path: faker.image.animals(),
      enclosureId: faker.datatype.number(30) + 1,
    };
    const { EnclosureImage } = await SequelizeManager.getInstance();
    await EnclosureImage.create(enclosureImage);
  }
}

async function createEnclosureServiceBook() {
  const { User, EnclosureServiceBook } = await SequelizeManager.getInstance();
  const employees = await User.findAndCountAll({
    where: { userRoleId: { [Op.ne]: 6 } },
  });
  for (let i = 0; i < 200; i++) {
    const employee = employees.rows[nextInt(employees.count - 1)];
    const enclosureServiceBook = {
      date: faker.date.past(),
      description: faker.lorem.paragraph(),
      enclosureId: faker.datatype.number(30) + 1,
      userId: employee.id,
    };
    await EnclosureServiceBook.create(enclosureServiceBook);
  }
}

function nextInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}
