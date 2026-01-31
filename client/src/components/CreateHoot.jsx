import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const CreateHoot = () => {
  const { user, token } = useAuth(); // ✅ use token from context
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🚨 Redirect if not logged in
  useEffect(() => {
    if (!user || !token) {
      navigate("/signin");
    }
  }, [user, token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!image) {
    //   setError("Image is required 🦉");
    //   return;
    // }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    try {
      const res = await fetch(`${API_URL}/hoots`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });


      // 🔐 Handle non-JSON backend errors safely
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server error. Is backend running?");
      }

      if (!res.ok) {
        throw new Error(data.error || "Failed to post hoot");
      }

      navigate("/"); // ✅ success → home
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-purple-400 text-center mb-4">
          Create a Hoot 🦉
        </h2>

        {error && (
          <p className="text-red-500 text-center text-sm">{error}</p>
        )}

        <input
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-purple-500"
        />

        <textarea
          placeholder="Caption (optional)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="px-3 py-2 rounded-md outline-none focus:ring-2 resize-none"
        />

        {/* <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="text-white"
        /> */}

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-semibold transition disabled:opacity-60"
        >
          {loading ? "Posting..." : "Post Hoot"}
        </button>
      </form>
    </div>
  );
};

export default CreateHoot;
