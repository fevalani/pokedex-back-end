import supertest from "supertest";
import { getConnection } from "typeorm";

import app, { init } from "../../src/app";
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

describe("POST /sign-up", () => {
  it("should answer status 201 for valid params", async () => {
    const user = createSignUpUser();

    const response = await supertest(app).post("/sign-up").send(user);

    expect(response.status).toBe(201);
  });

  it("should answer status 400 for invalid email", async () => {
    const user = createSignUpUser();
    user.email = "whatever";

    const response = await supertest(app).post("/sign-up").send(user);

    expect(response.status).toBe(400);
  });

  it("should answer status 400 if password and ConfirmPassword are different ", async () => {
    let user = createSignUpUser();
    user.confirmPassword = "whatever";

    const response = await supertest(app).post("/sign-up").send(user);

    expect(response.status).toBe(400);
  });

  it("should answer status 409 for exist email", async () => {
    const user = createSignUpUser();
    await insertUser({ email: user.email, password: user.password });

    const response = await supertest(app).post("/sign-up").send(user);

    expect(response.status).toBe(409);
  });
});

describe("POST /sign-in", () => {
  it("should answer status 200 for valid params", async () => {
    const user = createSignInUser();
    await insertUser(user);

    const response = await supertest(app).post("/sign-in").send(user);

    expect(response.status).toBe(200);
  });

  it("should answer status 400 for invalid email", async () => {
    const user = createSignInUser();
    user.email = "whatever";

    const response = await supertest(app).post("/sign-in").send(user);

    expect(response.status).toBe(400);
  });

  it("should answer status 401 if user and password isnt match", async () => {
    const user = createSignInUser();
    await insertUser(user);
    user.password = "whatever";

    const response = await supertest(app).post("/sign-in").send(user);

    expect(response.status).toBe(401);
  });
});
