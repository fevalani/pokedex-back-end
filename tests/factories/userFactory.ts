import { getRepository } from "typeorm";
import faker from "faker";

import User from "../../src/entities/User";

export async function createUser() {
  const user = await getRepository(User).create({
    email: faker.internet.email(),
    password: faker.internet.password(),
  });

  await getRepository(User).save(user);

  return user;
}
