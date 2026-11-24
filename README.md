# MERN Portfolio Website

A full-stack personal portfolio web app built with **React + Vite** on the frontend and **Node.js + Express** on the backend. It includes portfolio sections, user authentication, an admin workflow for managing projects/messages, contact form submissions, and support for MongoDB with a local JSON-file fallback.

## Features

- **Portfolio UI**: Home, About, Projects, and Contact sections.
- **Authentication**: Signup/login with JWT-based auth and persistent session via token.
- **Admin capabilities**:
  - Add portfolio projects (name, description, image URL, source URL, and video upload or video link).
  - View submitted contact messages in the admin panel.
- **Projects**: Public project listing fetched from the backend.
- **Contact form**: Stores messages; if a user is logged in, message submissions can include user details.
- **Media uploads**: Video uploads stored on the backend and served from `/uploads`.
- **Database flexibility**:
  - Uses **MongoDB (Mongoose)** when `MONGODB_URI` is configured and reachable.
  - Falls back to **local JSON storage** (`backend/data/*.json`) if MongoDB is unavailable.

## Tech Stack

**Frontend**
- React 19
- Vite
- Tailwind CSS
- React Icons, React Scroll, React Typed

**Backend**
- Node.js, Express 5
- MongoDB, Mongoose
- JWT (`jsonwebtoken`), password hashing (`bcryptjs`)
- File uploads (`multer`)
- CORS, dotenv

## Project Structure

```text
my-portfolio/
├── backend/                 # Express API, auth, DB/local store, uploads
│   ├── data/                # Local JSON fallback data (runtime, ignored by git)
│   ├── middleware/          # Auth and upload middleware
│   ├── models/              # Mongoose models (User, Project, Contact)
│   ├── routes/              # API routes (auth, projects, contact)
│   ├── uploads/             # Uploaded files (runtime, ignored by git)
│   ├── connectdb.js         # MongoDB connection helper
│   ├── store.js             # Local JSON storage fallback helpers
│   └── index.js             # Server entry point
├── frontend/                # React + Vite client
│   ├── public/
│   └── src/
│       ├── components/      # UI sections/modals (Navbar, Home, Projects, Admin, etc.)
│       ├── context/         # Auth context
│       └── lib/             # API helper
├── .gitignore
└── README.md
```

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended) and npm
- [MongoDB](https://www.mongodb.com/) connection string (optional but recommended for production)
- Git

## Getting Started (Local Development)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd my-portfolio
```

### 2. Install dependencies

Install backend and frontend dependencies separately:

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 3. Configure backend environment variables

Create an environment file in `backend/` (for example `.env.local`) and add your values:

```env
# Server
PORT=5000
JWT_SECRET=your_jwt_secret_here

# MongoDB (optional; app can fall back to local JSON storage if unavailable)
MONGODB_URI=your_mongodb_connection_string

# Admin bootstrap/login (optional)
ADMIN_NAME=Your Admin Name
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_strong_password
```

> **Notes**
> - The backend loads environment files in this order: `atlas-credentials.env`, `.env.local`, then default `.env` (via `dotenv`).
> - Do **not** commit real secrets or credentials. `.env*`, `*.env`, and local credential files are ignored by Git.
> - If `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set, that admin can log in with those credentials. The server also attempts to create/update the admin user on startup.
> - If MongoDB connection fails (or `MONGODB_URI` is missing), the server starts with local file storage fallback.

### 4. Run the backend

```bash
cd backend
npm run dev
# or
npm start
```

Backend runs on `http://localhost:5000` by default.

### 5. Run the frontend

In a separate terminal:

```bash
cd frontend
npm run dev
```

Vite dev server runs on the URL shown in the terminal (commonly `http://localhost:5173`).

During development, the Vite config proxies:
- `/api` → `http://localhost:5000`
- `/uploads` → `http://localhost:5000`

## Available Scripts

### Backend (`backend/package.json`)
- `npm run dev` – start server with watch mode (`node --watch index.js`)
- `npm start` – start server (`node index.js`)

### Frontend (`frontend/package.json`)
- `npm run dev` – start Vite dev server
- `npm run build` – create production build
- `npm run preview` – preview production build locally
- `npm run lint` – run ESLint

## API Overview

Base URL (local): `http://localhost:5000`

### Health
- `GET /api/health` – server health check

### Auth
- `POST /api/auth/signup` – create a user account
- `POST /api/auth/login` – log in and receive JWT
- `GET /api/auth/me` – get current user (requires `Authorization: Bearer <token>`)

### Projects
- `GET /api/projects` – list projects
- `POST /api/projects` – create project (**admin only**, multipart/form-data; supports fields like `name`, `description`, `imageUrl`, `sourceUrl`, `videoLink`, and `video` file)

### Contact
- `POST /api/contact` – submit contact message
- `GET /api/contact` – list contact messages (**admin only**)

### Uploads
- `GET /uploads/...` – serves uploaded files (e.g. project videos)

## Deployment (Going Live)

This project has separate frontend and backend apps, so deploy them accordingly.

### Backend
- Deploy the `backend/` app to a Node-compatible host (e.g. Render, Railway, VPS, etc.).
- Set environment variables (`PORT`, `JWT_SECRET`, `MONGODB_URI`, admin vars as needed).
- Ensure the host allows file writes if you rely on uploads/local fallback storage (ephemeral filesystems may not persist uploads or JSON data). For production, prefer MongoDB and durable object storage for uploads.

### Frontend
- Build from `frontend/`:
  ```bash
  npm run build
  ```
- Deploy the generated `frontend/dist/` to a static host (e.g. Vercel, Netlify, etc.).

### Frontend ↔ Backend connectivity
- In development, the frontend uses relative paths (`/api`, `/uploads`) with a Vite proxy.
- In production, you must either:
  - **Serve frontend and backend under the same domain** and proxy `/api` and `/uploads` to the backend, **or**
  - **Configure a backend base URL** in the frontend (e.g. add `VITE_API_BASE_URL` support in `frontend/src/lib/api.js`) and update upload/media URLs as needed.