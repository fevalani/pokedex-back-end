import { getRepository } from "typeorm";
import Pokemons from "../entities/Pokemons";
import PokemonsUsers from "../entities/PokemonsUsers";

export async function getPokemons() {
  const pokemons = await getRepository(Pokemons).find();
  return pokemons;
}

export async function getMyPokemonsIds(userId: number) {
  const myPokemonsIds = (
    await getRepository(PokemonsUsers).find({ userId })
  ).map((item) => item.pokemonId);
  return myPokemonsIds;
}

export function createSendPokemonObject(pokemonsIds, pokemons) {
  return false;
}
