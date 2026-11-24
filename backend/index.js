import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { connectdb } from "./connectdb.js";
import User from "./models/User.js";
import { createId, getUsers, saveUsers } from "./store.js";
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projects.js";
import contactRoutes from "./routes/contact.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "atlas-credentials.env") });
dotenv.config({ path: path.join(__dirname, ".env.local") });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

async function ensureAdminUser() {
  const email = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();
  const password = process.env.ADMIN_PASSWORD || "";
  const name = process.env.ADMIN_NAME || "Admin";
  if (!email || !password) return;

  const hashed = await bcrypt.hash(password, 10);

  if (mongoose.connection.readyState === 1) {
    const existing = await User.findOne({ email });
    if (!existing) {
      await User.create({ name, email, password: hashed, role: "admin" });
      console.log("Admin user created");
      return;
    }
    existing.name = existing.name || name;
    existing.role = "admin";
    existing.password = hashed;
    await existing.save();
    console.log("Admin user updated");
    return;
  }

  const users = getUsers();
  const idx = users.findIndex((u) => u.email === email);
  if (idx === -1) {
    users.push({ _id: createId("user"), name, email, password: hashed, role: "admin", createdAt: new Date().toISOString() });
    saveUsers(users);
    console.log("Admin user created in local store");
  } else {
    users[idx].name = users[idx].name || name;
    users[idx].role = "admin";
    users[idx].password = hashed;
    saveUsers(users);
    console.log("Admin user updated in local store");
  }
}

connectdb()
  .then(async () => {
    console.log("MongoDB connected");
    try {
      await ensureAdminUser();
    } catch (err) {
      console.error("Failed to ensure admin user:", err.message);
    }
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(async (err) => {
    console.error("MongoDB connection failed:", err.message);
    console.log("Starting server with local file storage fallback.");
    try {
      await ensureAdminUser();
    } catch (e) {
      console.error("Failed to ensure admin user in local store:", e.message);
    }
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  });