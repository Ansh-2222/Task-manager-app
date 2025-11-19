const request = require("supertest");
const app = require("../src/models/app");
const db = require("../src/models");

beforeAll(async () => {
  await db.sequelize.sync({ force: true });
});

afterAll(async () => {
  await db.sequelize.close();
});

describe("Task API", () => {
  test("POST creates a task with priority", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "Test", priority: "high" });

    expect(res.statusCode).toBe(201);
    expect(res.body.priority).toBe("high");
  });

  test("PATCH updates priority", async () => {
    const task = await request(app).post("/api/tasks").send({ title: "Test" });

    const updated = await request(app)
      .patch(`/api/tasks/${task.body.id}`)
      .send({ priority: "low" });

    expect(updated.body.priority).toBe("low");
  });
});
