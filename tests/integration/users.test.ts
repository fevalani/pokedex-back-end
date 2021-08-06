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

describe("POST /sign-up", () => {
  it("should answer status 201 for valid params", async () => {
    const user = await createUser();

    const response = await supertest(app).post("/sign-up").send(user);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: user.email,
          password: user.password,
        }),
      ])
    );

    expect(response.status).toBe(201);
  });

  it("should answer status 400 for invalid email", async () => {});

  it("should answer status 409 for exists email", async () => {});

  it("should answer status 400 if password and ConfirmPassword are different ", async () => {});
});
