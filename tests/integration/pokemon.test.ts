import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createSession } from "../factories/sessionFactory";
import {
  createSignInUser,
  createSignUpUser,
  insertUser,
} from "../factories/userFactory";
import { clearDatabase } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await clearDatabase();
  await getConnection().close();
});

describe("GET /pokemons", () => {
  it("should answer status 200 for valid token", async () => {
    const token = await createSession();

    const response = await supertest(app)
      .get("/pokemons")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should answer status 401 for invalid token", async () => {
    let token = "whatever";

    const response = await supertest(app)
      .get("/pokemons")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(401);
  });
});
