import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import User from "../entities/User";
import Sessions from "../entities/Sessions";

interface Body {
  email: string;
  password: string;
  confirmPassword: string;
}

export async function postUser(body: Body) {
  const existsUser = await getRepository(User).find({
    where: { email: body.email },
  });

  if (existsUser.length !== 0) {
    return true;
  } else {
    const user = {
      email: body.email,
      password: bcrypt.hashSync(body.password, 12),
    };
    await getRepository(User).insert(user);
    return false;
  }
}

export async function getAndCompareUser(body: {
  email: string;
  password: string;
}) {
  const existsUser = await getRepository(User).findOne({
    where: { email: body.email },
  });

  if (!existsUser) return false;

  if (bcrypt.compareSync(body.password, existsUser.password)) {
    return existsUser.id;
  } else {
    return false;
  }
}

export async function createSession(userId: number) {
  const token = uuid();
  await getRepository(Sessions).insert({ userId, token });
  return token;
}
