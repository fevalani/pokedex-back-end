import { getRepository } from "typeorm";
import Pokemons from "../entities/Pokemons";
import PokemonsUsers from "../entities/PokemonsUsers";

interface Poke {
  id: number;
  name: string;
  number: number;
  image: string;
  weight: number;
  height: number;
  baseExp: number;
  description: string;
  inMyPokemons: boolean;
}

export async function getPokemons() {
  const pokemons: Pokemons[] = await getRepository(Pokemons).find();
  return pokemons;
}

export async function getPokemonsUserIds(userId: number) {
  const pokemonsUserIds = (
    await getRepository(PokemonsUsers).find({ userId })
  ).map((item) => item.pokemonId);
  return pokemonsUserIds;
}

export function createSendPokemonObject(
  allPokemons: Pokemons[],
  userPokemonsIds: number[]
) {
  interface userPokemonId {
    [key: number]: boolean;
  }
  const userPokemonsId: userPokemonId = {};
  userPokemonsIds.forEach((item) => {
    userPokemonsId[item] = true;
  });

  const newArray: Array<Poke> = allPokemons.map((pokemon) => {
    return {
      ...pokemon,
      inMyPokemons: userPokemonsId[pokemon.id] ? true : false,
    };
  });

  return newArray;
}

export async function insertPokemonUser(body: {
  userId: number;
  pokemonId: number;
}) {
  await getRepository(PokemonsUsers).insert(body);
  return;
}

export async function dropPokemonUser(body: {
  userId: number;
  pokemonId: number;
}) {
  await getRepository(PokemonsUsers).delete(body);
  return;
}
