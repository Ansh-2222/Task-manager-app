const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/task.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors({ origin: "task-manager-app-nine-plum.vercel.app", credentials: true }));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

module.exports = app;
