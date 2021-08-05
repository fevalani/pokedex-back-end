import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
import { createUser } from "../factories/userFactory";
import { clearDatabase } from "../utils/database";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await getConnection().close();
});

describe("GET /sign-up", () => {
  it("should answer status 201 for valid params", async () => {
    const user = await createUser();

    const response = await supertest(app).get("/sign-up");

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: user.email,
        }),
      ])
    );

    expect(response.status).toBe(200);
  });

  it("should answer status 400 for invalid e-mail", async () => {});

  it("should answer status 409 for exists emails", async () => {});

  it("should answer status 400 if ", async () => {});
});
