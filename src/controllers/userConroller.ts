import { Request, Response } from "express";

import * as userService from "../services/userService";

export async function postUsers(req: Request, res: Response) {
  try {
    req.body;
    const users = await userService.postUser();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}
