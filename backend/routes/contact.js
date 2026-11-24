import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Contact from "../models/Contact.js";
import User from "../models/User.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { createId, getContacts, getUsers, saveContacts } from "../store.js";

const router = express.Router();

async function getOptionalUser(req) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return null;
    const secret = process.env.JWT_SECRET || "dev-secret-change-me";
    const decoded = jwt.verify(token, secret);
    if (decoded.id === "env-admin") {
      return {
        _id: "env-admin",
        name: process.env.ADMIN_NAME || "Admin",
        email: (process.env.ADMIN_EMAIL || "").toLowerCase().trim(),
        role: "admin",
      };
    }
    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(decoded.id).select("-password");
      return user;
    }
    const localUser = getUsers().find((u) => String(u._id) === String(decoded.id));
    return localUser || null;
  } catch {
    return null;
  }
}

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email and message are required" });
    }

    const loggedInUser = await getOptionalUser(req);
    const userDetails = loggedInUser
      ? {
          id: String(loggedInUser._id),
          name: loggedInUser.name || "",
          email: loggedInUser.email || "",
          role: loggedInUser.role || "",
        }
      : null;

    if (mongoose.connection.readyState === 1) {
      const doc = await Contact.create({
        name,
        email,
        message,
        user: userDetails || undefined,
      });
      return res.status(201).json({ message: "Message received successfully", contact: doc });
    }

    const contacts = getContacts();
    const doc = {
      _id: createId("contact"),
      name,
      email,
      message,
      user: userDetails,
      createdAt: new Date().toISOString(),
    };
    contacts.unshift(doc);
    saveContacts(contacts);
    res.status(201).json({ message: "Message received successfully", contact: doc });
  } catch (err) {
    res.status(500).json({ message: "Failed to submit contact form", error: err.message });
  }
});

router.get("/", requireAuth, requireAdmin, async (_req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const messages = await Contact.find().sort({ createdAt: -1 }).limit(100);
      return res.json({ messages });
    }
    const messages = getContacts().slice(0, 100);
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages", error: err.message });
  }
});

export default router;