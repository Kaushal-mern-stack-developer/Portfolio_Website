import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/User.js";
import { getUsers } from "../store.js";

function getJwtSecret() {
  return process.env.JWT_SECRET || "dev-secret-change-me";
}

export function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, getJwtSecret(), { expiresIn: "7d" });
}

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: "Authentication required" });
    const decoded = jwt.verify(token, getJwtSecret());

    if (decoded.id === "env-admin") {
      req.user = {
        _id: "env-admin",
        name: process.env.ADMIN_NAME || "Admin",
        email: (process.env.ADMIN_EMAIL || "").toLowerCase().trim(),
        role: "admin",
      };
      return next();
    }

    if (mongoose.connection.readyState === 1) {
      const user = await User.findById(decoded.id).select("-password");
      if (!user) return res.status(401).json({ message: "Invalid user" });
      req.user = user;
      return next();
    }

    const localUser = getUsers().find((u) => String(u._id) === String(decoded.id));
    if (!localUser) return res.status(401).json({ message: "Invalid user" });
    const { password, ...safeUser } = localUser;
    req.user = safeUser;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
}