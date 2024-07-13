const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const User = require("../src/models/userModel");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("User API", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/api/users").send({
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
  });

  it("should get all users", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  // Additional tests for getUserById, updateUser, and deleteUser can be added similarly
});
