import express from "express";
import mongoose from "mongoose";
import Project from "../models/Project.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { uploadVideo } from "../middleware/upload.js";
import { createId, getProjects, saveProjects } from "../store.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const projects = await Project.find().sort({ createdAt: -1 });
      return res.json({ projects });
    }
    const projects = getProjects();
    res.json({ projects });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch projects", error: err.message });
  }
});

router.post("/", requireAuth, requireAdmin, (req, res) => {
  uploadVideo.single("video")(req, res, async (uploadErr) => {
    if (uploadErr) {
      return res.status(400).json({ message: uploadErr.message || "Video upload failed" });
    }
    try {
      const { name, description, imageUrl, sourceUrl, videoLink } = req.body || {};
      if (!name || !description) {
        return res.status(400).json({ message: "Project name and description are required" });
      }
      const videoUrl = req.file ? `/uploads/videos/${req.file.filename}` : (videoLink || "");

      if (mongoose.connection.readyState === 1) {
        const project = await Project.create({
          name,
          description,
          imageUrl: imageUrl || "",
          sourceUrl: sourceUrl || "",
          videoUrl,
          createdBy: req.user._id,
        });
        return res.status(201).json({ project });
      }

      const projects = getProjects();
      const project = {
        _id: createId("project"),
        name,
        description,
        imageUrl: imageUrl || "",
        sourceUrl: sourceUrl || "",
        videoUrl,
        createdBy: req.user._id || "env-admin",
        createdAt: new Date().toISOString(),
      };
      projects.unshift(project);
      saveProjects(projects);
      res.status(201).json({ project });
    } catch (err) {
      res.status(500).json({ message: "Failed to add project", error: err.message });
    }
  });
});

export default router;