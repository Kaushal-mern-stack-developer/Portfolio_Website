import { useState } from "react";
import { apiRequest } from "../lib/api";

const AdminPanelModal = ({ open, onClose, onProjectAdded }) => {
  const [tab, setTab] = useState("project");
  const [form, setForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
    sourceUrl: "",
    videoLink: "",
    videoFile: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [messages, setMessages] = useState([]);
  const [msgLoading, setMsgLoading] = useState(false);

  const loadMessages = async () => {
    setMsgLoading(true);
    try {
      const data = await apiRequest("/api/contact");
      setMessages(data.messages || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setMsgLoading(false);
    }
  };

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "videoFile") {
      setForm({ ...form, videoFile: files && files[0] ? files[0] : null });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("description", form.description);
      fd.append("imageUrl", form.imageUrl);
      fd.append("sourceUrl", form.sourceUrl);
      fd.append("videoLink", form.videoLink);
      if (form.videoFile) fd.append("video", form.videoFile);

      await apiRequest("/api/projects", { method: "POST", body: fd });
      setSuccess("Project added successfully.");
      setForm({ name: "", description: "", imageUrl: "", sourceUrl: "", videoLink: "", videoFile: null });
      if (onProjectAdded) onProjectAdded();
    } catch (err) {
      setError(err.message || "Failed to add project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 px-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-emerald-700">Admin Panel</h2>
          <button onClick={onClose} className="text-xl font-bold text-gray-600 hover:text-black">×</button>
        </div>

        <div className="mb-4 flex gap-2">
          <button
            type="button"
            onClick={() => setTab("project")}
            className={`rounded px-3 py-1 text-sm font-semibold ${tab === "project" ? "bg-emerald-700 text-white" : "bg-gray-200"}`}
          >
            Add Project
          </button>
          <button
            type="button"
            onClick={() => { setTab("messages"); loadMessages(); }}
            className={`rounded px-3 py-1 text-sm font-semibold ${tab === "messages" ? "bg-emerald-700 text-white" : "bg-gray-200"}`}
          >
            Contact Messages
          </button>
        </div>

        {tab === "project" ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="font-semibold">Project Name</label>
              <input name="name" value={form.name} onChange={handleChange} required className="mt-1 w-full rounded-md border border-gray-300 p-2" placeholder="Short project name" />
            </div>
            <div>
              <label className="font-semibold">Project Details (short)</label>
              <textarea name="description" value={form.description} onChange={handleChange} required rows={3} className="mt-1 w-full rounded-md border border-gray-300 p-2" placeholder="Very short project details" />
            </div>
            <div>
              <label className="font-semibold">Image URL (optional)</label>
              <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className="mt-1 w-full rounded-md border border-gray-300 p-2" placeholder="https://... or leave blank" />
            </div>
            <div>
              <label className="font-semibold">Source Code URL (optional)</label>
              <input name="sourceUrl" value={form.sourceUrl} onChange={handleChange} className="mt-1 w-full rounded-md border border-gray-300 p-2" placeholder="https://github.com/..." />
            </div>
            <div>
              <label className="font-semibold">Small Video Upload (optional)</label>
              <input type="file" name="videoFile" accept="video/*" onChange={handleChange} className="mt-1 w-full rounded-md border border-gray-300 p-2" />
              <p className="mt-1 text-xs text-gray-500">Upload a short/small video, or provide a video link below.</p>
            </div>
            <div>
              <label className="font-semibold">Video Link (optional)</label>
              <input name="videoLink" value={form.videoLink} onChange={handleChange} className="mt-1 w-full rounded-md border border-gray-300 p-2" placeholder="https://..." />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-700">{success}</p>}
            <button type="submit" disabled={loading} className="w-full rounded-md bg-black px-4 py-2 font-semibold text-white hover:bg-gray-900 disabled:opacity-60">
              {loading ? "Adding..." : "Add Project"}
            </button>
          </form>
        ) : (
          <div className="space-y-3">
            {msgLoading && <p>Loading messages...</p>}
            {!msgLoading && messages.length === 0 && <p className="text-gray-600">No contact messages yet.</p>}
            {messages.map((m) => (
              <div key={m._id} className="rounded-md border border-gray-300 p-3">
                <p className="font-semibold">Form Details</p>
                <p className="text-sm"><span className="font-semibold">Name:</span> {m.name}</p>
                <p className="text-sm"><span className="font-semibold">Email:</span> {m.email}</p>
                <p className="text-sm"><span className="font-semibold">Message:</span> {m.message}</p>

                <div className="mt-2 border-t border-gray-200 pt-2">
                  <p className="font-semibold">User Details</p>
                  {m.user && (m.user.name || m.user.email || m.user.role || m.user.id) ? (
                    <>
                      <p className="text-sm"><span className="font-semibold">Name:</span> {m.user.name || "-"}</p>
                      <p className="text-sm"><span className="font-semibold">Email:</span> {m.user.email || "-"}</p>
                      <p className="text-sm"><span className="font-semibold">Role:</span> {m.user.role || "-"}</p>
                      <p className="text-sm"><span className="font-semibold">User ID:</span> {m.user.id || "-"}</p>
                    </>
                  ) : (
                    <p className="text-sm text-gray-600">Guest user (not logged in)</p>
                  )}
                </div>

                <p className="mt-2 text-xs text-gray-500">{new Date(m.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanelModal;