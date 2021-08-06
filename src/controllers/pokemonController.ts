import { Response, Request } from "express";

import * as pokemonService from "../services/pokemonService";

export async function getPokemons(req: Request, res: Response) {
  const userId = res.locals.userId;
  const allPokemons = await pokemonService.getPokemons();
  const myPokemonsIds = await pokemonService.getMyPokemonsIds(userId);
  const pokemons = pokemonService.createSendPokemonObject(
    myPokemonsIds,
    allPokemons
  );
  res.send(pokemons);
}
