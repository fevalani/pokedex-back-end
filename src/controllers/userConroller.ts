import { Request, Response } from "express";
import { UserSchema, SignInSchema } from "../schemas/Schemas";

import * as userService from "../services/userService";

export async function postUsers(req: Request, res: Response) {
  const { body } = req;
  if (!!UserSchema.validate(body).error) {
    return res.sendStatus(400);
  }
  if (await userService.postUser(body)) {
    return res.sendStatus(409);
  } else {
    return res.sendStatus(201);
  }
}

export async function sendToken(req: Request, res: Response) {
  const { body } = req;
  if (!!SignInSchema.validate(body).error) {
    return res.sendStatus(400);
  }
  const userId = await userService.getAndCompareUser(body);

  if (userId) {
    const token = await userService.createSession(userId);
    res.send({ token });
  } else {
    return res.sendStatus(401);
  }
}
