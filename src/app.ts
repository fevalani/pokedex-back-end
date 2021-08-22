import "./setup";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userConroller";
import * as pokemonController from "./controllers/pokemonController";
import { authenticate } from "./middlewares/authMiddleware";

const app = express();
app.use(cors());
app.use(express.json());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.sendStatus(500);
});

app.post("/sign-up", userController.postUsers);
app.post("/sign-in", userController.sendToken);

app.get("/pokemons", authenticate, pokemonController.getPokemons);
app.post(
  "/my-pokemons/:id/add",
  authenticate,
  pokemonController.addToMyPokemons
);
app.post(
  "/my-pokemons/:id/remove",
  authenticate,
  pokemonController.removeFromMyPokemons
);

export async function init() {
  await connectDatabase();
}

export default app;
