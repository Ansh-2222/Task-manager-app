const express = require("express");
const router = express.Router();
const db = require("../models");
const Task = db.Task;

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll({ order: [["createdAt", "DESC"]] });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE a task
router.post("/", async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const task = await Task.create({ title, description, priority });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE or toggle
router.patch("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    const { title, description, priority, status } = req.body;

    if (!title && !description && !priority && !status) {
      // toggle
      task.status = task.status === "pending" ? "completed" : "pending";
    } else {
      if (title !== undefined) task.title = title;
      if (description !== undefined) task.description = description;
      if (priority !== undefined) task.priority = priority;
      if (status !== undefined) task.status = status;
    }

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    await task.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
