import { getRepository } from "typeorm";
import faker from "faker";

import User from "../../src/entities/User";

export async function createUser() {
  const password = faker.internet.password();
  const user = {
    email: faker.internet.email(),
    password,
    confirmPassword: password,
  };

  await getRepository(User).insert(user);

  return user;
}
