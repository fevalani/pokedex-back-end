import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

import User from "../entities/User";

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
