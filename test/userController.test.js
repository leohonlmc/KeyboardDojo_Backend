const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../index"); // Adjust the path as necessary
const {
  createUser,
  getLeaderBoard,
  getUsers,
} = require("../controllers/authController");
const { getChat, createChat } = require("../controllers/chatController");

beforeAll(async () => {
  // Connect to a test database
  await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}, 10000);

afterAll(async () => {
  // Disconnect after tests are finished
  await mongoose.connection.close();
});

describe("User Routes", () => {
  // Test for user login
  it("should login a user", async () => {
    const userData = { email: "john@example.com", password: "password123" };
    const response = await request(app).post("/login").send(userData);

    expect(response.statusCode).toBe(200);
  }, 10000);

  //getLeaderBoard
  it("should get the leaderboard", async () => {
    const response = await request(app).get("/leaderboard");

    expect(response.statusCode).toBe(200);
  }, 10000);

  //getUsers
  it("should get all users", async () => {
    const response = await request(app).get("/users");

    expect(response.statusCode).toBe(200);
  }, 10000);

  //getChat
  it("should get all chat", async () => {
    const response = await request(app).get("/api/chat");

    expect(response.statusCode).toBe(200);
  }, 10000);

  //createChat
  it("should create a chat", async () => {
    const chatData = {
      id: "657145aa721b4e6732c535c6",
      email: "leo@gmail.com",
      chat: "Hello",
    };
    const response = await request(app).post("/chat").send(chatData);

    expect(response.statusCode).toBe(201);
  }, 10000);
});
