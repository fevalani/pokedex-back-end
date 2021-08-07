import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import Sessions from "../entities/Sessions";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization.split("Bearer ")[1];
  const existsToken = await getRepository(Sessions).findOne({ token });

  if (!existsToken) return res.sendStatus(401);
  res.locals = { userId: existsToken.id };
  next();
}
