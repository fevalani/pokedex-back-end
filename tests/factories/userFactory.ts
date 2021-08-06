import { getRepository } from "typeorm";
import faker from "faker";

import User from "../../src/entities/User";

export function createUser() {
  const password = faker.internet.password();
  const user = {
    email: faker.internet.email(),
    password,
    confirmPassword: password,
  };

  return user;
}

export async function insertUser(user: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  await getRepository(User).insert(user);
}
