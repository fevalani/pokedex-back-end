import { Response, Request } from "express";

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

export async function catchPokemon(req: Request, res: Response) {
  const userId: number = res.locals["userId"];
  const pokemonId: number = parseInt(req.params.id);

  await pokemonService.insertPokemonUser({ userId, pokemonId });
  res.sendStatus(200);
}

export async function dropPokemon(req: Request, res: Response) {
  const userId: number = res.locals["userId"];
  const pokemonId: number = parseInt(req.params.id);

  await pokemonService.dropPokemonUser({ userId, pokemonId });
  res.sendStatus(200);
}
