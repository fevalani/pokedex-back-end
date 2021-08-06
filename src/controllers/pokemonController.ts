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
