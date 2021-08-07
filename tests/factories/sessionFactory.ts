import { getRepository } from "typeorm";
import { v4 as uuid } from "uuid";
import Sessions from "../../src/entities/Sessions";
import { createSignInUser, insertUser } from "./userFactory";

export async function createSession() {
  const user = createSignInUser();
  const userId = await insertUser(user);
  const token = uuid();
  const bb = await getRepository(Sessions).insert({ userId, token });

  return token;
}
