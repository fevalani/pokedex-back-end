import { getRepository } from "typeorm";
import Pokemons from "../../src/entities/Pokemons";
import PokemonsUsers from "../../src/entities/PokemonsUsers";
import User from "../../src/entities/User";
import { insertPokemon } from "./pokemonFactory";
import { createSignInUser, insertUser } from "./userFactory";

export async function createPokemonUser() {
  const userId = await insertUser(createSignInUser());
  const pokemonId = await insertPokemon();

  await getRepository(PokemonsUsers).insert({ userId, pokemonId });
  return { userId, pokemonId };
}
