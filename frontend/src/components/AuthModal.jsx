import { useState } from "react";
import { apiRequest } from "../lib/api";
import { useAuth } from "../context/AuthContext";

const AuthModal = ({ open, mode = "login", onClose, onModeChange }) => {
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const isSignup = mode === "signup";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const path = isSignup ? "/api/auth/signup" : "/api/auth/login";
      const payload = isSignup
        ? { name: form.name, email: form.email, password: form.password }
        : { email: form.email, password: form.password };
      const data = await apiRequest(path, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      login(data.token, data.user);
      setForm({ name: "", email: "", password: "" });
      onClose();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-emerald-700">
            {isSignup ? "Sign Up" : "Login"}
          </h2>
          <button onClick={onClose} className="text-xl font-bold text-gray-600 hover:text-black">×</button>
        </div>

        <div className="mb-4 flex gap-2">
          <button
            type="button"
            onClick={() => onModeChange("login")}
            className={`rounded px-3 py-1 text-sm font-semibold ${!isSignup ? "bg-emerald-700 text-white" : "bg-gray-200"}`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => onModeChange("signup")}
            className={`rounded px-3 py-1 text-sm font-semibold ${isSignup ? "bg-emerald-700 text-white" : "bg-gray-200"}`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {isSignup && (
            <div>
              <label className="font-semibold">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required={isSignup}
                className="mt-1 w-full rounded-md border border-gray-300 p-2"
                placeholder="Enter your name"
              />
            </div>
          )}
          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
              placeholder="Email address"
            />
          </div>
          <div>
            <label className="font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
              placeholder="Password"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-black px-4 py-2 font-semibold text-white hover:bg-gray-900 disabled:opacity-60"
          >
            {loading ? "Please wait..." : isSignup ? "Create account" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;