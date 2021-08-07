import { getRepository } from "typeorm";
import Pokemons from "../../src/entities/Pokemons";
import PokemonsUsers from "../../src/entities/PokemonsUsers";
import Sessions from "../../src/entities/Sessions";

import User from "../../src/entities/User";

export async function clearDatabase() {
  await getRepository(Sessions).delete({});
  await getRepository(PokemonsUsers).delete({});
  await getRepository(Pokemons).delete({});
  await getRepository(User).delete({});
}
