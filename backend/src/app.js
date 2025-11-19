const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/task.routes");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "🔥 API Running" });
});

app.use("/api/tasks", taskRoutes);

module.exports = app;
