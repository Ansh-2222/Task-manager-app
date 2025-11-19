const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../models");
const User = db.User;

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const exists = await User.findOne({ where: { username } });
  if (exists) return res.status(400).json({ error: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ username, password: hashed });

  res.json({ message: "User registered" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(404).json({ error: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(403).json({ error: "Wrong password" });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });

  res.json({ token, username });
});

module.exports = router;
