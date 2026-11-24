import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "data");

function ensureDir() {
  fs.mkdirSync(dataDir, { recursive: true });
}

function filePath(name) {
  ensureDir();
  return path.join(dataDir, name);
}

function readJson(name, fallback) {
  try {
    const p = filePath(name);
    if (!fs.existsSync(p)) return fallback;
    const raw = fs.readFileSync(p, "utf8");
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(name, data) {
  fs.writeFileSync(filePath(name), JSON.stringify(data, null, 2), "utf8");
}

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getUsers() {
  return readJson("users.json", []);
}

export function saveUsers(users) {
  writeJson("users.json", users);
}

export function getContacts() {
  return readJson("contacts.json", []);
}

export function saveContacts(contacts) {
  writeJson("contacts.json", contacts);
}

export function getProjects() {
  return readJson("projects.json", []);
}

export function saveProjects(projects) {
  writeJson("projects.json", projects);
}

export function createId(prefix) {
  return makeId(prefix);
}