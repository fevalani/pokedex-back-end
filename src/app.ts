import "./setup";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "reflect-metadata";

import connectDatabase from "./database";

import * as userController from "./controllers/userConroller";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", userController.postUsers);

app.post("/sign-in", userController.sendToken);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.sendStatus(500);
});

export async function init() {
  await connectDatabase();
}

export default app;
