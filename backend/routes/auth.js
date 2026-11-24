import express from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/User.js";
import { requireAuth, signToken } from "../middleware/auth.js";
import { createId, getUsers, saveUsers } from "../store.js";

const router = express.Router();

function getEnvAdmin() {
  const email = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD || "";
  const name = process.env.ADMIN_NAME || "Admin";
  return { email, password, name };
}

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }
    if (String(password).length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const adminEmail = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();

    if (mongoose.connection.readyState === 1) {
      const existing = await User.findOne({ email: normalizedEmail });
      if (existing) return res.status(400).json({ message: "Email already registered" });

      const hashed = await bcrypt.hash(password, 10);
      const userCount = await User.countDocuments();
      const role = (adminEmail && normalizedEmail === adminEmail) || userCount === 0 ? "admin" : "user";
      const user = await User.create({ name, email: normalizedEmail, password: hashed, role });
      const token = signToken(user);
      return res.status(201).json({
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      });
    }

    const users = getUsers();
    if (users.some((u) => u.email === normalizedEmail)) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const role = (adminEmail && normalizedEmail === adminEmail) || users.length === 0 ? "admin" : "user";
    const user = {
      _id: createId("user"),
      name,
      email: normalizedEmail,
      password: hashed,
      role,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    saveUsers(users);
    const token = signToken(user);
    return res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const envAdmin = getEnvAdmin();
    if (envAdmin.email && envAdmin.password && normalizedEmail === envAdmin.email && String(password) === envAdmin.password) {
      const adminUser = { _id: "env-admin", name: envAdmin.name, email: envAdmin.email, role: "admin" };
      const token = signToken(adminUser);
      return res.json({ token, user: { id: adminUser._id, name: adminUser.name, email: adminUser.email, role: adminUser.role } });
    }

    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email: normalizedEmail });
      if (!user) return res.status(400).json({ message: "Invalid email or password" });
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.status(400).json({ message: "Invalid email or password" });
      const token = signToken(user);
      return res.json({
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      });
    }

    const users = getUsers();
    const user = users.find((u) => u.email === normalizedEmail);
    if (!user) return res.status(400).json({ message: "Invalid email or password" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid email or password" });
    const token = signToken(user);
    return res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

router.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

export default router;