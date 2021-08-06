import { getRepository } from "typeorm";
import faker from "faker";
import bcrypt from "bcrypt";

import User from "../../src/entities/User";

export function createSignUpUser() {
  const password = faker.internet.password();
  const user = {
    email: faker.internet.email(),
    password,
    confirmPassword: password,
  };

  return user;
}

export function createSignInUser() {
  const user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  return user;
}

export async function insertUser(user: { email: string; password: string }) {
  const { email, password } = user;
  const newPassword = bcrypt.hashSync(password, 12);
  return await (
    await getRepository(User).insert({ email, password: newPassword })
  ).identifiers[0].id;
}
