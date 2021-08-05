import { getRepository } from "typeorm";

import User from "../entities/User";

export async function postUser() {
  const users = await getRepository(User).find({
    select: ["id", "email"],
  });

  return users;
}
