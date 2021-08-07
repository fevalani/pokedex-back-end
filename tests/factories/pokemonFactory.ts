import { getRepository } from "typeorm";
import faker from "faker";
import Pokemons from "../../src/entities/Pokemons";

interface Pokemon {
  name: string;
  number: number;
  image: string;
  weight: number;
  height: number;
  baseExp: number;
  description: string;
}

export function createPokemon() {
  const pokemon = {
    name: faker.name.findName(),
    number: faker.datatype.number(),
    image: faker.internet.url(),
    weight: faker.datatype.number(),
    height: faker.datatype.number(),
    baseExp: faker.datatype.number(),
    description: faker.lorem.paragraph(),
  };
  return pokemon;
}

export async function insertPokemon() {
  const pokemon: Pokemon = createPokemon();
  return (await getRepository(Pokemons).insert(pokemon)).identifiers[0].id;
}
