import { Response, Request } from "express";

import axios from "axios";
import Pokemons from "../entities/Pokemons";
import { getRepository } from "typeorm";
import * as pokemonService from "../services/pokemonService";

export async function getPokemons(req: Request, res: Response) {
  const userId: number = res.locals["userId"];

  const userPokemonsIds = await pokemonService.getPokemonsUserIds(userId);
  const allPokemons = await pokemonService.getPokemons();

  const pokemonsArray = pokemonService.createSendPokemonObject(
    allPokemons,
    userPokemonsIds
  );
  res.send(pokemonsArray);
}

export async function addToMyPokemons(req: Request, res: Response) {
  const userId: number = res.locals["userId"];
  const pokemonId: number = parseInt(req.params.id);

  await pokemonService.insertPokemonUser({ userId, pokemonId });
  res.sendStatus(200);
}

export async function removeFromMyPokemons(req: Request, res: Response) {
  const userId: number = res.locals["userId"];
  const pokemonId: number = parseInt(req.params.id);

  await pokemonService.deletePokemonUser({ userId, pokemonId });
  res.sendStatus(200);
}

export async function populateDatabase(req: Request, res: Response) {
  console.log("Entrou");
  for (let i = 1; i <= 898; i++) {
    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const newPokemon = {
      name: result.data.name,
      number: result.data.id,
      image: result.data.sprites.front_default,
      weight: result.data.weight,
      height: result.data.height,
      baseExp: result.data.base_experience,
      description: "",
    };
    const speciesResult = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${i}`
    );
    for (let j = 0; j < speciesResult.data.flavor_text_entries.length; j++) {
      if (speciesResult.data.flavor_text_entries[j].language.name === "en") {
        newPokemon.description = speciesResult.data.flavor_text_entries[
          j
        ].flavor_text
          .split("\n")
          .join(" ");
      }
    }
    await getRepository(Pokemons).insert(newPokemon);
  }
  res.send("OK");
}
